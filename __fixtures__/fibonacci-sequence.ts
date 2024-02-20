/**
 * @file Fixtures - FibonacciSequence
 * @module fixtures/FibonacciSequence
 * @see https://codewars.com/kata/55695bc4f75bbaea5100016b
 */

/**
 * Fibonacci sequence iterator.
 *
 * :::info
 * A fibonacci sequence starts with two `1`s. Every element afterwards is the
 * sum of the two previous elements:
 * ```txt
 * 1, 1, 2, 3, 5, 8, 13, ..., 89, 144, 233, 377, ...
 * ```
 * :::
 *
 * @implements {Iterator<number, number>}
 */
class FibonacciSequence implements Iterator<number, number> {
  /**
   * First managed sequence value.
   *
   * @public
   * @instance
   * @member {number} fib1
   */
  public fib1: number

  /**
   * Second managed sequence value.
   *
   * @public
   * @instance
   * @member {number} fib2
   */
  public fib2: number

  /**
   * Max sequence value.
   *
   * @private
   * @instance
   * @member {number} max
   */
  readonly #max: number

  /**
   * Create a new fibonacci sequence iterator.
   *
   * @param {number} [max=Number.MAX_SAFE_INTEGER] - Max sequence value
   */
  constructor(max: number = Number.MAX_SAFE_INTEGER) {
    this.#max = max < 0 ? 0 : max
    this.fib1 = this.fib2 = 1
  }

  /**
   * Iterable protocol.
   *
   * @public
   * @instance
   *
   * @return {IterableIterator<number>} Current sequence iterator
   */
  public [Symbol.iterator](): IterableIterator<number> {
    return this
  }

  /**
   * Get the next value in the fibonacci sequence.
   *
   * @public
   * @instance
   *
   * @return {IteratorResult<number, number>} Next sequence value
   */
  public next(): IteratorResult<number, number> {
    /**
     * Temporary sequence value.
     *
     * @const {number} value
     */
    const value: number = this.fib1

    // reset current sequence values
    this.fib1 = this.fib2
    this.fib2 = value + this.fib1

    return { done: value >= this.#max, value }
  }
}

export default FibonacciSequence
