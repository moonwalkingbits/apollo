/*
 * Copyright (c) 2020 Martin Pettersson
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { ResponseStatus } from "@moonwalkingbits/apollo-http";

/**
 * Base class of all application HTTP controllers.
 *
 * This class provides a set of methods that are convenient when creating
 * HTTP responses.
 *
 * @abtract
 */
class AbstractController {
    /**
     * Create a new controller instance.
     *
     * @public
     * @param {@moonwalkingbits/apollo-http.ResponseFactory} responseFactory Response factory instance.
     * @param {@moonwalkingbits/apollo-http.StreamFactory} streamFactory Stream factory instance.
     */
    constructor(responseFactory, streamFactory) {
        /**
         * Response factory instance.
         *
         * @protected
         * @type {@moonwalkingbits/apollo-http.ResponseFactory}
         */
        this.responseFactory = responseFactory;

        /**
         * Stream factory instance.
         *
         * @protected
         * @type {@moonwalkingbits/apollo-http.StreamFactory}
         */
        this.streamFactory = streamFactory;
    }

    /**
     * Return an empty response.
     *
     * @protected
     * @return {@moonwalkingbits/apollo-http.Response} Empty response.
     */
    noContent() {
        return this.responseFactory.createResponse(ResponseStatus.NO_CONTENT);
    }

    /**
     * Return a not found response.
     *
     * @protected
     * @return {@moonwalkingbits/apollo-http.Response} Not found response.
     */
    notFound() {
        return this.responseFactory.createResponse(ResponseStatus.NOT_FOUND);
    }

    /**
     * Return an error response.
     *
     * @protected
     * @param {string} message Error message.
     * @param {?@moonwalkingbits/apollo-http.ResponseStatus} statusCode HTTP response status.
     * @return {@moonwalkingbits/apollo-http.Response} Error response.
     */
    error(message, statusCode) {
        return this.responseFactory.createResponse(statusCode ?? ResponseStatus.INTERNAL_SERVER_ERROR)
            .withBody(this.streamFactory.createStream(message));
    }

    /**
     * Return a text response.
     *
     * @protected
     * @param {string} message Response message.
     * @param {?@moonwalkingbits/apollo-http.ResponseStatus} statusCode HTTP response status.
     * @return {@moonwalkingbits/apollo-http.Response} Text response.
     */
    text(message, statusCode) {
        return this.responseFactory.createResponse(statusCode ?? ResponseStatus.OK)
            .withHeader("Content-Type", "text/plain")
            .withBody(this.streamFactory.createStream(message));
    }

    /**
     * Return a JSON response.
     *
     * @protected
     * @param {Object} content Response content.
     * @param {?@moonwalkingbits/apollo-http.ResponseStatus} statusCode HTTP response status.
     * @return {@moonwalkingbits/apollo-http.Response} JSON response.
     */
    json(content, statusCode) {
        return this.responseFactory.createResponse(statusCode ?? ResponseStatus.OK)
            .withHeader("Content-Type", "application/json")
            .withBody(this.streamFactory.createStream(JSON.stringify(content)));
    }

    /**
     * Return a created response.
     *
     * @protected
     * @param {string} location Entity location.
     * @return {@moonwalkingbits/apollo-http.Response} Created response.
     */
    created(location) {
        return this.responseFactory.createResponse(ResponseStatus.CREATED)
            .withHeader("Location", location);
    }

    /**
     * Return a redirect response.
     *
     * @protected
     * @param {string} location Redirect location.
     * @param {?@moonwalkingbits/apollo-http.ResponseStatus} statusCode HTTP response status.
     * @return {@moonwalkingbits/apollo-http.Response} Redirect response.
     */
    redirect(location, statusCode) {
        return this.responseFactory.createResponse(statusCode ?? ResponseStatus.TEMPORARY_REDIRECT)
            .withHeader("Location", location);
    }
}

export default AbstractController;
