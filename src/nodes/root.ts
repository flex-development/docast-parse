/**
 * @file Nodes - Root
 * @module docast/nodes/Root
 */

import type { RootData } from '#src/data'
import type { Type } from '#src/enums'
import type { Parent } from 'unist'
import type Comment from './comment'

/**
 * Root node schema.
 *
 * @see https://github.com/syntax-tree/unist#root
 *
 * @extends {Parent<Comment, RootData>}
 */
interface Root extends Parent<Comment, RootData> {
  position: undefined
  type: Type.ROOT
}

export type { Root as default }
