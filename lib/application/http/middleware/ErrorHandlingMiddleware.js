/*
 * Copyright (c) 2020 Martin Pettersson
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { ResponseStatus } from "@moonwalkingbits/apollo/http";

/**
 * If this middleware is used first in the pipeline it will simply return the
 * result of the pipeline and catch any errors.
 *
 * @implements {@moonwalkingbits/apollo/server.MiddlewareInterface}
 */
class ErrorHandlingMiddleware {
    /**
     * Create a new middleware instance.
     *
     * @public
     * @param {@moonwalkingbits/apollo/http.ResponseFactory} responseFactory HTTP response factory instance.
     * @param {@moonwalkingbits/apollo/log.Logger} logger Application logger instance.
     */
    constructor(responseFactory, logger) {
        /**
         * HTTP response factory instance.
         *
         * @private
         * @type {@moonwalkingbits/apollo/http.ResponseFactory}
         */
        this.responseFactory = responseFactory;

        /**
         * Application logger instance.
         *
         * @private
         * @type {@moonwalkingbits/apollo/log.Logger}
         */
        this.logger = logger;
    }

    /**
     * Process the incomming request and return a server response.
     *
     * @public
     * @async
     * @param {@moonwalkingbits/apollo/http.Request} request Current server request.
     * @param {@moonwalkingbits/apollo/server.RequestHandler} requestHandler Next handler in request pipeline.
     * @return {Promise.<@moonwalkingbits/apollo/http.Response>} Response to be returned by server.
     */
    async process(request, requestHandler) {
        try {
            return await requestHandler.handle(request);
        } catch (error) {
            this.logger.error(error.message, {error, request});

            return this.responseFactory.createResponse(ResponseStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
