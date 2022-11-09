/**
 * @file Interfaces - Options
 * @module docast-parse/interfaces/Options
 */

/**
 * [`Parser`][1] options.
 *
 * [1]: ../parser.ts
 */
interface Options {
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

export type { Options as default }
