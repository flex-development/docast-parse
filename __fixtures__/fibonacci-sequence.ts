/**
 * @file Fixtures - FibonacciSequence
 * @module fixtures/FibonacciSequence
 * @see https://codewars.com/kata/55695bc4f75bbaea5100016b
 */

/**
 * Fibonacci sequence iterator.
 *
 * @implements {Iterator<number, number>}
 */
class FibonacciSequence implements Iterator<number, number> {
  /**
   * @public
   * @instance
   * @member {number} fib1 - First current sequence value
   */
  public fib1: number = 1

  /**
   * @public
   * @instance
   * @member {number} fib2 - Second current sequence value
   */
  public fib2: number = 1

  /**
   * @protected
   * @instance
   * @member {number} max - Max sequence value
   */
  protected max: number

  /**
   * Creates a new fibonacci sequence iterator.
   *
   * @param {number} [max=Number.MAX_SAFE_INTEGER] - Max sequence value
   */
  constructor(max: number = Number.MAX_SAFE_INTEGER) {
    this.max = max < 0 ? 0 : max
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
   * Returns the next value in the fibonacci sequence.
   *
   * @public
   * @instance
   *
   * @return {IteratorResult<number, number>} Next value in sequence
   */
  public next(): IteratorResult<number, number> {
    /** @const {number} value - Temporary sequence value */
    const value: number = this.fib1

    // reset current sequence values
    this.fib1 = this.fib2
    this.fib2 = value + this.fib1

    return { done: value >= this.max, value }
  }
}

export default FibonacciSequence
