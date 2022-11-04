/**
 * @file Nodes - Node
 * @module docast/nodes/Node
 */

import type {
  BlockTagData,
  CommentData,
  ImplicitDescriptionData,
  InlineTagData,
  RootData,
  TagData
} from '#src/data'
import type { Type } from '#src/enums'
import type { FullPosition } from '#src/interfaces'
import type unist from 'unist'

/**
 * Generic node schema.
 *
 * **Note**: Schema follows the `unist` spec, but is specific to `docast`.
 *
 * @see https://github.com/syntax-tree/unist#node
 *
 * @template Data - Information from the ecosystem
 *
 * @extends {unist.Node<Data>}
 */
interface Node<
  Data extends
    | BlockTagData
    | CommentData
    | ImplicitDescriptionData
    | InlineTagData
    | RootData
    | TagData =
    | BlockTagData
    | CommentData
    | ImplicitDescriptionData
    | InlineTagData
    | RootData
    | TagData
> extends unist.Node<Data> {
  data: Data
  position?: FullPosition
  type: Type
}

export type { Node as default }
