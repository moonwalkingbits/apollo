/*
 * Copyright (c) 2020 Martin Pettersson
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { expectAssignable } from "tsd";

import { Container, ContainerInterface } from "./container";
import { Configuration, ConfigurationInterface } from "./configuration";

expectAssignable<ConfigurationInterface>(new Configuration());
expectAssignable<ContainerInterface>(new Container());
