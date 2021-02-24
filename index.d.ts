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

declare class Startup implements StartupInterface {
    public constructor(configuration: ConfigurationInterface);
    public configure(configuration: ContainerInterface): Promise<void>;
}

declare abstract class AbstractController {
    protected responseFactory: ResponseFactoryInterface;
    protected streamFactory: StreamFactoryInterface;
    public constructor(responseFactory: ResponseFactoryInterface, streamFactory: StreamFactoryInterface);
    protected noContent(): ResponseInterface;
    protected notFound(): ResponseInterface;
    protected error(message: string, statusCode?: ResponseStatus): ResponseInterface;
    protected text(message: string, statusCode?: ResponseStatus): ResponseInterface;
    protected json(content: Object, statusCode?: ResponseStatus): ResponseInterface;
    protected created(location: string): ResponseInterface;
    protected redirect(location: string, statusCode?: ResponseStatus): ResponseInterface;
}

export { AbstractController, Startup };
