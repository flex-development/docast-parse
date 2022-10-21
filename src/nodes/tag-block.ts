/**
 * @file Nodes - BlockTag
 * @module docast/nodes/BlockTag
 */

import type { BlockTagData } from '#src/data'
import type Type from '#src/enums/type'
import type { Parent, Position } from 'unist'
import type { FullPoint } from 'vfile-location'
import type InlineTag from './tag-inline'

/**
 * Block tag node schema.
 *
 * **Note**: Block tags begin with an at sign (`@`). Each block tag must be
 * followed by a line break, with the exception of the last block tag in a
 * comment.
 *
 * @extends {Parent<InlineTag, BlockTagData>}
 */
interface BlockTag extends Parent<InlineTag, BlockTagData> {
  data: BlockTagData
  position: Position & { end: FullPoint; start: FullPoint }
  type: Type.BLOCK_TAG
}

export type { BlockTag as default }
