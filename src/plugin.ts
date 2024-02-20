/**
 * @file Plugin
 * @module docast-parse/plugin
 */

import type { Root } from '@flex-development/docast'
import { fromDocs, type Options } from '@flex-development/docast-util-from-docs'
import type { Nilable, Optional } from '@flex-development/tutils'
import type { Extension as MdastExtension } from 'mdast-util-from-markdown'
import type { Extension as MicromarkExtension } from 'micromark-util-types'
import type { Data, Plugin, Processor } from 'unified'
import type { VFile } from 'vfile'

declare module 'unified' {
  interface Data {
    /**
     * Markdown extensions to change how micromark tokens are converted to
     * nodes.
     *
     * @see {@linkcode MdastExtension}
     * @see https://github.com/syntax-tree/mdast-util-from-markdown#list-of-extensions
     */
    fromMarkdownExtensions?: Optional<MdastExtension[]>

    /**
     * Micromark extensions to change how markdown is parsed.
     *
     * @see {@linkcode MicromarkExtension}
     * @see https://github.com/micromark/micromark#extensions
     */
    micromarkExtensions?: Optional<MicromarkExtension[]>
  }

  interface Settings extends Options {}
}

/**
 * Configure the docblock parser.
 *
 * @see {@linkcode Options}
 * @see {@linkcode Processor}
 *
 * @this {Processor}
 *
 * @param {Nilable<Options>?} [options] - Configuration options
 * @return {void} Nothing
 */
function plugin(this: Processor, options?: Nilable<Options>): void {
  /**
   * Processor data.
   *
   * @const {Data} data
   */
  const data: Data = this.data()

  // initialize extensions
  data.fromMarkdownExtensions ??= []
  data.micromarkExtensions ??= []

  // initialize options
  options ??= {}
  options.mdastExtensions ??= []
  options.micromarkExtensions ??= []

  // configure extensions
  data.fromMarkdownExtensions.push(...options.mdastExtensions)
  data.micromarkExtensions.push(...options.micromarkExtensions)

  /**
   * Docblock parser.
   *
   * @param {string} document - Source document
   * @param {VFile} file - Source file
   * @return {Root} docast tree
   */
  const parser = (document: string, file: VFile): Root => {
    return fromDocs(String(file), {
      ...this.data('settings'),
      ...options,
      mdastExtensions: data.fromMarkdownExtensions,
      micromarkExtensions: data.micromarkExtensions
    })
  }

  return void (this.parser = parser)
}

/**
 * Add support for docblock parsing.
 *
 * @see {@linkcode Options}
 * @see {@linkcode Plugin}
 * @see {@linkcode Root}
 *
 * @this {Processor}
 *
 * @param {Nilable<Options>?} [options] - Configuration options
 * @return {void} Nothing
 */
const docastParse: Plugin<[Nilable<Options>?], string, Root> = plugin

export default docastParse
