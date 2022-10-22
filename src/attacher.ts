/**
 * @file Attacher
 * @module docast/attacher
 */

import type { Plugin, Processor } from 'unified'
import type { VFile } from 'vfile'
import type { Options } from './interfaces'
import type { Root } from './nodes'
import Parser from './parser'

/**
 * Configures the `docast` processor.
 *
 * @see https://github.com/unifiedjs/unified#function-attacheroptions
 *
 * @type {Plugin<[Options?], string, Root>}
 * @this {Processor<Root, Root>}
 *
 * @param {Options} [options={}] - `docast` options
 * @return {void} Nothing when complete
 */
function attacher(this: Processor<Root, Root>, options: Options = {}): void {
  /**
   * File parser.
   *
   * @see https://github.com/unifiedjs/unified#processorparser
   *
   * @param {string} document - Document to parse
   * @param {VFile} file - File associated with `document`
   * @return {Root} Syntax tree representing `file`
   */
  this.Parser = function parser(document: string, file: VFile): Root {
    return new Parser(document, file, options).parse()
  }
}

export default attacher
