/**
 * @file Fixtures - miniStringFuck
 * @module fixtures/miniStringFuck
 * @see https://codewars.com/kata/586dd26a69b6fd46dd0000c0
 */

/**
 * [MiniStringFuck][1] interpreter.
 *
 * [1]: https://esolangs.org/wiki/MiniStringFuck
 *
 * @param {string} code - MiniStringFuck program to execute
 * @return {string} Program output
 */
export default (code: string): string => {
  /** @const {number} MAX_MEMORY - Max amount of memory that can be stored */
  const MAX_MEMORY: number = 255

  /** @var {number} cell - Memory cell */
  let cell: number = 0

  /** @var {string} output - Program output */
  let output: string = ''

  // interpret code
  for (const command of code) {
    if (command === '+') cell = cell === MAX_MEMORY ? 0 : cell + 1
    if (command === '.') output += String.fromCodePoint(cell)
  }

  return output
}
