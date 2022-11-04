/**
 * @file Interfaces - ParserOptions
 * @module docast/interfaces/ParserOptions
 */

/**
 * [`Parser`][1] options.
 *
 * [1]: ../parser.ts
 */
interface ParserOptions {
  /**
   * Indentation size (in single-spaced characters).
   *
   * @default 2
   */
  indent_size?: number

  /**
   * Maximum line length of document.
   *
   * @default 80
   */
  max_line_length?: number
}

export type { ParserOptions as default }
