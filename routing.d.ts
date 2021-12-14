/*
 * Copyright (c) 2020 Martin Pettersson
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

declare type RequestInterface = import("@moonwalkingbits/apollo-http").RequestInterface;
declare type RequestMethod = import("@moonwalkingbits/apollo-http").RequestMethod;
declare type ResponseFactoryInterface = import("@moonwalkingbits/apollo-http").ResponseFactoryInterface;
declare type ResponseInterface = import("@moonwalkingbits/apollo-http").ResponseInterface;

declare const DECORATOR_METADATA_KEY: Symbol;

declare function route(pattern: string): Function;
declare function request(method: RequestMethod, pattern?: string): Function;
declare function OPTIONS(pattern?: string): Function;
declare function GET(pattern?: string): Function;
declare function HEAD(pattern?: string): Function;
declare function POST(pattern?: string): Function;
declare function PUT(pattern?: string): Function;
declare function PATCH(pattern?: string): Function;
declare function DELETE(pattern?: string): Function;
declare function TRACE(pattern?: string): Function;
declare function CONNECT(pattern?: string): Function;

declare class Route {
    public method: RequestMethod;
    public pattern: RegExp | string;
    public action: Function;
    public constructor(method: RequestMethod, pattern: RegExp | string, action: Function);
    public matches(request: RequestInterface): boolean;
}

declare class Router {
    public constructor(routes: Array<Route>, responseFactory: ResponseFactoryInterface);
    public route(request: RequestInterface): ResponseInterface | Promise<ResponseInterface>;
}

declare class RouterBuilder {
    public constructor(responseFactory: ResponseFactoryInterface);
    public addRoute(method: RequestMethod, pattern: RegExp | string, action: Function): this;
    public build(): Router;
}

export {
    CONNECT,
    DECORATOR_METADATA_KEY,
    DELETE,
    GET,
    HEAD,
    OPTIONS,
    PATCH,
    POST,
    PUT,
    Route,
    Router,
    RouterBuilder,
    TRACE,
    request,
    route
};
