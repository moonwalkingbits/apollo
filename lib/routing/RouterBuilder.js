/*
 * Copyright (c) 2020 Martin Pettersson
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import Route from "./Route.js";
import Router from "./Router.js";

/**
 * Has the ability to create router instances.
 */
class RouterBuilder {
    /**
     * Create a new router builder instance.
     *
     * @public
     * @param {@moonwalkingbits/apollo/http.ResponseFactory} responseFactory Response factory instance.
     */
    constructor(responseFactory) {
        /**
         * Response factory instance.
         *
         * @private
         * @type {@moonwalkingbits/apollo/http.ResponseFactory}
         */
        this.responseFactory = responseFactory;

        /**
         * List of registered routes.
         *
         * @private
         * @type {Array.<routing/Route>}
         */
        this.routes = [];
    }

    /**
     * Add given route to list of available routes.
     *
     * @public
     * @param {@moonwalkingbits/apollo/http.RequestMethod} method HTTP request method.
     * @param {string} pattern Route pattern.
     * @param {Function} action Route action.
     * @return {this} Same instance for method chaining.
     */
    addRoute(method, pattern, action) {
        this.routes.push(new Route(method, this.createPatternRegExp(pattern), action));

        return this;
    }

    /**
     * Create a router instance.
     *
     * @public
     * @return {routing/Router} Configured router instance.
     */
    build() {
        return new Router(this.routes, this.responseFactory);
    }

    /**
     * Create regular expression from route pattern.
     *
     * @private
     * @param {(RegExp|string)} pattern Route pattern.
     * @return {RegExp} Pattern to match incomming requests against.
     */
    createPatternRegExp(pattern) {
        if (pattern instanceof RegExp) {
            return pattern;
        }

        const patternWithNamedVariables = pattern.replace(
            /:(?:([^\(\/]+)\((.+?)\)|([^\/]+))/g,
            (_, name, pattern, nameWithoutPattern) => {
                const variableName = (name ?? nameWithoutPattern);
                let replacement = `(?<${variableName.replace("?", "")}>${pattern ?? "[^\/]+"})`;

                if (variableName.charAt(variableName.length - 1) === "?") {
                    replacement = `?${replacement}?`;
                }

                return replacement;
            }
        );

        return new RegExp(`^\/?${patternWithNamedVariables.replace(/^\/|\/$/g, "")}\/?$`);
    }
}

export default RouterBuilder;
