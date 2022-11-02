/**
 * @file Node Data - Context
 * @module docast/data/Context
 */

import type { Kind, Modifier } from '#src/enums'
import type { FullPosition } from '#src/interfaces'
import type { Data } from 'unist'

/**
 * Data representing the declaration a [`Comment`][1] is for.
 *
 * [1]: ../nodes/comment.ts
 *
 * @extends {Data}
 */
interface Context extends Data {
  identifier: string
  kind: Kind
  members: string[]
  modifiers: Modifier[]
  position: FullPosition
}

export type { Context as default }
