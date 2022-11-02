/**
 * @file Nodes - Comment
 * @module docast/nodes/Comment
 */

import type { CommentData } from '#src/data'
import type { Type } from '#src/enums'
import type { FullPosition } from '#src/interfaces'
import type { Parent } from 'unist'
import type ImplicitDescription from './implicit-description'
import type BlockTag from './tag-block'

/**
 * Comment node schema.
 *
 * @extends {Parent<BlockTag | ImplicitDescription, CommentData>}
 */
interface Comment extends Parent<BlockTag | ImplicitDescription, CommentData> {
  data: CommentData
  position: FullPosition
  type: Type.COMMENT
}

export type { Comment as default }
