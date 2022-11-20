/**
 * @file Interfaces - Options
 * @module docast-parse/interfaces/Options
 */

import type LexerOptions from './options-lexer'

/**
 * [`Parser`][1] options.
 *
 * [1]: ../parser.ts
 *
 * @extends {LexerOptions}
 */
interface Options extends LexerOptions {}

export type { Options as default }
