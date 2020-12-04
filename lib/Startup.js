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
            this.configuration.get("serviceProviders", []).map(this.fetchModuleConstructor.bind(this))
        );
        const serviceProviderInstances = serviceProviders.map(constructor => container.construct(constructor));

        serviceProviderInstances.forEach(async provider => await provider.register?.(container));
        serviceProviderInstances.forEach(async provider => {
            if (provider.boot) {
                await container.invoke(provider.boot.bind(provider), {}, provider.boot);
            }
        });
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
        const [ specifier, name ] = moduleName.split(":");

        return (await import(specifier))[name ?? "default"];
    }
}

export default Startup;
