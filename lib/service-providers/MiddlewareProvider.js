/*
 * Copyright (c) 2020 Martin Pettersson
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Adds any configured middleware to the application request handler.
 */
class MiddlewareProvider {
    /**
     * Create a new service provider instance.
     *
     * @public
     * @param {@moonwalkingbits/apollo/configuration.Configuration} configuration Application configuration.
     */
    constructor(configuration) {
        /**
         * Application configuration.
         *
         * @private
         * @type {@moonwalkingbits/apollo/configuration.Configuration}
         */
        this.configuration = configuration;
    }

    /**
     * Add all configured middleware to the server request handler.
     *
     * All middleware are constructed using the application container to enable
     * dependency injection.
     *
     * @public
     * @async
     * @param {@moonwalkingbits/apollo/container.Container} container Application container instance.
     * @param {@moonwalkingbits/apollo/server.RequestHandler} requestHandler Server request handler.
     * @return {Promise} A promise resolving when the method is done.
     */
    async boot(container, requestHandler) {
        const middleware = await Promise.all(
            this.configuration.get("middleware", [])
                .map(middleware => this.fetchModuleConstructor(middleware))
        );

        middleware.forEach(constructor => requestHandler.addMiddleware(container.construct(constructor)));
    }

    /**
     * Import the given module and return the constructor.
     *
     * @private
     * @async
     * @param {string} moduleName Name of module to resolve.
     * @return {Promise.<Function>} Module constructor.
     */
    async fetchModuleConstructor(moduleName) {
        const [ specifier, name ] = moduleName.split("::");

        return (await import(specifier))[name ?? "default"];
    }
}

export default MiddlewareProvider;
