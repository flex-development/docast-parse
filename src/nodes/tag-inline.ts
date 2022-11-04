/**
 * @file Nodes - InlineTag
 * @module docast/nodes/InlineTag
 */

import type { InlineTagData } from '#src/data'
import type { Type } from '#src/enums'
import type { FullPosition } from '#src/interfaces'
import type Node from './node'

/**
 * Inline tag node schema.
 *
 * **Note**: Inline tags begin with an at sign (`@`). Inline tags and their text
 * must be enclosed in curly braces (`{` and `}`). The `{` denotes the start of
 * the inline tag, and the `}` denotes the end of the inline tag.
 *
 * @extends {Node<InlineTagData>}
 */
interface InlineTag extends Node<InlineTagData> {
  data: InlineTagData
  position: FullPosition
  type: Type.INLINE_TAG
}

export type { InlineTag as default }
