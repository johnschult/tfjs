/**
 * @license
 * Copyright 2019 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

import * as fs from 'fs';
import {promisify} from 'util';

const readFile = promisify(fs.readFile);

// tslint:disable-next-line:no-require-imports
const messages = require('./proto/api_pb');

/**
 * Get a key in an object by its value. This is used to get protobuf enum value
 * from index.
 *
 * @param object
 * @param value
 */
// tslint:disable-next-line:no-any
export function getEnumKeyFromValue(object: any, value: number): string {
  return Object.keys(object).find(key => object[key] === value);
}

// tslint:disable-next-line:no-any
export async function readSavedModelProto(path: string) {
  // Load the SavedModel pb file and deserialize it into message.
  const modelFile = await readFile(path);
  const array = new Uint8Array(modelFile);
  return messages.SavedModel.deserializeBinary(array);
}
