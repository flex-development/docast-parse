/**
 * @file Node Data - Comment
 * @module docast/data/Comment
 */

import type { Nullable } from '@flex-development/tutils'
import type { SyntaxKind } from 'typescript'
import type { Data } from 'unist'

/**
 * [`Comment`][1] node data schema.
 *
 * [1]: ../nodes/comment.ts
 *
 * @extends {Data}
 */
interface CommentData extends Data {
  symbol: Nullable<{
    identifier: string
    kind: SyntaxKind | -1
    members: string[]
    modifiers: string[]
  }>
  value: string
}

export type { CommentData as default }
