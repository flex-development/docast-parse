/**
 * @file Fixtures - dblLinear
 * @module fixtures/dblLinear
 * @see https://codewars.com/kata/5672682212c8ecf83e000050
 */

/**
 * Consider a sequence `u` where `u` is defined as follows:
 *
 * 1. The number `u(0) = 1` is the first one in `u`
 * 2. For each `x` in `u`, `y = 2x + 1` and `z = 3x + 1` must be in `u` too
 * 3. There are no other numbers in `u`
 *
 * Given an index, `n`, the function returns the element at `u(n)`.
 *
 * @async
 *
 * @example
 *  await dblLinear(0) // 1
 * @example
 *  await dblLinear(10) // 22
 * @example
 *  await dblLinear(100) // 447
 * @example
 *  await dblLinear(7687) // 111718
 *
 * @param {number} n - Index of element to get
 * @return {Promise<number>} Element at `u(n)`
 */
async function dblLinear(n: number): Promise<number> {
  /** @const {number[]} u - Sequence */
  const u: number[] = [1]

  /** @var {number} j - Index of x in {@linkcode u} used to calculate y */
  let j: number = 0

  /** @var {number} k - Index of x in {@linkcode u} used to calculate z */
  let k: number = 0

  /*
   * build sequence up to index n (inclusive)
   */
  for (let i = 1; i <= n; i++) {
    /** @const {number} y - `y` */
    const y: number = 2 * u[j]! + 1

    /** @const {number} z - `z` */
    const z: number = 3 * u[k]! + 1

    /* set sequence value to smallest value in [y, z] */
    u[i] = Math.min(y, z)

    // increase of index of x used to calculate y by 1
    if (u[i] === y) j++

    // increase of index of x used to calculate z by 1
    if (u[i] === z) k++
  }

  return u[n]!
}

export default dblLinear
