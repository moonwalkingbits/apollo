/*
 * Copyright (c) 2020 Martin Pettersson
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

declare type ConfigurationInterface = import("@moonwalkingbits/apollo-configuration").ConfigurationInterface;
declare type ContainerInterface = import("@moonwalkingbits/apollo-container").ContainerInterface;
declare type ResponseFactoryInterface = import("@moonwalkingbits/apollo-http").ResponseFactoryInterface;
declare type ResponseInterface = import("@moonwalkingbits/apollo-http").ResponseInterface;
declare type ResponseStatus = import("@moonwalkingbits/apollo-http").ResponseStatus;
declare type StartupInterface = import("@moonwalkingbits/apollo-server").StartupInterface;
declare type StreamFactoryInterface = import("@moonwalkingbits/apollo-http").StreamFactoryInterface;

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

/**
 * Base class of all application HTTP controllers.
 *
 * This class provides a set of methods that are convenient when creating
 * HTTP responses.
 */
declare abstract class AbstractController {
    /**
     * Response factory instance.
     */
    protected responseFactory: ResponseFactoryInterface;

    /**
     * Stream factory instance.
     */
    protected streamFactory: StreamFactoryInterface;

    /**
     * Create a new controller instance.
     *
     * @param Response factory instance.
     * @param streamFactory Stream factory instance.
     */
    public constructor(responseFactory: ResponseFactoryInterface, streamFactory: StreamFactoryInterface);

    /**
     * Return an empty response.
     *
     * @return Empty response.
     */
    protected noContent(): Promise<ResponseInterface>;

    /**
     * Return a not found response.
     *
     * @return Not found response.
     */
    protected notFound(): Promise<ResponseInterface>;

    /**
     * Return an error response.
     *
     * @param message Error message.
     * @param statusCode HTTP response status.
     * @return Error response.
     */
    protected error(message: string, statusCode: ResponseStatus): Promise<ResponseInterface>;

    /**
     * Return a text response.
     *
     * @param message Response message.
     * @return Text response.
     */
    protected text(message: string): Promise<ResponseInterface>;

    /**
     * Return a JSON response.
     *
     * @param content Response content.
     * @return JSON response.
     */
    protected json(content: Object): Promise<ResponseInterface>;

    /**
     * Return a created response.
     *
     * @param location Entity location.
     * @return Created response.
     */
    protected created(location: string): Promise<ResponseInterface>;

    /**
     * Return a redirect response.
     *
     * @param location Redirect location.
     * @return Redirect response.
     */
    protected redirect(location: string): Promise<ResponseInterface>;
}

export { AbstractController, Startup };
