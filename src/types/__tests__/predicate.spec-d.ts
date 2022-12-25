/**
 * @file Unit Tests - Predicate
 * @module docast-parse/types/tests/unit-d/Predicate
 */

import type { Token } from '#src/interfaces'
import type TestSubject from '../predicate'

describe('unit-d:types/Predicate', () => {
  it('should extract parameters [T, number, T[]]', () => {
    // Arrange
    type Params<T> = [T, number, T[]]

    // Expect
    expectTypeOf<TestSubject<Token>>().parameters.toEqualTypeOf<Params<Token>>()
    expectTypeOf<TestSubject<null>>().parameters.toEqualTypeOf<Params<null>>()
  })

  it('should return boolean', () => {
    expectTypeOf<TestSubject>().returns.toBeBoolean()
  })
})
