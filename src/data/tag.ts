/**
 * @file Node Data - Tag
 * @module docast/data/Tag
 */

import type { Data } from 'unist'

/**
 * Tag node data schema.
 *
 * [1]: ../nodes/tag-block.ts
 * [2]: ../nodes/tag-inline.ts
 *
 * @see [`BlockTag`][1]
 * @see [`InlineTag`][2]
 *
 * @extends {Data}
 */
interface TagData extends Data {
  tag: string
  text: string
  value: string
}

export type { TagData as default }
