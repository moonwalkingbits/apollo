/*
 * Copyright (c) 2020 Martin Pettersson
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

declare type RequestMethod = import("@moonwalkingbits/apollo-http").RequestMethod;

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
