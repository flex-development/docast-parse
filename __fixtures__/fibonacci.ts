/**
 * @file Fixtures - fibonacci
 * @module fixtures/fibonacci
 */

import FibonacciSequence from './fibonacci-sequence'

/**
 * Fibonacci sequence generator.
 *
 * @see {@link FibonacciSequence}
 *
 * @async
 *
 * @generator
 * @yield {number} Next number in fibonacci sequence
 * @next {void}
 *
 * @param {number} max - Max sequence value
 * @return {AsyncGenerator<number, void, void>} Fibonacci sequence generator
 */
async function* fibonacci(max: number): AsyncGenerator<number, void, void> {
  /** @const {FibonacciSequence} sequence - Fibonacci sequence */
  const sequence: FibonacciSequence = new FibonacciSequence(max)

  /** @var {IteratorResult<number, number>} curr - Current sequence value */
  let curr: IteratorResult<number, number> = sequence.next()

  while (!curr.done) {
    yield curr.value
    curr = sequence.next()
  }
}

export default fibonacci
