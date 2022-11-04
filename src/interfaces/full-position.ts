/**
 * @file Interfaces - FullPosition
 * @module docast/interfaces/FullPosition
 */

import type { Position } from 'unist'

/**
 * Location of a node in a source file.
 *
 * @see https://github.com/syntax-tree/unist#position
 *
 * @extends {Position}
 */
interface FullPosition extends Position {
  end: Required<Position['end']>
  start: Required<Position['start']>
}

export type { FullPosition as default }
