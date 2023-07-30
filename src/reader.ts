/**
 * @file Reader
 * @module docast-parse/reader
 */

import type { Point } from '@flex-development/docast'
import {
  at,
  cast,
  ifelse,
  isNumber,
  type Nilable,
  type Optional
} from '@flex-development/tutils'
import type unist from 'unist'
import { location, type Location } from 'vfile-location'

/**
 * Character reader.
 *
 * Reads documents and provides characters upon request.
 *
 * @class
 */
class Reader {
  /**
   * @protected
   * @readonly
   * @member {string} document - Document to read
   */
  protected readonly document: string

  /**
   * Utility to convert between positional (line and column-based) and offsets
   * (range-based) locations.
   *
   * @see https://github.com/vfile/vfile-location
   *
   * @protected
   * @readonly
   * @member {Location} location
   */
  protected readonly location: Location

  /**
   * @protected
   * @member {number} position - Current position in {@linkcode document}
   */
  protected position: number

  /**
   * Instantiates a new character reader.
   *
   * @param {string} document - Document to read
   */
  constructor(document: string) {
    this.document = document
    this.location = location(this.document)
    this.position = ifelse(document.length, -1, 0)
  }

  /**
   * Checks if the reader is at the end of the document.
   *
   * @public
   *
   * @return {boolean} `true` if at end of document
   */
  public get eof(): boolean {
    return this.offset >= this.document.length
  }

  /**
   * Returns the current position in the document.
   *
   * @public
   *
   * @return {number} Current position in document
   */
  public get offset(): number {
    return this.position
  }

  /**
   * Returns the next `k`-th character from the document without changing the
   * position of the reader.
   *
   * The first empty string returned denotes the end of the document.
   *
   * @public
   *
   * @param {number} [k=1] - Difference between index of next `k`-th character
   * and current position in document
   * @return {string} Peeked character
   */
  public peek(k: number = 1): string {
    return at(this.document, this.offset + k, '')
  }

  /**
   * Returns a section of the document from the next `k`-th character to the
   * next `z`-th character.
   *
   * @public
   *
   * @param {number} [k=1] - Difference between index of next `k`-th character
   * and current position in document
   * @param {number} [z=this.document.length - this.position - k] - Difference
   * between document length and index to start section
   * @return {string} Peeked characters
   */
  public peekUntil(
    k: number = 1,
    z: number = this.document.length - this.offset - k
  ): string {
    return this.document.slice(this.offset + k, this.offset + k + z + 1)
  }

  /**
   * Returns the next `k`-th character from the document.
   *
   * Unlike {@link peek}, this method will change the position of the reader.
   *
   * The first empty string returned denotes the end of the document.
   *
   * @public
   *
   * @param {number} [k=1] - Difference between index of next `k`-th character
   * and current position in document
   * @return {string} Next `k`-th character or empty string
   */
  public read(k: number = 1): string {
    return at(this.document, (this.position += k), '')
  }

  /**
   * Returns an offset for a line and column based [*point*][1].
   *
   * **Note**: Returns `-1` when given invalid or out of bounds input.
   *
   * [1]: https://github.com/syntax-tree/unist#point
   *
   * @public
   *
   * @param {Nilable<unist.Point>} [point] - Line and column based point
   * @return {number} Document index
   */
  public toOffset(point?: Nilable<unist.Point>): number {
    /**
     * Offset for {@linkcode point}.
     *
     * @const {Optional<number>} offset
     */
    const offset: Optional<number> = this.location.toOffset(point)

    return ifelse(isNumber(offset), cast(offset), -1)
  }

  /**
   * Returns a line and column based [*point*][1].
   *
   * [1]: https://github.com/syntax-tree/unist#point
   *
   * @public
   *
   * @param {Nilable<number>} [offset] - Document index
   * @return {Point} Line and column based point
   */
  public toPoint(offset?: Nilable<number>): Point {
    /**
     * Line and column based {@linkcode unist.Point} for {@linkcode offset}.
     *
     * @const {Optional<unist.Point>} point
     */
    const point: Optional<unist.Point> = this.location.toPoint(offset)

    return ifelse(point, cast(point), {
      column: Number.NaN,
      line: Number.NaN,
      offset: -1
    })
  }
}

export default Reader
