/**
 * @file Fixtures - CoordinatePair
 * @module fixtures/CoordinatePair
 */

import type Coordinate from './coordinate'

/**
 * Pair of numbers representing a single point on a two-dimensional grid.
 */
interface CoordinatePair {
  /**
   * Error handler.
   *
   * @param {Error} error - Error to handle
   * @return {void} Nothing when complete
   */
  catch?(error: Error): void

  /** x-coordinate. */
  x: Coordinate

  /** y-coordinate. */
  y: Coordinate

  /** Coordinate type. */
  type?: string

  /**
   * Returns a string representation of the coordinate.
   *
   * @return {string} String representation of coordinate
   */
  toString(): string
}

export type { CoordinatePair as default }
