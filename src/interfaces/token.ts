/**
 * @file Interfaces - Token
 * @module docast-parse/interfaces/Token
 */

import type { LexerState, TokenKind } from '#src/enums'
import type { Point } from '@flex-development/docast'
import type { Nullable } from '@flex-development/tutils'

/**
 * [`Lexer`][1] token schema.
 *
 * [1]: ../lexer.ts
 */
interface Token {
  /**
   * Token kind.
   *
   * [1]: {@link ../enums/token-kind.ts}
   *
   * @see [`TokenKind`][1]
   */
  kind: TokenKind

  /**
   * Location of lexeme in source file.
   */
  point: Point

  /**
   * Lexer state when token was added to token sequence.
   *
   * [1]: {@link ../enums/lexer-state.ts}
   *
   * @see [`LexerState`][1]
   */
  state: LexerState

  /**
   * Token value.
   */
  value: Nullable<string>
}

export type { Token as default }
