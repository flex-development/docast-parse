/**
 * @file Parser
 * @module docast-parse/parser
 */

import {
  Kind,
  Type,
  type BlockTag,
  type Comment,
  type Context,
  type ImplicitDescription,
  type InlineTag,
  type Position,
  type Root
} from '@flex-development/docast'
import type { Nullable } from '@flex-development/tutils'
import regexp from 'escape-string-regexp'
import type unist from 'unist'
import { u } from 'unist-builder'
import { source } from 'unist-util-source'
import type { VFile } from 'vfile'
import { TokenKind } from './enums'
import type { Options, Token } from './interfaces'
import Lexer from './lexer'
import AbstractParser from './parser-abstract'

/**
 * File parser.
 *
 * @see https://github.com/unifiedjs/unified#processorparser
 *
 * @class
 *
 * @extends {AbstractParser<Root>}
 */
class Parser extends AbstractParser<Root> {
  /**
   * @protected
   * @readonly
   * @member {Lexer} lexer - Source file tokenizer
   */
  protected readonly lexer: Lexer

  /**
   * Instantiates a new file parser.
   *
   * @param {string} document - Document to parse
   * @param {VFile} file - File associated with `document`
   * @param {Options} [options={}] - Parser options
   * @param {number} [options.indent_size=2] - Indent size
   */
  constructor(document: string, file: VFile, options: Options = {}) {
    super(document, file)
    this.lexer = new Lexer(document, file, options)
  }

  /**
   * Parses text to a syntax tree.
   *
   * @public
   * @override
   *
   * @return {Root} Syntax tree representing source file
   */
  public override parse(): Root {
    /**
     * Comment nodes.
     *
     * @const {Comment[]} children
     */
    const children: Comment[] = []

    /**
     * Current position in token sequence.
     *
     * @var {number} index
     */
    let index: number = 0

    // parse tokens
    while (!this.lexer.done) {
      /**
       * Difference between index of next `k`-th token and current position in
       * token sequence.
       *
       * @const {number} k
       */
      const k: number = index - this.lexer.offset

      /**
       * Next `k`-th token in token sequence.
       *
       * @const {Token} token
       */
      const token: Token = this.lexer.peek(k)!

      // add comment node
      if (token.kind === TokenKind.COMMENT_START) {
        children.push(this.parseComment(token, k))
      }

      // consume token and move onto the next
      this.lexer.read(k)
      index++
    }

    // add nodes to tree
    return u(Type.ROOT, { children })
  }

  /**
   * Creates a [**comment**][1] node.
   *
   * [1]: https://github.com/flex-development/docast#comment
   *
   * @protected
   *
   * @param {Token} token - Token to create node from
   * @param {number} k - Difference between `token` index and lexer position
   * @return {Comment} Comment node
   * @throws {SyntaxError}
   */
  protected parseComment(token: Token, k: number): Comment {
    // throw if token is of unexpected kind
    if (token.kind !== TokenKind.COMMENT_START) {
      throw new SyntaxError('expected token of kind COMMENT_START')
    }

    /**
     * Tokens between `token` and comment end token.
     *
     * @const {Token[]} tokens
     */
    const tokens: Token[] = this.lexer.peekUntil(token => {
      return token.kind === TokenKind.COMMENT_END
    }, k + 1)

    /**
     * Possible comment end token.
     *
     * @const {Token | undefined} token_match
     */
    const token_match: Token | undefined = tokens.pop()

    // throw if comment end token was not found
    if (token_match?.kind !== TokenKind.COMMENT_END) {
      throw new SyntaxError('expected token of kind COMMENT_END')
    }

    /**
     * Comment node children.
     *
     * @const {(BlockTag | ImplicitDescription)[]} children
     */
    const children: (BlockTag | ImplicitDescription)[] = []

    // get comment node children
    for (const [i, tok] of tokens.entries()) {
      /**
       * Difference between child token index and lexer position.
       *
       * @const {number} j
       */
      const j: number = k + i + 1

      // get comment node child
      switch (tok.kind) {
        case TokenKind.IMPLICIT_DESCRIPTION_START:
          children.push(this.parseImplicitDescription(tok, j))
          break
        case TokenKind.TAG_BLOCK_START:
          children.push(this.parseTagBlock(tok, j))
          break
        default:
          break
      }
    }

    /**
     * Position of comment in source file.
     *
     * @const {Position} position
     */
    const position: Position = { end: token_match.point, start: token.point }

    /**
     * Comment node value.
     *
     * @const {string} value
     */
    const value: string = this.source(position)!

    /**
     * Difference between index of token after comment end token and current
     * position in token sequence.
     *
     * @const {number} j
     */
    const j: number = k + tokens.length + 2

    return u(Type.COMMENT, {
      children,
      context: this.parseContext(this.lexer.peek(j)!, j),
      position,
      value
    })
  }

  /**
   * Creates a [*context*][1] object.
   *
   * [1]: https://github.com/flex-development/docast#context
   *
   * @protected
   *
   * @param {Token} token - Token to create node from
   * @param {number} k - Difference between `token` index and lexer position
   * @return {Nullable<Context>} Comment context or `null`
   * @throws {SyntaxError}
   */
  protected parseContext(token: Token, k: number): Nullable<Context> {
    // no context start token => no context
    if (token.kind !== TokenKind.CONTEXT_START) return null

    /**
     * Tokens between `token` and context end token.
     *
     * @const {Token[]} tokens
     */
    const tokens: Token[] = this.lexer.peekUntil(tok => {
      if (tok.kind !== TokenKind.CONTEXT_END) return false
      return tok.value === `${token.point.line}:${token.point.column}`
    }, k + 1)

    /**
     * Possible context end token.
     *
     * @const {Token | undefined} token_match
     */
    const token_match: Token | undefined = tokens.pop()

    // throw if context end token was not found
    if (token_match?.kind !== TokenKind.CONTEXT_END) {
      throw new SyntaxError('expected token of kind CONTEXT_END')
    }

    /**
     * Difference between index of context start token for code segment parent
     * and current position in token sequence.
     *
     * @var {number} j
     */
    let j: number = Number.NaN

    /**
     * Context start token for code segment parent.
     *
     * @var {Nullable<Token>} pct
     */
    let pct: Nullable<Token> = null

    // find context start token for code segment parent
    for (let i = this.lexer.offset + k - 1; i >= 0; i--) {
      /**
       * Possible context start token for code segment parent.
       *
       * @const {Token} tok
       */
      const tok: Token = this.lexer.tokens.at(i)!

      // do nothing if token is not a context start token
      if (tok.kind !== TokenKind.CONTEXT_START) continue

      // stop search once context start token for parent has been found
      if (tok.value!.includes(token.value!)) {
        j = i - this.lexer.offset
        pct = tok
        break
      }
    }

    /**
     * Code segment identifier.
     *
     * @const {string} identifier
     */
    const identifier: string = tokens.find(tok => {
      return tok.kind === TokenKind.IDENTIFIER
    })!.value!

    /**
     * Code segment syntax kind.
     *
     * @var {string} kind
     */
    let kind: string = Kind.UNKNOWN

    // get code segment syntax kind
    switch (true) {
      case identifier === Kind.CONSTRUCTOR:
        kind = Kind.CONSTRUCTOR
        break
      /* c8 ignore next 3 */
      case token.value!.startsWith('declare global'):
        kind = Kind.MODULE
        break
      case tokens.some(({ kind, point }) => {
        return kind === TokenKind.KIND && point.line === token.point.line
      }):
        kind = tokens.find(({ kind, point }) => {
          return kind === TokenKind.KIND && point.line === token.point.line
        })!.value!
        break
      case pct && /^(?:(?:\w+ )+)?enum +.+{/.test(pct.value!):
        kind = Kind.MEMBER
        break
      case new RegExp(
        `^(?:(?:\\w+ )+)?${regexp(identifier)}(?:\\??:?)\\(`
      ).test(token.value!):
        kind = Kind.METHOD
        break
      case new RegExp(
        `^(?:(?:\\w+ )+)?${regexp(identifier)}(?:\\??:?)[\n ]`
      ).test(token.value!):
        kind = Kind.PROPERTY
        break
    }

    return {
      identifier,
      kind,
      parent: pct
        ? this.lexer
            .peekUntil(tok => {
              if (tok.kind !== TokenKind.CONTEXT_END) return false
              return tok.value === `${pct?.point.line}:${pct?.point.column}`
            }, j + 1)
            .find(tok => tok.kind === TokenKind.IDENTIFIER)!.value!
        : null,
      position: { end: token_match.point, start: token.point }
    }
  }

  /**
   * Creates an [**implicit description**][1] node.
   *
   * [1]: https://github.com/flex-development/docast#implicitdescription
   *
   * @protected
   *
   * @param {Token} token - Token to create node from
   * @param {number} k - Difference between `token` index and lexer position
   * @return {ImplicitDescription} Implicit description node
   * @throws {SyntaxError}
   */
  protected parseImplicitDescription(
    token: Token,
    k: number
  ): ImplicitDescription {
    // throw if token is of unexpected kind
    if (token.kind !== TokenKind.IMPLICIT_DESCRIPTION_START) {
      throw new SyntaxError('expected token of kind IMPLICIT_DESCRIPTION_START')
    }

    /**
     * Tokens between `token` and implicit description end token.
     *
     * @const {Token[]} tokens
     */
    const tokens: Token[] = this.lexer.peekUntil(token => {
      return token.kind === TokenKind.IMPLICIT_DESCRIPTION_END
    }, k + 1)

    /**
     * Possible implicit description end token.
     *
     * @const {Token | undefined} token_match
     */
    const token_match: Token | undefined = tokens.pop()

    // throw if implicit description end token was not found
    if (token_match?.kind !== TokenKind.IMPLICIT_DESCRIPTION_END) {
      throw new SyntaxError('expected token of kind IMPLICIT_DESCRIPTION_END')
    }

    /**
     * Implicit description node children.
     *
     * @const {InlineTag[]} children
     */
    const children: InlineTag[] = []

    // get implicit description node children
    for (const [i, tok] of tokens.entries()) {
      if (tok.kind !== TokenKind.TAG_INLINE_START) continue
      children.push(this.parseTagInline(tok, k + i + 1))
    }

    /**
     * Position of implicit description in source file.
     *
     * @const {Position} position
     */
    const position: Position = { end: token_match.point, start: token.point }

    return u(Type.IMPLICIT_DESCRIPTION, {
      children,
      position,
      value: this.uncomment(this.source(position)!)
    })
  }

  /**
   * Creates a [**block tag**][1] node.
   *
   * [1]: https://github.com/flex-development/docast#blocktag
   *
   * @protected
   *
   * @param {Token} token - Token to create node from
   * @param {number} k - Difference between `token` index and lexer position
   * @return {BlockTag} Block tag node
   * @throws {SyntaxError}
   */
  protected parseTagBlock(token: Token, k: number): BlockTag {
    // throw if token is of unexpected kind
    if (token.kind !== TokenKind.TAG_BLOCK_START) {
      throw new SyntaxError('expected token of kind TAG_BLOCK_START')
    }

    /**
     * Tokens between `token` and block tag end token.
     *
     * @const {Token[]} tokens
     */
    const tokens: Token[] = this.lexer.peekUntil(token => {
      return token.kind === TokenKind.TAG_BLOCK_END
    }, k + 1)

    /**
     * Possible block tag end token.
     *
     * @const {Token | undefined} token_match
     */
    const token_match: Token | undefined = tokens.pop()

    // throw if block tag end token was not found
    if (token_match?.kind !== TokenKind.TAG_BLOCK_END) {
      throw new SyntaxError('expected token of kind TAG_BLOCK_END')
    }

    /**
     * Block tag node children.
     *
     * @const {InlineTag[]} children
     */
    const children: InlineTag[] = []

    // get block tag node children
    for (const [i, tok] of tokens.entries()) {
      if (tok.kind !== TokenKind.TAG_INLINE_START) continue
      children.push(this.parseTagInline(tok, k + i + 1))
    }

    /**
     * Position of block tag in source file.
     *
     * @const {Position} position
     */
    const position: Position = { end: token_match.point, start: token.point }

    /**
     * Block tag regex.
     *
     * @const {RegExp} regex
     */
    const regex: RegExp = /^(?<tag>@\S+)(?<text>\s+.+)?$/s

    /**
     * Block tag node value.
     *
     * @const {string} value
     */
    const value: string = this.uncomment(this.source(position)!)

    // get node data
    const [, tag = '', text = ''] = regex.exec(value)!

    return u(Type.BLOCK_TAG, {
      children,
      position,
      tag,
      text: text.trim(),
      value
    })
  }

  /**
   * Creates an [**inline tag**][1] node.
   *
   * [1]: https://github.com/flex-development/docast#inlinetag
   *
   * @protected
   *
   * @param {Token} token - Token to create node from
   * @param {number} k - Difference between `token` index and lexer position
   * @return {InlineTag} Inline tag node
   * @throws {SyntaxError}
   */
  protected parseTagInline(token: Token, k: number): InlineTag {
    // throw if token is of unexpected kind
    if (token.kind !== TokenKind.TAG_INLINE_START) {
      throw new SyntaxError('expected token of kind TAG_INLINE_START')
    }

    /**
     * Possible inline tag end token.
     *
     * @const {Nullable<Token>} token_match
     */
    const token_match: Nullable<Token> = this.lexer.peek(k + 1)

    // throw if inline tag end token was not found
    if (token_match?.kind !== TokenKind.TAG_INLINE_END) {
      throw new SyntaxError('expected token of kind TAG_INLINE_END')
    }

    /**
     * Inline tag regex.
     *
     * @const {RegExp} regex
     */
    const regex: RegExp = /^{(?<tag>@\S+(?<text>\s+.+?))}$/s

    /**
     * Position of inline tag in source file.
     *
     * @const {Position} position
     */
    const position: Position = { end: token_match.point, start: token.point }

    // get node data
    const [, tag = '', text = ''] = regex.exec(token.value!)!

    return u(Type.INLINE_TAG, {
      position,
      tag,
      text: text.trim(),
      value: token.value!
    })
  }

  /**
   * Retrieves the source code of a node or position.
   *
   * @see https://github.com/syntax-tree/unist-util-source
   *
   * @protected
   *
   * @param {unist.Node | unist.Position} value - Node or position
   * @return {Nullable<string>} Source code or `null`
   */
  protected source(value: unist.Node | unist.Position): Nullable<string> {
    return source(value, this.lexer.file)
  }

  /**
   * Removes comment delimiters from `value`.
   *
   * @protected
   *
   * @param {string} value - Node value to normalize
   * @return {string} `value` without comment delimiters
   */
  protected uncomment(value: string): string {
    return value.replace(/^\/\*\*(?:\n| +)|(?:\n| +)\*\/$|^ +\* ?/gm, '')
  }
}

export default Parser
