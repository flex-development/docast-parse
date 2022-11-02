/**
 * @file Fixtures - CoordinatePair
 * @module fixtures/CoordinatePair
 */

import type Coordinate from './coordinate'

/**
 * Pair of numbers representing a single point on a two-dimensional grid.
 */
interface CoordinatePair {
  /** x-coordinate. */
  x: Coordinate

  /** y-coordinate. */
  y: Coordinate

  /**
   * Returns a string representation of the coordinate.
   *
   * @return {string} String representation of coordinate
   */
  toString(): string
}

export type { CoordinatePair as default }
