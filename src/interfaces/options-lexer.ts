/**
 * @file Interfaces - LexerOptions
 * @module docast-parse/interfaces/LexerOptions
 */

/**
 * [`Lexer`][1] options.
 *
 * [1]: ../lexer.ts
 */
interface LexerOptions {
  /**
   * Indentation size (in single-spaced characters).
   *
   * @default 2
   */
  indent_size?: number

  /**
   * Maximum line length of source file.
   *
   * @default 80
   */
  max_line_length?: number
}

export type { LexerOptions as default }
