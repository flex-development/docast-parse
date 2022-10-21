/**
 * @file Node Data - ImplicitDescription
 * @module docast/data/ImplicitDescription
 */

import type { Data } from 'unist'

/**
 * [`ImplicitDescription`][1] node data schema.
 *
 * [1]: ../nodes/implicit-description.ts
 *
 * @extends {Data}
 */
interface ImplicitDescriptionData extends Data {
  value: string
}

export type { ImplicitDescriptionData as default }
