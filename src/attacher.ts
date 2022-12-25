/**
 * @file Attacher
 * @module docast-parse/attacher
 */

import type { Root } from '@flex-development/docast'
import type { Plugin, Processor } from 'unified'
import type { VFile } from 'vfile'
import type { Options } from './interfaces'
import Parser from './parser'

/**
 * The `docastParse` attacher.
 *
 * @see https://github.com/unifiedjs/unified#function-attacheroptions
 *
 * @type {Plugin<[Options?], string, Root>}
 * @this {Processor<Root, Root>}
 *
 * @param {Options} [options={}] - Parser options
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

  return void this
}

export default attacher
