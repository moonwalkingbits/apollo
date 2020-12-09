/*
 * Copyright (c) 2020 Martin Pettersson
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Server request middleware providing flexible routing.
 *
 * @implements {@moonwalkingbits/apollo-server.MiddlewareInterface}
 */
class RoutingMiddleware {
    /**
     * Create a new middleware instance.
     *
     * @public
     * @param {routing.Router} router Router instance.
     */
    constructor(router) {
        /**
         * Router instance.
         *
         * @private
         * @type {routing.Router}
         */
        this.router = router;
    }

    /**
     * Handle incomming request and produce a server response.
     *
     * @public
     * @param {@moonwalkingbits/apollo-http.Request} request Incomming request.
     * @param {@moonwalkingbits/apollo-server.RequestHandlerInterface} requestHandler Next request handler in queue.
     * @return {Promise.<@moonwalkingbits/apollo-http.Response>} Server response.
     */
    process(request, requestHandler) {
        return this.router.route(request);
    }
}

export default RoutingMiddleware;
