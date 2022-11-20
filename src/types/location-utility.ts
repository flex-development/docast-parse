/**
 * @file Type Definitions - LocationUtility
 * @module docast-parse/types/LocationUtility
 */

import type { Point } from '@flex-development/docast'
import type unist from 'unist'

/**
 * Utility to convert between positional (line and column-based) and offsets
 * (range-based) locations.
 *
 * @see https://github.com/vfile/vfile-location
 */
type LocationUtility = {
  toPoint(offset: number): Point
  toOffset(point: unist.Point): number
}

export type { LocationUtility as default }
