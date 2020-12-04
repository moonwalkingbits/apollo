/*
 * Copyright (c) 2020 Martin Pettersson
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

declare type ConfigurationInterface = import("@moonwalkingbits/apollo-configuration").ConfigurationInterface;
declare type ContainerInterface = import("@moonwalkingbits/apollo-container").ContainerInterface;
declare type StartupInterface = import("@moonwalkingbits/apollo-server").StartupInterface;

/**
 * A minimal default startup routine.
 */
declare class Startup implements StartupInterface {
    /**
     * Create a new startup instance.
     *
     * @param configuration Application configuration instance.
     */
    public constructor(configuration: ConfigurationInterface);

    /**
     * Load and run all configured service providers.
     *
     * All service providers are constructed using the application container to
     * enable dependency injection.
     *
     * @param container Application container instance.
     * @return A promise resolving when the method is done.
     */
    public configure(configuration: ContainerInterface): Promise<void>;
}

export { Startup };
