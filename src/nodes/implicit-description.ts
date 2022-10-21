/**
 * @file Nodes - ImplicitDescription
 * @module docast/nodes/ImplicitDescription
 */

import type { ImplicitDescriptionData } from '#src/data'
import type Type from '#src/enums/type'
import type { Parent, Position } from 'unist'
import type { FullPoint } from 'vfile-location'
import type InlineTag from './tag-inline'

/**
 * Implicit description node schema.
 *
 * **Note**: An implicit description is a symbol description located at the
 * **beginning** of a comment. It is used in lieu of @description.
 *
 * @extends {Parent<InlineTag, ImplicitDescriptionData>}
 */
interface ImplicitDescription
  extends Parent<InlineTag, ImplicitDescriptionData> {
  data: ImplicitDescriptionData
  position: Position & { end: FullPoint; start: FullPoint }
  type: Type.IMPLICIT_DESCRIPTION
}

export type { ImplicitDescription as default }
