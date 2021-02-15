/*
 * Copyright (c) 2020 Martin Pettersson
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * A minimal default startup routine.
 *
 * @implements {@moonwalkingbits/apollo/server.StartupInterface}
 */
class Startup {
    /**
     * Create a new startup instance.
     *
     * @public
     * @param {@moonwalkingbits/apollo/configuration.Configuration} configuration Application configuration instance.
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
     * Load and run all configured service providers.
     *
     * All service providers are constructed using the application container to
     * enable dependency injection.
     *
     * @public
     * @async
     * @param {@moonwalkingbits/apollo/container.Container} container Application container instance.
     * @return {Promise} A promise resolving when the method is done.
     */
    async configure(container) {
        const serviceProviderConstructors = await Promise.all(
            this.configuration.get("serviceProviders", []).map(provider => this.fetchModuleConstructor(provider))
        );
        const serviceProviderInstances = [];

        for (const constructor of serviceProviderConstructors) {
            const serviceProvider = container.construct(constructor);

            await serviceProvider.register?.(container);
            serviceProviderInstances.push(serviceProvider);
        }

        for (const provider of serviceProviderInstances) {
            if (provider.boot) {
                await container.invoke(provider.boot.bind(provider), {}, provider.boot);
            }
        }
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
        const constructor = (await import(specifier))[name ?? "default"];

        if (!constructor) {
            throw new Error(`Module not found: ${moduleName}`);
        }

        return constructor;
    }
}

export default Startup;
