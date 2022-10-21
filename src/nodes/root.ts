/**
 * @file Nodes - Root
 * @module docast/nodes/Root
 */

import type { Type } from '#src/enums'
import type { ObjectEmpty } from '@flex-development/tutils'
import type { Parent } from 'unist'
import type Comment from './comment'

/**
 * Root node schema.
 *
 * @see https://github.com/syntax-tree/unist#root
 *
 * @extends {Parent<Comment, ObjectEmpty>}
 */
interface Root extends Parent<Comment, ObjectEmpty> {
  position: undefined
  type: Type.ROOT
}

export type { Root as default }
