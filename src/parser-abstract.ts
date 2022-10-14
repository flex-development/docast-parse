/**
 * @file AbstractParser
 * @module docast/AbstractParser
 */

import type { Node } from 'unist-builder'
import type { VFile } from 'vfile'

/**
 * Abstract file parser.
 *
 * @see https://github.com/unifiedjs/unified#processorparser
 *
 * @abstract
 *
 * @template Tree - Node that the parser yields
 */
abstract class AbstractParser<Tree extends Node = Node> {
  /**
   * @protected
   * @readonly
   * @member {string} document - Document to parse
   */
  protected readonly document: string

  /**
   * @protected
   * @readonly
   * @member {VFile} file - File associated with {@link document}
   */
  protected readonly file: VFile

  /**
   * Instantiates a new file parser.
   *
   * @param {string} document - Document to parse
   * @param {VFile} file - File associated with `document`
   */
  constructor(document: string, file: VFile) {
    this.document = document
    this.file = file
  }

  /**
   * Parses {@link file}.
   *
   * @public
   * @abstract
   *
   * @return {Tree} Syntax tree representing {@link file}
   */
  public abstract parse(): Tree
}

export default AbstractParser
