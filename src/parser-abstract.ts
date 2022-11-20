/**
 * @file AbstractParser
 * @module docast-parse/AbstractParser
 */

import type { Node } from 'unist'
import type { VFile } from 'vfile'

/**
 * Abstract file parser.
 *
 * @see https://github.com/unifiedjs/unified#processorparser
 *
 * @abstract
 * @class
 *
 * @template Tree - Node that the parser yields
 */
abstract class AbstractParser<Tree extends Node = Node> {
  /**
   * Instantiates a new file parser.
   *
   * @param {string} document - Document to parse
   * @param {VFile} file - File associated with `document`
   */
  constructor(document: string, file: VFile) {}

  /**
   * Parses text to a syntax tree.
   *
   * @public
   * @abstract
   *
   * @return {Tree} Syntax tree representing source file
   */
  public abstract parse(): Tree
}

export default AbstractParser
