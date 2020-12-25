/*
 * Copyright (c) 2020 Martin Pettersson
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Represents an application route.
 */
class Route {
    /**
     * Create a new route instance.
     *
     * @public
     * @param {@moonwalkingbits/apollo-http.RequestMethod} method HTTP request method.
     * @param {RegExp} pattern Route pattern.
     * @param {Function} action Route action.
     */
    constructor(method, pattern, action) {
        /**
         * HTTP request method.
         *
         * @public
         * @type {@moonwalkingbits/apollo-http.RequestMethod}
         */
        this.method = method;

        /**
         * Route pattern.
         *
         * @public
         * @type {RegExp}
         */
        this.pattern = pattern;

        /**
         * Route action.
         *
         * @public
         * @type {Function}
         */
        this.action = action;
    }

    /**
     * Determine whether the route matches the given request.
     *
     * @param {@moonwalkingbits/apollo-http.Request} request HTTP request object.
     * @return {boolean} True if the route matches the request.
     */
    matches(request) {
        if (request.method !== this.method) {
            return false;
        }

        return this.pattern.test(request.url.path);
    }
}

export default Route;
