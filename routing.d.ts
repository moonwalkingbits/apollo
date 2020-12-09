/*
 * Copyright (c) 2020 Martin Pettersson
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

declare type RequestMethod = import("@moonwalkingbits/apollo-http").RequestMethod;

/**
 * Decorator defining a controller base route.
 *
 * @param pattern Base route pattern.
 * @return Class decorator handler.
 */
declare function route(pattern: string): Function;

/**
 * Decorator defining an HTTP action.
 *
 * @param method HTTP request method.
 * @param pattern Action pattern.
 * @return Method decorator handler.
 */
declare function request(method: RequestMethod, pattern?: string): Function;

/**
 * Decorator defining an HTTP OPTIONS action.
 *
 * @param pattern Action pattern.
 * @return Method decorator handler.
 */
declare function OPTIONS(pattern?: string): Function;

/**
 * Decorator defining an HTTP GET action.
 *
 * @param pattern Action pattern.
 * @return Method decorator handler.
 */
declare function GET(pattern?: string): Function;

/**
 * Decorator defining an HTTP HEAD action.
 *
 * @param pattern Action pattern.
 * @return Method decorator handler.
 */
declare function HEAD(pattern?: string): Function;

/**
 * Decorator defining an HTTP POST action.
 *
 * @param pattern Action pattern.
 * @return Method decorator handler.
 */
declare function POST(pattern?: string): Function;

/**
 * Decorator defining an HTTP PUT action.
 *
 * @param pattern Action pattern.
 * @return Method decorator handler.
 */
declare function PUT(pattern?: string): Function;

/**
 * Decorator defining an HTTP PATCH action.
 *
 * @param pattern Action pattern.
 * @return Method decorator handler.
 */
declare function PATCH(pattern?: string): Function;

/**
 * Decorator defining an HTTP DELETE action.
 *
 * @param pattern Action pattern.
 * @return Method decorator handler.
 */
declare function DELETE(pattern?: string): Function;

/**
 * Decorator defining an HTTP TRACE action.
 *
 * @param pattern Action pattern.
 * @return Method decorator handler.
 */
declare function TRACE(pattern?: string): Function;

/**
 * Decorator defining an HTTP CONNECT action.
 *
 * @param pattern Action pattern.
 * @return Method decorator handler.
 */
declare function CONNECT(pattern?: string): Function;

export {
    CONNECT,
    DELETE,
    GET,
    HEAD,
    OPTIONS,
    PATCH,
    POST,
    PUT,
    TRACE,
    request,
    route
};
