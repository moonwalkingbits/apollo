/*
 * Copyright (c) 2020 Martin Pettersson
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { RequestMethod } from "@moonwalkingbits/apollo/http";
import { RouterBuilder, DECORATOR_METADATA_KEY } from "@moonwalkingbits/apollo/routing";

/**
 * Provides routing capabilities.
 */
class RoutingProvider {
    /**
     * Create a new service provider instance.
     *
     * @public
     * @param {@moonwalkingbits/apollo/configuration.Configuration} configuration Application configuration.
     * @param {@moonwalkingbits/apollo/container.Container} container Application container instance.
     */
    constructor(configuration, container) {
        /**
         * Application configuration.
         *
         * @protected
         * @type {@moonwalkingbits/apollo/configuration.Configuration}
         */
        this.configuration = configuration;

        /**
         * Application container instance.
         *
         * @protected
         * @type {@moonwalkingbits/apollo/container.Container}
         */
        this.container = container;
    }

    /**
     * Register router builder to the application container so other services can access it.
     *
     * @public
     */
    register() {
        this.container.bindConstructor("routerBuilder", RouterBuilder);
    }

    /**
     * Collect all configured routes and bind a router instance to the container.
     *
     * @public
     * @async
     * @param {@moonwalkingbits/apollo/routing.RouterBuilder} routerBuilder Router builder instance.
     * @return {Promise} A promise resolving when the method is done.
     */
    async boot(routerBuilder) {
        await Promise.all([
            this.collectRoutes(this.configuration.get("routes", []), routerBuilder),
            this.collectControllerRoutes(this.configuration.get("controllers", []), routerBuilder)
        ]);

        this.container.bindInstance("router", routerBuilder.build());
    }

    /**
     * Add routes to router builder.
     *
     * @protected
     * @async
     * @param {Array.<Object>)} routes Routes to add to router builder.
     * @param {@moonwalkingbits/apollo/routing.RouterBuilder} routerBuilder Router builder instance.
     * @return {Promise} A promise resolving when the method is done.
     */
    async collectRoutes(routes, routerBuilder) {
        for (const { method = RequestMethod.GET, pattern, action } of routes) {
            routerBuilder.addRoute(method, pattern, await this.createAction(action));
        }
    }

    /**
     * Add controller routes to router builder.
     *
     * @protected
     * @async
     * @param {Array.<(string|Object)>)} controllers Controllers to extract routes from.
     * @param {@moonwalkingbits/apollo/routing.RouterBuilder} routerBuilder Router builder instance.
     * @return {Promise} A promise resolving when the method is done.
     */
    async collectControllerRoutes(controllers, routerBuilder) {
        for (const controller of controllers) {
            const { specifier, exportName } = this.parseAction(controller);

            this.addControllerRoutes(await this.fetchModule(specifier, exportName), routerBuilder);
        }
    }

    /**
     * Add routes from controller constructor.
     *
     * @protected
     * @param {Function} constructor Controller constructor.
     * @param {@moonwalkingbits/apollo/routing.RouterBuilder} routerBuilder Router builder instance.
     */
    addControllerRoutes(constructor, routerBuilder) {
        const { route = "", routes = [] } = constructor[DECORATOR_METADATA_KEY] ?? {};

        for (const { method, pattern, action } of routes) {
            routerBuilder.addRoute(method, `${route}/${pattern}`, this.wrapControllerAction(constructor, action));
        }
    }

    /**
     * Create router action.
     *
     * @protected
     * @async
     * @param {(Function|string|Object.<string, string>)} actionDefinition Action definition.
     * @return {Promise.<Function>} Router action.
     */
    async createAction(actionDefinition) {
        if (typeof actionDefinition === "function") {
            return this.wrapAction(actionDefinition);
        }

        return this.createModuleAction(actionDefinition);
    }

    /**
     * Fetch module contents.
     *
     * @protected
     * @async
     * @param {string} specifier Module specifier.
     * @param {string} exportName Module export.
     * @return {Promise.<Function>} Module contents.
     */
    async fetchModule(specifier, exportName) {
        const module = await import(specifier);

        return module[exportName];
    }

    /**
     * Create a module router action.
     *
     * @private
     * @async
     * @param {(string|Object.<string, string>)} actionDefinition Action definition.
     * @return {Promise.<Function>} Router action.
     */
    async createModuleAction(actionDefinition) {
        const { specifier, exportName, action } = this.parseAction(actionDefinition);
        const actionOrConstructor = await this.fetchModule(specifier, exportName);

        if (action) {
            return this.wrapControllerAction(actionOrConstructor, action);
        }

        return this.wrapAction(actionOrConstructor);
    }

    /**
     * Wrap controller action in a router action.
     *
     * @private
     * @param {Function} constructor Controller constructor.
     * @param {string} action Controller action.
     * @return {Function} Router action.
     */
    wrapControllerAction(constructor, action) {
        return (request, parameters) => {
            const controllerInstance = this.container.construct(constructor);

            return this.container.invoke(
                controllerInstance[action].bind(controllerInstance),
                {request, ...parameters},
                controllerInstance[action]
            );
        };
    }

    /**
     * Wrap action in a router action.
     *
     * @private
     * @param {Function} action Action to wrap.
     * @return {Function} Router action.
     */
    wrapAction(action) {
        return (request, parameters) => this.container.invoke(action, {request, ...parameters});
    }

    /**
     * Ensure the action is an action object.
     *
     * @private
     * @param {(string|Object.<string, string>)} actionDefinition Action definition to normalize.
     * @return {Object.<string, ?string>} Action object.
     */
    parseAction(actionDefinition) {
        if (typeof actionDefinition !== "string") {
            return actionDefinition;
        }

        const [ specifierAndExportName, action = null ] = actionDefinition.split(/(?<!^)@/);
        const [ specifier, exportName = "default" ] = specifierAndExportName.split("::");

        return {specifier, exportName, action};
    }
}

export default RoutingProvider;
