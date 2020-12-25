/*
 * Copyright (c) 2020 Martin Pettersson
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { ResponseStatus } from "@moonwalkingbits/apollo-http";

/**
 * Has the capability to route HTTP requests to actions.
 */
class Router {
    /**
     * Create a new router instance.
     *
     * @public
     * @param {Array.<routing/Route>} routes List of available routes.
     * @param {@moonwalkingbits/apollo/http.ResponseFactory} responseFactory Response factory instance.
     */
    constructor(routes, responseFactory) {
        this.routes = routes;
        this.responseFactory = responseFactory;
    }

    /**
     * Route the given request to a route action if possible.
     *
     * @public
     * @param {@moonwalkingbits/apollo/http.Request} request Incomming request.
     * @return {@moonwalkingbits/apollo/http.Response} Response from route action if found.
     */
    route(request) {
        const route = this.routes.find(route => route.matches(request));

        if (route) {
            return route.action(request, this.extractParameters(request, route.pattern));
        }

        return this.responseFactory.createResponse(ResponseStatus.NOT_FOUND);
    }

    /**
     * Extract named parameters from request matching route pattern.
     *
     * @private
     * @param {@moonwalkingbits/apollo/http.Request} request Incomming request.
     * @param {string} pattern Route pattern.
     * @return {Object.<string, string>} Named parameters matching route pattern.
     */
    extractParameters(request, pattern) {
        const parameters = pattern.exec(request.url.path)?.groups ?? {};

        return Object.fromEntries(
            Object.entries(parameters)
                .filter(([ _, value ]) => typeof value !== "undefined")
                .map(([ key, value ]) => [key, decodeURIComponent(value)])
        );
    }
}

export default Router;
