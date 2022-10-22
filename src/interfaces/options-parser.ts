/**
 * @file Interfaces - ParserOptions
 * @module docast/interfaces/ParserOptions
 */

import type { VFileCoreOptions } from 'vfile/lib'

/**
 * [`Parser`][1] options.
 *
 * [1]: ../parser.ts
 */
interface ParserOptions {
  /**
   * Document file name (including {@link ext}).
   *
   * Cannot contain path separators; cannot be nullified.
   */
  base?: VFileCoreOptions['basename']

  /**
   * Place to store custom information.
   *
   * @default {}
   */
  data?: VFileCoreOptions['data']

  /**
   * Path to document's directory.
   *
   * **Note**: Cannot be set if {@link path} is not set.
   */
  dir?: VFileCoreOptions['dirname']

  /**
   * Document file extension (including leading `.`).
   *
   * **Note**: Cannot be set if {@link path} is not set.
   */
  ext?: VFileCoreOptions['extname']

  /**
   * List of filepaths the document has moved between.
   *
   * The first filepath is the original path and the last is the current path.
   *
   * @default []
   */
  history?: VFileCoreOptions['history']

  /**
   * Document file name {@link ext}.
   *
   * Cannot contain path separators; cannot be nullified.
   */
  name?: VFileCoreOptions['stem']

  /**
   * Full document path.
   *
   * Cannot be nullified.
   */
  path?: VFileCoreOptions['path']

  /**
   * Root of {@link path}.
   *
   * @default process.cwd() | '/'
   */
  root?: VFileCoreOptions['cwd']
}

export type { ParserOptions as default }
