/**
 * @file Fixtures - alphabet
 * @module fixtures/alphabet
 */

/**
 * Alphabet generator.
 *
 * @generator
 * @yield {string} Next letter in alphabet
 * @next {void}
 *
 * @return {Generator<string, void, void>} Alphabet generator
 */
function* alphabet(): Generator<string, void, void> {
  yield 'a'
  yield 'b'
  yield 'c'
  yield 'd'
  yield 'e'
  yield 'f'
  yield 'g'
  yield 'h'
  yield 'i'
  yield 'j'
  yield 'k'
  yield 'l'
  yield 'm'
  yield 'n'
  yield 'o'
  yield 'p'
  yield 'q'
  yield 'r'
  yield 's'
  yield 't'
  yield 'u'
  yield 'v'
  yield 'w'
  yield 'x'
  yield 'y'
  yield 'z'
}

export default alphabet
