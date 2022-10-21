/**
 * @file Fixtures - psum
 * @module fixtures/psum
 */

/**
 * Returns the sum of `proper` divisors of `int`.
 *
 * @param {number} int - Integer to get `proper` divisors for
 * @return {number} Sum of `proper` divisors of `int`
 */
const psum = (int: number): number => {
  /** @var {number} sum - Sum of `proper` divisors of {@link int} */
  let sum: number = 1

  // calculate sum of proper divisors
  for (let d = 2; d <= Math.sqrt(int); d++) {
    // if d is divisible by int, increase sum
    // if divisors d and int/d are equal, add divisor once. otherwise add both
    if (int % d === 0) sum += d + (d === int / d ? 0 : int / d)
  }

  return sum
}
export default psum
