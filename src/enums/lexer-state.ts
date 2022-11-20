/**
 * @file Enums - LexerState
 * @module docast-parse/enums/LexerState
 */

/**
 * [`Lexer`][1] states.
 *
 * [1]: {@link ../lexer.ts}
 *
 * @enum {number}
 */
enum LexerState {
  COMMENT,
  DONE,
  IMPLICIT_DESCRIPTION,
  READY,
  TAG_BLOCK,
  TAG_INLINE
}

export default LexerState
