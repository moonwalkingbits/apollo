/*
 * Copyright (c) 2020 Martin Pettersson
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { expectAssignable } from "tsd";

import { Container, ContainerInterface } from "./container";
import { Configuration, ConfigurationInterface } from "./configuration";
import { LogHandlerInterface, Logger } from "./log";
import { UrlFactoryInterface, UrlFactory } from "./http";
import { ServerBuilderInterface, ServerBuilder } from "./server";

expectAssignable<ConfigurationInterface>(new Configuration());
expectAssignable<ContainerInterface>(new Container());
expectAssignable<LogHandlerInterface>(new Logger([]));
expectAssignable<UrlFactoryInterface>(new UrlFactory());
expectAssignable<ServerBuilderInterface>(new ServerBuilder());
