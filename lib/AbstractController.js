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
     * @async
     * @return {Promise.<@moonwalkingbits/apollo-http.Response>} Empty response.
     */
    async noContent() {
        return this.responseFactory.createResponse(ResponseStatus.NO_CONTENT);
    }

    /**
     * Return a not found response.
     *
     * @protected
     * @async
     * @return {Promise.<@moonwalkingbits/apollo-http.Response>} Not found response.
     */
    async notFound() {
        return this.responseFactory.createResponse(ResponseStatus.NOT_FOUND);
    }

    /**
     * Return an error response.
     *
     * @protected
     * @async
     * @param {string} message Error message.
     * @param {?@moonwalkingbits/apollo-http.ResponseStatus} statusCode HTTP response status.
     * @return {Promise.<@moonwalkingbits/apollo-http.Response>} Error response.
     */
    async error(message, statusCode) {
        return this.responseFactory.createResponse(statusCode ?? ResponseStatus.INTERNAL_SERVER_ERROR)
            .withBody(this.streamFactory.createStream(message));
    }

    /**
     * Return a text response.
     *
     * @protected
     * @async
     * @param {string} message Response message.
     * @return {Promise.<@moonwalkingbits/apollo-http.Response>} Text response.
     */
    async text(message) {
        return this.responseFactory.createResponse(ResponseStatus.OK)
            .withHeader("Content-Type", "text/plain")
            .withBody(this.streamFactory.createStream(message));
    }

    /**
     * Return a JSON response.
     *
     * @protected
     * @async
     * @param {Object} content Response content.
     * @return {Promise.<@moonwalkingbits/apollo-http.Response>} JSON response.
     */
    async json(content) {
        return this.responseFactory.createResponse(ResponseStatus.OK)
            .withHeader("Content-Type", "application/json")
            .withBody(this.streamFactory.createStream(JSON.stringify(content)));
    }

    /**
     * Return a created response.
     *
     * @protected
     * @async
     * @param {string} location Entity location.
     * @return {Promise.<@moonwalkingbits/apollo-http.Response>} Created response.
     */
    async created(location) {
        return this.responseFactory.createResponse(ResponseStatus.CREATED)
            .withHeader("Location", location);
    }

    /**
     * Return a redirect response.
     *
     * @protected
     * @async
     * @param {string} location Redirect location.
     * @return {Promise.<@moonwalkingbits/apollo-http.Response>} Redirect response.
     */
    async redirect(location) {
        return this.responseFactory.createResponse(ResponseStatus.TEMPORARY_REDIRECT)
            .withHeader("Location", location);
    }
}

export default AbstractController;
