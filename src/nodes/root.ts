/**
 * @file Nodes - Root
 * @module docast/nodes/Root
 */

import type { RootData } from '#src/data'
import type { Type } from '#src/enums'
import type Comment from './comment'
import type Parent from './parent'

/**
 * Root node schema.
 *
 * @see https://github.com/syntax-tree/unist#root
 *
 * @extends {Parent<Comment, RootData>}
 */
interface Root extends Parent<Comment, RootData> {
  position?: never
  type: Type.ROOT
}

export type { Root as default }
