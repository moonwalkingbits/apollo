/*
 * Copyright (c) 2020 Martin Pettersson
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { DECORATOR_METADATA_KEY } from "@moonwalkingbits/apollo/routing";
import { RequestMethod } from "@moonwalkingbits/apollo/http";

/**
 * Decorator defining a controller base route.
 *
 * @public
 * @param {string} pattern Base route pattern.
 * @return {Function} Class decorator handler.
 */
export function route(pattern) {
    return function (constructor) {
        const metadata = constructor[DECORATOR_METADATA_KEY] ?? {};

        metadata.route = pattern.replace(/\/$/, "");

        constructor[DECORATOR_METADATA_KEY] = metadata;
    };
};

/**
 * Decorator defining an HTTP action.
 *
 * @public
 * @param {@moonwalkingbits/apollo/http.RequestMethod} method HTTP request method.
 * @param {string} pattern Action pattern.
 * @return {Function} Method decorator handler.
 */
export function request(method, pattern = "") {
    return function (prototype, action) {
        const metadata = prototype.constructor[DECORATOR_METADATA_KEY] ?? {};
        const { route = "" } = metadata;

        if (!metadata.routes) {
            metadata.routes = [];
        }

        metadata.routes.push({
            method,
            pattern: pattern.replace(/^\//, ""),
            action
        });
        prototype.constructor[DECORATOR_METADATA_KEY] = metadata;
    };
};

/**
 * Decorator defining an HTTP OPTIONS action.
 *
 * @public
 * @param {string} pattern Action pattern.
 * @return {Function} Method decorator handler.
 */
export function OPTIONS(pattern) {
    return request(RequestMethod.OPTIONS, pattern);
};

/**
 * Decorator defining an HTTP GET action.
 *
 * @public
 * @param {string} pattern Action pattern.
 * @return {Function} Method decorator handler.
 */
export function GET(pattern) {
    return request(RequestMethod.GET, pattern);
};

/**
 * Decorator defining an HTTP HEAD action.
 *
 * @public
 * @param {string} pattern Action pattern.
 * @return {Function} Method decorator handler.
 */
export function HEAD(pattern) {
    return request(RequestMethod.HEAD, pattern);
};

/**
 * Decorator defining an HTTP POST action.
 *
 * @public
 * @param {string} pattern Action pattern.
 * @return {Function} Method decorator handler.
 */
export function POST(pattern) {
    return request(RequestMethod.POST, pattern);
};

/**
 * Decorator defining an HTTP PUT action.
 *
 * @public
 * @param {string} pattern Action pattern.
 * @return {Function} Method decorator handler.
 */
export function PUT(pattern) {
    return request(RequestMethod.PUT, pattern);
};

/**
 * Decorator defining an HTTP PATCH action.
 *
 * @public
 * @param {string} pattern Action pattern.
 * @return {Function} Method decorator handler.
 */
export function PATCH(pattern) {
    return request(RequestMethod.PATCH, pattern);
};

/**
 * Decorator defining an HTTP DELETE action.
 *
 * @public
 * @param {string} pattern Action pattern.
 * @return {Function} Method decorator handler.
 */
export function DELETE(pattern) {
    return request(RequestMethod.DELETE, pattern);
};

/**
 * Decorator defining an HTTP TRACE action.
 *
 * @public
 * @param {string} pattern Action pattern.
 * @return {Function} Method decorator handler.
 */
export function TRACE(pattern) {
    return request(RequestMethod.TRACE, pattern);
};

/**
 * Decorator defining an HTTP CONNECT action.
 *
 * @public
 * @param {string} pattern Action pattern.
 * @return {Function} Method decorator handler.
 */
export function CONNECT(pattern) {
    return request(RequestMethod.CONNECT, pattern);
};
