/**
 * @file Enums - TokenKind
 * @module docast-parse/enums/TokenKind
 */

/**
 * [`Token`][1] types.
 *
 * [1]: {@link ../interfaces/token.ts}
 *
 * @enum {number}
 */
enum TokenKind {
  COMMENT_END,
  COMMENT_START,
  CONTEXT_END,
  CONTEXT_START,
  EOF,
  IDENTIFIER,
  IMPLICIT_DESCRIPTION_END,
  IMPLICIT_DESCRIPTION_START,
  KEYWORD,
  KIND,
  MODIFIER,
  NEWLINE,
  TAG_BLOCK_END,
  TAG_BLOCK_START,
  TAG_INLINE_END,
  TAG_INLINE_START
}

export default TokenKind
