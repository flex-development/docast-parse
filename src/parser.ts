/**
 * @file Parser
 * @module docast/parser
 */

import type { Nullable } from '@flex-development/tutils'
import ts from 'typescript'
import { u } from 'unist-builder'
import type { VFile } from 'vfile'
import { location } from 'vfile-location'
import { Type } from './enums'
import type { FullPosition, ParserOptions } from './interfaces'
import {
  BLOCK_TAG_REGEX,
  IMPLICIT_DESCRIPTION_REGEX,
  INLINE_TAG_REGEX
} from './internal/constants'
import type {
  BlockTag,
  Comment,
  ImplicitDescription,
  InlineTag,
  Root
} from './nodes'
import AbstractParser from './parser-abstract'

/**
 * File parser.
 *
 * @see https://github.com/unifiedjs/unified#processorparser
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
   * @member {ParserOptions} options - Parser options
   */
  protected options: ParserOptions

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
   * @param {ParserOptions} [options={}] - Parser options
   */
  constructor(
    document: string,
    file: VFile,
    {
      base,
      data = file.data,
      dir,
      ext,
      history = file.history,
      name,
      path,
      root = file.cwd
    }: ParserOptions = {}
  ) {
    super(document, file)

    this.location = location(document)
    this.options = {}
    this.root = u(Type.ROOT, { children: [], position: undefined })

    this.file.cwd = this.options.root = root
    this.file.data = this.options.data = data
    this.file.history = this.options.history = history

    if (base) this.file.basename = this.options.base = base
    if (path as string) this.file.path = this.options.path = path as string

    if (dir && this.file.path) this.file.dirname = this.options.dir = dir
    if (ext && this.file.path) this.file.extname = this.options.ext = ext
    if (name && this.file.path) this.file.stem = this.options.name = name
  }

  /**
   * Finds block tags in a comment.
   *
   * @see {@link BlockTag}
   *
   * @protected
   *
   * @param {string} comment - Comment to search
   * @return {BlockTag[]} Block tag node array
   */
  protected findBlockTags(comment: string): BlockTag[] {
    return [...comment.matchAll(BLOCK_TAG_REGEX)].map(match => {
      const { 0: raw = '', groups = {} } = match
      const { tag = '', text = '' } = groups

      /**
       * Block tag node value.
       *
       * @const {string} value
       */
      const value: string = this.uncomment(raw)

      return u(Type.BLOCK_TAG, {
        children: this.findInlineTags(value),
        data: {
          tag,
          text: text ? this.uncomment(text) : '',
          value: text ? value : tag
        },
        position: this.position(raw)
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
     * @const {Comment[]} groups
     */
    const comments: Comment[] = []

    // exit early if document is empty
    if (this.document.trim().length === 0) return comments

    /**
     * TypeScript sourcefile.
     *
     * @const {ts.SourceFile} sourcefile
     */
    const sourcefile: ts.SourceFile = ts.createSourceFile(
      '',
      this.document,
      ts.ScriptTarget.Latest,
      true
    )

    /**
     * TypeScript AST nodes.
     *
     * @var {ts.Node[]} tsnodes
     */
    let tsnodes: ts.Node[] = []

    /**
     * Recursively pushes `node` and all descendants into {@link tsnodes}.
     *
     * @param {ts.Node} node - Node to add
     * @return {void} Nothing when complete
     */
    const process = (node: ts.Node): void => {
      tsnodes.push(node)
      for (const child of node.getChildren()) process(child)
    }

    // get comment nodes
    for (const statement of sourcefile.statements) {
      // populate tsnodes
      process(statement)

      // process jsdoc nodes
      for (const tsn of tsnodes.filter(n => n.kind === ts.SyntaxKind.JSDoc)) {
        /**
         * Comment node data value.
         *
         * @const {string} value
         */
        const value: string = tsn.getFullText().trim()

        /**
         * Start index of comment in {@link document}.
         *
         * @const {number} index
         */
        const index: number = this.document.indexOf(value)

        /**
         * Name of symbol comment is for.
         *
         * @var {Nullable<string>} identifier
         */
        let identifier: Nullable<string> = null

        /**
         * Kind of symbol comment is for.
         *
         * @var {ts.SyntaxKind | -1} kind
         */
        let kind: ts.SyntaxKind | -1 = tsn.parent.kind

        // new line after comment => comment does not have related identifier
        // this check accounts for the fact that typescript does not respect new
        // lines after comments. new lines are typically used as separators
        if (/\n/.exec(this.document[index + value.length + 1]!)) kind = -1

        // find identifier name based on jsdoc parent
        switch (kind) {
          case ts.SyntaxKind.ClassDeclaration:
          case ts.SyntaxKind.EnumDeclaration:
          case ts.SyntaxKind.EnumMember:
          case ts.SyntaxKind.FunctionDeclaration:
          case ts.SyntaxKind.GetAccessor:
          case ts.SyntaxKind.InterfaceDeclaration:
          case ts.SyntaxKind.MethodDeclaration:
          case ts.SyntaxKind.ModuleDeclaration:
          case ts.SyntaxKind.PropertyDeclaration:
          case ts.SyntaxKind.PropertySignature:
          case ts.SyntaxKind.SetAccessor:
          case ts.SyntaxKind.TypeAliasDeclaration:
            const { name } = tsn.parent as unknown as {
              name?: ts.DeclarationName
            }
            identifier = name?.getText().trim() ?? 'anonymous'
            break
          case ts.SyntaxKind.Constructor:
            identifier = 'constructor'
            break
          case ts.SyntaxKind.ExportAssignment:
            identifier = 'anonymous'
            break
          case ts.SyntaxKind.VariableStatement:
            const { declarationList } = tsn.parent as ts.VariableStatement
            const { 0: declaration } = declarationList.declarations
            identifier = declaration!.name.getText().trim()
            break
          default:
            break
        }

        // add comment node
        comments.push(
          u(Type.COMMENT, {
            children: [
              this.findImplicitDescription(value),
              ...this.findBlockTags(value)
            ].filter(n => n !== null) as (BlockTag | ImplicitDescription)[],
            data: {
              symbol: identifier
                ? {
                    identifier,
                    kind,
                    members:
                      kind === ts.SyntaxKind.ClassDeclaration ||
                      kind === ts.SyntaxKind.EnumDeclaration ||
                      kind === ts.SyntaxKind.InterfaceDeclaration
                        ? (
                            tsn.parent as
                              | ts.ClassDeclaration
                              | ts.EnumDeclaration
                              | ts.InterfaceDeclaration
                          ).members.map(member => {
                            switch (member.kind) {
                              case ts.SyntaxKind.Constructor:
                                return 'constructor'
                              default:
                                return member.name!.getText().trim()
                            }
                          })
                        : [],
                    modifiers:
                      kind === ts.SyntaxKind.ExportAssignment
                        ? ['export', 'default']
                        : ts
                            .getModifiers(tsn.parent as ts.HasModifiers)
                            ?.map(modifier => modifier.getText().trim()) ?? []
                  }
                : null,
              value
            },
            position: this.position(value)
          })
        )
      }

      // reset tsnodes for next statement
      tsnodes = []
    }

    return comments
  }

  /**
   * Finds an implicit description in a comment.
   *
   * @see {@link ImplicitDescription}
   *
   * @protected
   *
   * @param {string} comment - Comment to search
   * @return {Nullable<ImplicitDescription>} Implicit description node or `null`
   */
  protected findImplicitDescription(
    comment: string
  ): Nullable<ImplicitDescription> {
    /**
     * Possible implicit description match.
     *
     * @const {RegExpMatchArray | null} match
     */
    const match: RegExpMatchArray | null = comment
      .matchAll(IMPLICIT_DESCRIPTION_REGEX)
      .next().value

    // exit early if match or implicit description was not found
    if (!match?.groups?.raw) return null

    /**
     * Implicit description node value.
     *
     * @const {string} value
     */
    const value: string = this.uncomment(match.groups.raw)

    return u(Type.IMPLICIT_DESCRIPTION, {
      children: this.findInlineTags(value),
      data: { value },
      position: this.position(match.groups.raw)
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
   * @return {InlineTag[]} Inline tag node array
   */
  protected findInlineTags(val: string): InlineTag[] {
    return [...val.matchAll(INLINE_TAG_REGEX)].map(match => {
      const { 0: value, groups = {} } = match
      const { tag = '', text = '' } = groups

      return u(Type.INLINE_TAG, {
        data: { tag, text, value },
        position: this.position(value)
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
  public parse(): Root {
    return u(Type.ROOT, { children: this.findComments(), position: undefined })
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
   * @return {FullPosition} Node position
   */
  protected position(node: string): FullPosition {
    /**
     * Start index of {@link node} in {@link document}.
     *
     * @const {number} start
     */
    const start: number = this.document.indexOf(node)

    return {
      end: this.location.toPoint(start + node.length),
      start: this.location.toPoint(start)
    }
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
    return raw.replace(/^\/\*\*(?:\n| +)|(?:\n| +)\*\/$|^[\t ]+\* ?/gm, '')
  }
}

export default Parser
