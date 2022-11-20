/**
 * @file Lexer
 * @module docast-parse/lexer
 */

import { Kind } from '@flex-development/docast'
import type { Nullable } from '@flex-development/tutils'
import { detab } from 'detab'
import type { VFile } from 'vfile'
import { LexerState, TokenKind } from './enums'
import Grammar from './grammar'
import type { LexerOptions, Token } from './interfaces'
import Reader from './reader'
import type { Predicate } from './types'

/**
 * Tokenizer.
 *
 * Reads input from a [character reader][1] and produces a token sequence.
 *
 * [1]: {@link ./reader.ts}
 *
 * @class
 */
class Lexer {
  /**
   * @public
   * @readonly
   * @member {VFile} file - Source file
   */
  public readonly file: VFile

  /**
   * @protected
   * @readonly
   * @member {Grammar} grammar - Lexical grammar handler
   */
  protected readonly grammar: Grammar

  /**
   * @public
   * @readonly
   * @member {Required<LexerOptions>} options - Lexer options
   */
  public readonly options: Required<LexerOptions>

  /**
   * @protected
   * @member {number} position - Current position in token sequence
   */
  protected position: number

  /**
   * @protected
   * @readonly
   * @member {Reader} reader - Character reader
   */
  protected readonly reader: Reader

  /**
   * @protected
   * @readonly
   * @member {Token} sequence - Token sequence
   */
  protected readonly sequence: Token[]

  /**
   * @protected
   * @member {LexerState} state - Current state
   */
  protected state: LexerState

  /**
   * Instantiates a new lexer.
   *
   * @param {string} document - Document to tokenize
   * @param {VFile} file - File associated with `document`
   * @param {LexerOptions} [options={}] - Lexer options
   * @param {number} [options.indent_size=2] - Indent size
   * @param {number} [options.max_line_length=80] - Maximum line length
   */
  constructor(document: string, file: VFile, options: LexerOptions = {}) {
    const { indent_size = 2, max_line_length = 80 } = options

    /*
     * preprocess source file.
     *
     * this includes:
     *
     * - converting tabs to spaces (1 tab === indent_size)
     * - normalizing line endings
     */
    file.value = detab(document, indent_size).replace(/\r\n/gm, '\n')

    // initialize lexer
    this.file = file
    this.grammar = new Grammar()
    this.position = -1
    this.options = Object.freeze({ indent_size, max_line_length })
    this.reader = new Reader(file.value)
    this.sequence = []
    this.state =
      this.reader.eof || !this.grammar.COMMENT.test(file.value)
        ? LexerState.DONE
        : LexerState.READY

    // tokenize source file
    this.tokenize()
  }

  /**
   * Checks if the lexer is at the end of the token sequence.
   *
   * @public
   *
   * @return {boolean} `true` if at end of token sequence
   */
  public get done(): boolean {
    return this.offset >= this.tokens.length - 1
  }

  /**
   * Returns the current position in the token sequence.
   *
   * @public
   *
   * @return {number} Current position in token sequence
   */
  public get offset(): number {
    return this.position
  }

  /**
   * Returns the current token sequence.
   *
   * @public
   *
   * @return {Token[]} Current token sequence
   */
  public get tokens(): Token[] {
    return this.sequence
  }

  /**
   * Adds a token to the sequence.
   *
   * @protected
   *
   * @param {keyof typeof TokenKind} kind - Token kind
   * @param {number} k - Difference between index of token `value` and current
   * position in source file
   * @param {Nullable<string>} [value=null] - Token value
   * @return {{ sequenced: boolean; token: Token }} Object containing new token
   * and boolean indicating if token was added to sequence
   */
  protected addToken(
    kind: keyof typeof TokenKind,
    k: number,
    value: Nullable<string> = null
  ): { sequenced: boolean; token: Token } {
    /**
     * Most recently added token.
     *
     * @const {Token | undefined} last
     */
    const last: Token | undefined = this.sequence[this.sequence.length - 1]

    /**
     * Token to add to sequence.
     *
     * @const {Token} token
     */
    const token: Token = {
      kind: TokenKind[kind],
      point: this.reader.toPoint(this.reader.offset + k),
      state: this.state,
      value
    }

    /**
     * Boolean indicating if {@linkcode token} was added to sequence.
     *
     * @var {boolean} sequenced
     */
    let sequenced: boolean = false

    // decide if token should be added to sequence
    switch (kind) {
      case 'COMMENT_END':
      case 'COMMENT_START':
      case 'CONTEXT_END':
      case 'CONTEXT_START':
      case 'EOF':
      case 'IMPLICIT_DESCRIPTION_END':
      case 'IMPLICIT_DESCRIPTION_START':
      case 'TAG_BLOCK_END':
      case 'TAG_BLOCK_START':
      case 'TAG_INLINE_END':
      case 'TAG_INLINE_START':
        sequenced = true
        break
      case 'IDENTIFIER':
        switch (true) {
          case last?.kind === TokenKind.COMMENT_END:
          case last?.kind === TokenKind.KEYWORD:
          case last?.kind === TokenKind.KIND:
          case last?.kind === TokenKind.MODIFIER:
            sequenced = true
            break
        }
        break
      case 'KEYWORD':
        switch (true) {
          case last?.kind === TokenKind.COMMENT_END:
            sequenced = true
            break
        }
        break
      case 'KIND':
        switch (true) {
          case last?.kind === TokenKind.COMMENT_END:
          case last?.kind === TokenKind.KEYWORD:
          case last?.kind === TokenKind.IDENTIFIER:
          case last?.kind === TokenKind.MODIFIER:
            sequenced = true
            break
        }
        break
      case 'NEWLINE':
        switch (true) {
          case last?.kind === TokenKind.COMMENT_END:
          case last?.kind === TokenKind.NEWLINE:
            sequenced = true
            break
        }
        break
      case 'MODIFIER':
        switch (true) {
          case last?.kind === TokenKind.COMMENT_END:
          case last?.kind === TokenKind.MODIFIER:
            sequenced = true
            break
        }
        break
    }

    sequenced && this.sequence.push(token)
    return { sequenced, token }
  }

  /**
   * Returns the next `k`-th token from the token sequence without changing the
   * position of the lexer.
   *
   * @public
   *
   * @param {number} [k=1] - Difference between index of next `k`-th token and
   * current position in token sequence
   * @return {Nullable<Token>} Peeked token or `null`
   */
  public peek(k: number = 1): Nullable<Token> {
    return this.sequence[this.offset + k] ?? null
  }

  /**
   * Returns an array of tokens from the next `k`-th token to the next token
   * that meets `condition`.
   *
   * @public
   *
   * @param {Predicate<Token>} condition - Condition to stop peeking
   * @param {number} [k=1] - Difference between index of next `k`-th token and
   * current position in token sequence
   * @return {Token[]} Peeked tokens
   */
  public peekUntil(condition: Predicate<Token>, k: number = 1): Token[] {
    /**
     * Peeked tokens.
     *
     * @const {Token[]} peeked
     */
    const peeked: Token[] = []

    for (let j = k; j <= this.tokens.length; j++) {
      /**
       * Peeked token.
       *
       * @const {Token} token
       */
      const token: Token = this.peek(j)!

      // add peeked token
      peeked.push(token)

      // stop peeking once condition has been met
      if (condition(token, this.offset + j, this.tokens)) break
    }

    return peeked
  }

  /**
   * Returns the next `k`-th token from the token sequence.
   *
   * Unlike {@link peek}, this method will change the position of the lexer.
   *
   * @public
   *
   * @param {number} [k=1] - Difference between index of next `k`-th token and
   * current position in token sequence
   * @return {Nullable<Token>} Next `k`-th token or `null`
   */
  public read(k: number = 1): Nullable<Token> {
    return this.sequence[(this.position += k)] ?? null
  }

  /**
   * Tokenizes {@linkcode file}.
   *
   * @protected
   *
   * @return {void} Nothing when complete
   */
  protected tokenize(): void {
    if (this.state === LexerState.DONE) return void this.addToken('EOF', 0)

    // get lexer options
    const { indent_size, max_line_length } = this.options

    // traverse indent levels to get context tokens
    for (let i = 0; i <= max_line_length; i += indent_size) {
      /**
       * Regular expression for a docblock comment, with or without context, on
       * indent level {@linkcode i}.
       *
       * @const {RegExp} regex
       */
      const regex: RegExp = this.grammar.docblock(i, indent_size)

      // add context tokens
      for (const match of this.reader.peekUntil().matchAll(regex)) {
        const { groups = {}, index = 0, input = '' } = match
        let { context: ctx = '' } = groups

        // two empty lines => no comment context
        if (ctx !== '\n\n') {
          // trim context
          ctx = ctx.trim()

          /**
           * Index of comment context in source file.
           *
           * @const {number} offset
           */
          const offset: number = input.indexOf(ctx, index) + 1

          // add context start and end tokens
          this.addToken('CONTEXT_START', offset, ctx)
          const { column, line } = this.tokens[this.tokens.length - 1]!.point
          this.addToken('CONTEXT_END', offset + ctx.length, `${line}:${column}`)
        }
      }
    }

    /**
     * Current position in source file.
     *
     * @var {number} index
     */
    let index: number = 0

    // tokenize source file
    while (!this.reader.eof) {
      /**
       * Difference between index of next `k`-th character and current position
       * in source file.
       *
       * @var {number} k
       */
      let k: number = index - this.reader.offset

      /**
       * Next `k`-th character.
       *
       * @const {string} char
       */
      const char: string = this.reader.peek(k)

      /**
       * Remaining unread characters.
       *
       * **Note**: Includes {@linkcode char}.
       *
       * @const {string} chars
       */
      const chars: string = this.reader.peekUntil(k)

      /**
       * Most recently added token kind.
       *
       * @const {TokenKind | undefined} ltk
       */
      const ltk: TokenKind | undefined =
        this.tokens[this.tokens.length - 1]?.kind

      // add token to token sequence
      switch (true) {
        case char === '':
          this.state = LexerState.DONE
          this.addToken('EOF', k)
          break
        case this.grammar.emptyline(k, this.state, this.reader):
          this.addToken('NEWLINE', k, char)
          this.addToken('NEWLINE', k + 1, char)
          k += 1
          index += 1
          break
        case this.grammar.ignorable(k, this.state, this.reader):
          const [, ignorable] = this.grammar.IGNORABLE_COMMENT.exec(chars)!
          k += ignorable!.length - 1
          index += ignorable!.length - 2
          break
        case this.grammar.startComment(k, this.state, this.reader):
          this.state = LexerState.COMMENT
          this.addToken('COMMENT_START', k, chars.slice(0, 3))
          k += 2
          index += 2
          break
        case this.grammar.startImplicitDescription(k, this.state, this.reader):
          this.state = LexerState.IMPLICIT_DESCRIPTION
          this.addToken('IMPLICIT_DESCRIPTION_START', k, char)
          break
        case this.grammar.startTagBlock(k, this.state, this.reader):
          this.state = LexerState.TAG_BLOCK
          this.addToken('TAG_BLOCK_START', k, char)
          break
        case this.grammar.startTagInline(k, this.state, this.reader):
          const [, tag = ''] = this.grammar.TAG_INLINE.exec(chars)!

          this.addToken('TAG_INLINE_START', k, tag)
          this.addToken('TAG_INLINE_END', k + tag.length, tag[tag.length - 1])

          k += tag.length - 1
          index += tag.length - 2
          break
        case this.grammar.endComment(k, this.state, this.reader):
          this.addToken('COMMENT_END', k + 1, this.reader.peek(k - 1) + char)
          this.state = LexerState.READY
          break
        case this.grammar.endImplicitDescription(k, this.state, this.reader):
          this.addToken('IMPLICIT_DESCRIPTION_END', k, char)
          this.state = LexerState.COMMENT
          break
        case this.grammar.endTagBlock(k, this.state, this.reader):
          this.addToken('TAG_BLOCK_END', k, char)
          this.state = LexerState.COMMENT
          break
        case this.grammar.modifier(k, this.state, this.reader):
          const [, modifier = ''] = this.grammar.MODIFIER.exec(chars)!

          this.addToken('MODIFIER', k, modifier)

          if (/^default\s+(?:async\s+)??\s*\W/.test(chars)) {
            this.addToken('KIND', k, modifier)
          }

          if (/^default\s+(?:async\s+)?(?:function\s+)?\s*\W/.test(chars)) {
            this.addToken('IDENTIFIER', k, modifier)
          }

          k += modifier.length - 1
          index += modifier.length - 2
          break
        case this.grammar.kind(k, this.state, this.reader):
          const [, kind = ''] = this.grammar.KIND.exec(chars)!

          this.addToken('KIND', k, kind)
          if (kind === Kind.CONSTRUCTOR) this.addToken('IDENTIFIER', k, kind)

          k += kind.length - 1
          index += kind.length - 2
          break
        case this.grammar.keyword(k, this.state, this.reader):
          const [, kw = ''] = this.grammar.KEYWORD.exec(chars)!

          this.addToken('KEYWORD', k, kw)

          if (ltk === TokenKind.COMMENT_END) {
            this.addToken('KIND', k, Kind.STATEMENT)
            this.addToken('IDENTIFIER', k, kw)
          }

          k += kw.length - 1
          index += kw.length - 2
          break
        case this.grammar.identifier(k, this.state, this.reader):
          const [, identifier = ''] = this.grammar.IDENTIFIER.exec(chars)!

          this.addToken('IDENTIFIER', k, identifier)

          k += identifier.length === 1 ? 1 : identifier.length - 1
          index += identifier.length === 1 ? 1 : identifier.length - 2
          break
      }

      this.reader.read(k)
      index++
    }

    // sort token sequence
    Object.assign(this, {
      sequence: this.sequence
        .sort((token1, token2) => token1.point.line - token2.point.line)
        .sort((token1, token2) => token1.point.column - token2.point.column)
        .sort((token1, token2) => token1.point.offset - token2.point.offset)
    })

    return void this.state
  }
}

export default Lexer
