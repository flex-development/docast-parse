/**
 * @file Nodes - ImplicitDescription
 * @module docast/nodes/ImplicitDescription
 */

import type { ImplicitDescriptionData } from '#src/data'
import type { Type } from '#src/enums'
import type { FullPosition } from '#src/interfaces'
import type { Parent } from 'unist'
import type InlineTag from './tag-inline'

/**
 * Implicit description node schema.
 *
 * **Note**: An implicit description is text located at the **beginning** of a
 * comment. It is used in lieu of @description.
 *
 * @extends {Parent<InlineTag, ImplicitDescriptionData>}
 */
interface ImplicitDescription
  extends Parent<InlineTag, ImplicitDescriptionData> {
  data: ImplicitDescriptionData
  position: FullPosition
  type: Type.IMPLICIT_DESCRIPTION
}

export type { ImplicitDescription as default }
