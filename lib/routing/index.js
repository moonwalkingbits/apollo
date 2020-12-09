/*
 * Copyright (c) 2020 Martin Pettersson
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

export const DECORATOR_METADATA_KEY = Symbol("APOLLO_ROUTING_DECORATOR_METADATA");

export * from "./decorators.js";
export { default as Route } from "./Route.js";
export { default as Router } from "./Router.js";
export { default as RouterBuilder } from "./RouterBuilder.js";
