/**
 * @file Nodes - Comment
 * @module docast/nodes/Comment
 */

import type { CommentData } from '#src/data'
import type Type from '#src/enums/type'
import type { Parent, Position } from 'unist'
import type { FullPoint } from 'vfile-location'
import type ImplicitDescription from './implicit-description'
import type BlockTag from './tag-block'

/**
 * Comment node schema.
 *
 * @extends {Parent<BlockTag | ImplicitDescription, CommentData>}
 */
interface Comment extends Parent<BlockTag | ImplicitDescription, CommentData> {
  data: CommentData
  position: Position & { end: FullPoint; start: FullPoint }
  type: Type.COMMENT
}

export type { Comment as default }
