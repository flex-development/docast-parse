/**
 * @file Plugin
 * @module docast-parse/plugin
 */

import type { Root } from '@flex-development/docast'
import { fromDocs, type Options } from '@flex-development/docast-util-from-docs'
import type { EmptyArray, Optional } from '@flex-development/tutils'
import type { Extension as MdastExtension } from 'mdast-util-from-markdown'
import type { Extension as MicromarkExtension } from 'micromark-util-types'
import type { Plugin, Processor } from 'unified'
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

  interface Settings
    extends Omit<Options, 'mdastExtensions' | 'micromarkExtensions'> {}
}

/**
 * Configure the docblock parser.
 *
 * @see {@linkcode Options}
 * @see {@linkcode Processor}
 *
 * @this {Processor}
 *
 * @return {void} Nothing
 */
function plugin(this: Processor): void {
  /**
   * Docblock parser.
   *
   * @param {string} document - Source document
   * @param {VFile} file - Source file
   * @return {Root} docast tree
   */
  const parser = (document: string, file: VFile): Root => {
    return fromDocs(String(file), {
      // options are not documented in the readme.
      // options should be set by plugins on `data` instead of passed by users.
      ...this.data('settings'),
      mdastExtensions: this.data('fromMarkdownExtensions'),
      micromarkExtensions: this.data('micromarkExtensions')
    })
  }

  return void (this.parser = parser)
}

/**
 * Add support for docblock parsing.
 *
 * @see {@linkcode Plugin}
 * @see {@linkcode Root}
 *
 * @this {Processor}
 *
 * @return {void} Nothing
 */
const docastParse: Plugin<EmptyArray, string, Root> = plugin

export default docastParse
