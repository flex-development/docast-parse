/**
 * @file Nodes - Parent
 * @module docast/nodes/Parent
 */

import type {
  BlockTagData,
  CommentData,
  ImplicitDescriptionData,
  RootData
} from '#src/data'
import type { Type } from '#src/enums'
import type Comment from './comment'
import type ImplicitDescription from './implicit-description'
import type Node from './node'
import type BlockTag from './tag-block'
import type InlineTag from './tag-inline'

/**
 * Generic parent node schema.
 *
 * **Note**: Schema follows the `unist` spec, but is specific to `docast`.
 *
 * @see https://github.com/syntax-tree/unist#parent
 *
 * @template Child - Child node type
 * @template Data - Information from the ecosystem
 *
 * @extends {Node<Data>}
 */
interface Parent<
  Child extends BlockTag | Comment | ImplicitDescription | InlineTag =
    | BlockTag
    | Comment
    | ImplicitDescription
    | InlineTag,
  Data extends
    | BlockTagData
    | CommentData
    | ImplicitDescriptionData
    | RootData = BlockTagData | CommentData | ImplicitDescriptionData | RootData
> extends Node<Data> {
  children: Child[]
  type: Type.BLOCK_TAG | Type.COMMENT | Type.IMPLICIT_DESCRIPTION | Type.ROOT
}

export type { Parent as default }
