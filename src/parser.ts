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
import { detab } from 'detab'
import type unist from 'unist'
import { u } from 'unist-builder'
import { source } from 'unist-util-source'
import type { VFile } from 'vfile'
import { location } from 'vfile-location'
import type { Options } from './interfaces'
import {
  BLOCK_TAG_REGEX,
  COMMENT_WITH_CONTEXT_REGEX,
  IMPLICIT_DESCRIPTION_REGEX,
  INLINE_TAG_REGEX,
  INNER_CLASS_REGEX,
  MEMBER_OR_PROPERTY_REGEX,
  METHOD_REGEX
} from './internal/constants'
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
   * @member {ReturnType<typeof location>} location - Position and offset finder
   */
  protected readonly location: ReturnType<typeof location>

  /**
   * @protected
   * @readonly
   * @member {Required<Options>} options - Parser options
   */
  protected readonly options: Required<Options>

  /**
   * @protected
   * @member {Root} root - Syntax tree representing {@link file}
   */
  protected root: Root

  /**
   * Instantiates a new file parser.
   *
   * @param {string} document - Document to parse
   * @param {VFile} file - File associated with `document`
   * @param {Options} [options={}] - Parser options
   * @param {number} [options.indent_size=2] - Indent size
   * @param {number} [options.max_line_length=80] - Maximum line length
   */
  constructor(document: string, file: VFile, options: Options = {}) {
    super(document, file)

    // get parser options
    const { indent_size = 2, max_line_length = 80 } = options

    // convert tabs to spaces (1 tab === indent_size)
    this.document = this.file.value = detab(document, indent_size)

    // initialize locator, parser options, and syntax tree
    this.location = location(this.document)
    this.options = Object.freeze({ indent_size, max_line_length })
    this.root = u(Type.ROOT, { children: [] })
  }

  /**
   * Returns a set of JavaScript and TypeScript keywords.
   *
   * @see https://developer.mozilla.org/docs/Web/JavaScript/Reference/Lexical_grammar#keywords
   *
   * @protected
   *
   * @return {Set<string>} Keywords set
   */
  protected get keywords(): Set<string> {
    return new Set<string>([
      Kind.CLASS,
      Kind.CONST,
      Kind.CONSTRUCTOR,
      Kind.ENUM,
      Kind.FUNCTION,
      Kind.GENERATOR,
      Kind.GET,
      Kind.INTERFACE,
      Kind.LET,
      Kind.NAMESPACE,
      Kind.SET,
      Kind.TYPE,
      Kind.VAR,
      'abstract',
      'any',
      'arguments',
      'as',
      'assert',
      'async',
      'await',
      'break',
      'case',
      'catch',
      'continue',
      'debugger',
      'declare',
      'default',
      'delete',
      'do',
      'else',
      'eval',
      'export',
      'extends',
      'false',
      'finally',
      'for',
      'from',
      'global',
      'if',
      'implements',
      'import',
      'in',
      'infer',
      'instanceof',
      'is',
      'keyof',
      'never',
      'new',
      'null',
      'of',
      'override',
      'package',
      'private',
      'protected',
      'public',
      'readonly',
      'require',
      'return',
      'satisfies',
      'static',
      'super',
      'switch',
      'this',
      'throw',
      'true',
      'try',
      'typeof',
      'undefined',
      'unknown',
      'void',
      'while',
      'with',
      'yield',
      'yield*'
    ] as string[])
  }

  /**
   * Finds block tags in a comment.
   *
   * @see {@link BlockTag}
   *
   * @protected
   *
   * @param {string} comment - Comment to search
   * @param {number} [offset=0] - Start index of `comment` in {@link document}
   * @return {BlockTag[]} Block tag node array
   */
  protected findBlockTags(comment: string, offset: number = 0): BlockTag[] {
    return [...comment.matchAll(BLOCK_TAG_REGEX)].map(match => {
      const { groups = {}, index = 0 } = match
      const { tag = '' } = groups

      let { 0: raw } = match

      /**
       * Block tag node value.
       *
       * @const {string} value
       */
      const value: string = this.uncomment((raw = raw.trim()))

      /**
       * Start index of block tag in {@link document}.
       *
       * @const {number} start
       */
      const start: number = offset + index

      return u(Type.BLOCK_TAG, {
        children: this.findInlineTags(value, start),
        position: this.position(raw, start),
        tag,
        value
      })
    })
  }

  /**
   * Finds comments in {@link document}.
   *
   * @protected
   *
   * @return {Comment[]} Comment node array
   */
  protected findComments(): Comment[] {
    /**
     * Comment nodes.
     *
     * @var {Comment[]} nodes
     */
    let nodes: Comment[] = []

    // exit early if document is empty
    if (this.document.trim().length === 0) return nodes

    // get indent size and maximum line length
    const { indent_size, max_line_length } = this.options

    // get comment nodes by traversing indent levels
    for (let i = 0; i < max_line_length; i += indent_size) {
      /**
       * Previous indent level.
       *
       * @const {number} h
       */
      const h: number = i - indent_size

      /**
       * Regex to extract comments with or without context.
       *
       * @see {@link Context}
       *
       * @const {RegExp} regex
       */
      const regex: RegExp =
        i === 0
          ? COMMENT_WITH_CONTEXT_REGEX
          : new RegExp(
              `(?<=\n {${i}})(?<comment>\\/\\*\\*.*?\\*\\/)(?:(?=\n\n)|\n *(?<code>(?:@[\\w$]+(?:\\(.*?\\))?\n)?(?:\\/\\/ .+?\n)?(?:(?<modifiers>(?:(?:export )?(?:declare )?(?:default )? ?(?:abstract|async|declare|default)|export)|(?:(?:private|protected|public)?(?: abstract)?(?: ?override)?(?: ?readonly)?(?: ?static)?))\\s+)?(?:(?<kind>class|function\\*?|(?:const +)?enum|const(?!ructor)|get|interface|let|module|namespace|set|type|var)\\s+)?(?<identifier>\\[.+?]|#?\\*?[\\w$]+|["'].+?["'])?(?:(?:.+?(?=\n\n {${i}}\\/))|(?:.+?(?=\n\n {${i}}(?:${[
                ...this.keywords
              ].join('|')})))|(?:.+?(?=\n {0,${h}}}\n\n))|(?:.+?(?=\n})))))`,
              'gs'
            )

      // process comments
      for (const { groups = {}, index = 0 } of this.document.matchAll(regex)) {
        const { identifier = '', kind = '', modifiers = '' } = groups
        let { code = '', comment: value = '' } = groups

        // trim comment node value
        value = value.trim()

        /**
         * Comment node context.
         *
         * @var {Nullable<Context>} context
         */
        let context: Nullable<Context> = null

        // get comment node context
        if (code) {
          context = {
            identifier: '',
            kind: Kind.UNKNOWN,
            members: [],
            modifiers: [],
            parent: null,
            position: this.position((code = code.trim()), index)
          }

          // set identifier
          switch (true) {
            case code.startsWith(Kind.CONSTRUCTOR):
              context.identifier = Kind.CONSTRUCTOR
              break
            case !identifier && modifiers.startsWith('export default'):
              context.identifier = 'default'
              break
            default:
              context.identifier = identifier.trim()
          }

          // set kind
          switch (true) {
            case context.identifier === Kind.CONSTRUCTOR:
              context.kind = Kind.CONSTRUCTOR
              break
            case context.identifier === 'default':
              context.kind = Kind.DEFAULT
              break
            case kind === 'module':
            case code.startsWith('declare global'):
              context.kind = Kind.MODULE_DECLARATION
              break
            case kind !== '':
              context.kind = kind as Kind
              break
            case !!INNER_CLASS_REGEX.exec(code):
              context.kind = Kind.CLASS
              break
            case this.keywords.has(context.identifier):
              context.kind = Kind.UNKNOWN
              break
            // ! requires reset when finding members
            case !!METHOD_REGEX.exec(code):
              context.kind = 'method' as Kind
              break
            // ! requires reset when finding members
            case !!MEMBER_OR_PROPERTY_REGEX.exec(code):
              context.kind = 'property' as Kind
              break
          }

          // set modifiers
          context.modifiers = modifiers
            .split(' ')
            .map(modifier => modifier.trim())
            .filter(modifier => modifier !== '')
        }

        /**
         * Start index of comment in {@link document}.
         *
         * @const {number} start
         */
        const start: number = this.document.indexOf(value, index)

        // add comment node
        nodes.push(
          u(Type.COMMENT, {
            children: [
              this.findImplicitDescription(value, start),
              ...this.findBlockTags(value, start)
            ].filter(n => n !== null) as (BlockTag | ImplicitDescription)[],
            context,
            position: this.position(value, start),
            value
          })
        )
      }
    }

    // sort nodes by start position
    nodes = nodes.sort((node1, node2) => {
      return node1.position.start.offset - node2.position.start.offset
    })

    // find immediate members of class, const enum, enum, interface, module,
    // namespace, and type declarations
    nodes = nodes.map((node: Comment, i: number, arr: Comment[]): Comment => {
      // no context => no members
      if (!node.context) return node

      /**
       * Member names.
       *
       * @const {string[]} members
       */
      const members: string[] = []

      // find members
      switch (node.context.kind) {
        case Kind.CLASS:
        case Kind.CONST_ENUM:
        case Kind.ENUM:
        case Kind.INTERFACE:
        case Kind.MODULE_DECLARATION:
        case Kind.NAMESPACE:
        case Kind.TYPE:
          // begin search for members after current node
          for (let j = i + 1; j < arr.length; j++) {
            const n: Comment = arr[j]!
            const { context, position } = node
            const { start } = position

            // exactly one ident over => member
            if (n.position.start.column === start.column + indent_size) {
              // override unknown member kind
              // this can happen when a member's identifier is a keyword
              if (n.context?.kind === Kind.UNKNOWN) {
                const { position } = n.context

                /**
                 * Declaration source code.
                 *
                 * @const {string} source
                 */
                const source: string = this.source(position)!

                // reset unknown member kind
                switch (true) {
                  case !!METHOD_REGEX.exec(source):
                    n.context.kind = 'method' as Kind
                    break
                  case !!MEMBER_OR_PROPERTY_REGEX.exec(source):
                    n.context.kind = 'property' as Kind
                    break
                }
              }

              // ensure member kind is Kind
              switch (n.context?.kind) {
                case 'method' as Kind:
                  n.context.kind =
                    context.kind === Kind.CLASS
                      ? Kind.METHOD_DECLARATION
                      : Kind.METHOD_SIGNATURE
                  break
                case 'property' as Kind:
                  n.context.kind =
                    context.kind === Kind.CLASS
                      ? Kind.PROPERTY_DECLARATION
                      : context.kind === Kind.INTERFACE ||
                        context.kind === Kind.TYPE
                      ? Kind.PROPERTY_SIGNATURE
                      : Kind.ENUM_MEMBER
                  break
                default:
                  break
              }

              // set parent and add member
              if (n.context) {
                n.context.parent = context.identifier
                members.push(n.context.identifier)
              }
            }
          }

          break
        default:
          break
      }

      // reset members
      node.context.members = members

      return node
    })

    return nodes
  }

  /**
   * Finds an implicit description in a comment.
   *
   * @see {@link ImplicitDescription}
   *
   * @protected
   *
   * @param {string} comment - Comment to search
   * @param {number} [offset=0] - Start index of `comment` in {@link document}
   * @return {Nullable<ImplicitDescription>} Implicit description node or `null`
   */
  protected findImplicitDescription(
    comment: string,
    offset: number = 0
  ): Nullable<ImplicitDescription> {
    /**
     * Possible implicit description match.
     *
     * @const {RegExpMatchArray | undefined} match
     */
    const match: RegExpMatchArray | undefined = comment
      .matchAll(IMPLICIT_DESCRIPTION_REGEX)
      .next().value

    // exit early if implicit description was not found
    if (!match?.groups?.raw) return null

    /**
     * Start index of implicit description in {@link document}.
     *
     * @const {number} start
     */
    const start: number = offset + match.index!

    /**
     * Implicit description node value.
     *
     * @const {string} value
     */
    const value: string = this.uncomment(match.groups.raw)

    return u(Type.IMPLICIT_DESCRIPTION, {
      children: this.findInlineTags(value, start),
      position: this.position(match.groups.raw, start),
      value
    })
  }

  /**
   * Finds inline tags in a block tag, comment, or implicit description.
   *
   * @see {@link InlineTag}
   *
   * @protected
   *
   * @param {string} val - Node value to search
   * @param {number} [offset=0] - Start index of `val` in {@link document}
   * @return {InlineTag[]} Inline tag node array
   */
  protected findInlineTags(val: string, offset: number = 0): InlineTag[] {
    return [...val.matchAll(INLINE_TAG_REGEX)].map(match => {
      const { 0: value, groups = {}, index = 0 } = match

      return u(Type.INLINE_TAG, {
        position: this.position(value, offset + index),
        tag: groups.tag!,
        value
      })
    })
  }

  /**
   * Parses {@link document}.
   *
   * @public
   * @override
   *
   * @return {Root} Syntax tree representing {@link file}
   */
  public override parse(): Root {
    return u(Type.ROOT, { children: this.findComments() })
  }

  /**
   * Calculates the position of a node.
   *
   * @see https://github.com/syntax-tree/unist#position
   *
   * @todo indent (see syntax-tree/unist#16)
   *
   * @protected
   *
   * @param {string} node - Raw node value
   * @param {number} [from] - Index in {@link document} to begin `node` search
   * @return {Position} Node position
   */
  protected position(node: string, from?: number): Position {
    /**
     * Start index of {@link node} in {@link document}.
     *
     * @const {number} start
     */
    const start: number = this.document.indexOf(node, from)

    return {
      end: this.location.toPoint(start + node.length),
      start: this.location.toPoint(start)
    }
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
    return source(value, this.file)
  }

  /**
   * Removes comment delimiters (`/**`, `*\/`, ` * `) from `value`.
   *
   * @protected
   *
   * @param {string} raw - Raw node value to normalize
   * @return {string} `value` as human-readable string
   */
  protected uncomment(raw: string): string {
    return raw.replace(/^\/\*\*(?:\n| +)|(?:\n| +)\*\/$|^ +\* ?/gm, '')
  }
}

export default Parser
