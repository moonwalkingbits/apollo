/*
 * Copyright (c) 2020 Martin Pettersson
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { expectAssignable } from "tsd";

import { Configuration, ConfigurationInterface } from "./configuration";

/*
|--------------------------------------------------------------------------
| configuration
|--------------------------------------------------------------------------
|
| These tests ensures the API of the configuration package.
|
*/

expectAssignable<ConfigurationInterface>(new Configuration());
