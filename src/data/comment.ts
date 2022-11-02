/**
 * @file Node Data - Comment
 * @module docast/data/Comment
 */

import type { Nullable } from '@flex-development/tutils'
import type { Data } from 'unist'
import type Context from './context'

/**
 * [`Comment`][1] node data schema.
 *
 * [1]: ../nodes/comment.ts
 *
 * @extends {Data}
 */
interface CommentData extends Data {
  context: Nullable<Context>
  value: string
}

export type { CommentData as default }
