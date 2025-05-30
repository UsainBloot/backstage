/*
 * Copyright 2024 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import fs from 'fs-extra';
import { paths as cliPaths } from '../../lib/paths';

export async function createTemporaryTsConfig(dir: string) {
  const path = cliPaths.resolveOwnRoot(dir, 'tsconfig.typedoc.tmp.json');

  process.once('exit', () => {
    fs.removeSync(path);
  });

  let assetTypeFile: string[] = [];

  try {
    assetTypeFile = [
      require.resolve('@backstage/cli/asset-types/asset-types.d.ts'),
    ];
  } catch {
    /** ignore */
  }

  await fs.writeJson(path, {
    extends: '../../tsconfig.json',
    include: [...assetTypeFile, 'src'],
    exclude: [],
  });

  return path;
}
