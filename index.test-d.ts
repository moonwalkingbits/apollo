/*
 * Copyright (c) 2020 Martin Pettersson
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { expectAssignable, expectType } from "tsd";

import { Configuration, ConfigurationInterface } from "./configuration";
import { Container, ContainerInterface } from "./container";
import { LogHandlerInterface, Logger } from "./log";
import { RequestMethod, ResponseInterface, UrlFactoryInterface, UrlFactory } from "./http";
import { ServerBuilderInterface, ServerBuilder, StartupInterface } from "./server";
import { ValidatorFactory } from "./validation";
import { AbstractController, Startup } from ".";
import {
    CONNECT,
    DELETE,
    GET,
    HEAD,
    OPTIONS,
    PATCH,
    POST,
    PUT,
    TRACE,
    request,
    route
} from "./routing";

expectAssignable<ConfigurationInterface>(new Configuration());
expectAssignable<ContainerInterface>(new Container());
expectAssignable<LogHandlerInterface>(new Logger([]));
expectAssignable<UrlFactoryInterface>(new UrlFactory());
expectAssignable<ServerBuilderInterface>(new ServerBuilder());
expectType<ValidatorFactory>(new ValidatorFactory());

const startup = new Startup(new Configuration());
expectAssignable<StartupInterface>(startup);

@route("/")
class Controller extends AbstractController {
    @CONNECT("/path")
    @DELETE()
    @GET()
    @HEAD()
    @OPTIONS()
    @PATCH()
    @POST()
    @PUT()
    @TRACE()
    @request(RequestMethod.GET, "/path")
    public async action(): Promise<ResponseInterface> {
        return this.noContent();
    }
}
