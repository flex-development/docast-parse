/**
 * @file Fixtures - buddy
 * @module fixtures/buddy
 */

import psum from './psum'

/**
 * The divisors of positive integer `n` are said to be `proper` when considering
 * divisors other than `n` itself.
 *
 * Let `s(n)` be the sum of `proper` divisors of `n`. Call `buddy` two positive
 * integers such that the sum of the `proper` divisors of each number is one
 * more than the other number:
 *
 * `[n, m]` are `buddy` if `s(m) = n + 1` and `s(n) = m + 1`
 *
 * Given two positive integers, `start` and `limit`, the function returns the
 * first pair of `buddy pairs` such that `start <= n <= limit` and `m > n`.
 *
 * @see {@linkcode psum}
 *
 * @example
 *  buddy(2382, 3679) // []
 * @example
 *  buddy(10, 50) // [48, 75]
 * @example
 *  buddy(48, 50) // [48, 75]
 * @example
 *  buddy(1071625, 1103735) // [1081184, 1331967]
 *
 * @param {number} start - Lower bound (inclusive)
 * @param {number} limit - Upper bound (inclusive)
 * @return {[] | [number, number]} First pair of `buddy pairs`
 */
const buddy = (start: number, limit: number): [] | [number, number] => {
  for (let n = start; n <= limit; n++) {
    /** @const {number} m - Possible `m` value */
    const m: number = psum(n) - 1

    /** if m satisfies constraint, return buddy pair */
    if (psum(m) === n + 1 && m > n) return [n, m]
  }

  return []
}

export default buddy
