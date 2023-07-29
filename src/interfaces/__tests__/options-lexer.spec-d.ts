/**
 * @file Unit Tests - LexerOptions
 * @module docast-parse/interfaces/tests/unit-d/LexerOptions
 */

import type { Optional, RequiredKeys } from '@flex-development/tutils'
import type TestSubject from '../options-lexer'

describe('unit-d:interfaces/LexerOptions', () => {
  it('should allow empty object', () => {
    expectTypeOf<RequiredKeys<TestSubject>>().toBeNever()
  })

  it('should match [indent_size?: number]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('indent_size')
      .toEqualTypeOf<Optional<number>>()
  })

  it('should match [max_line_length?: number]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('max_line_length')
      .toEqualTypeOf<Optional<number>>()
  })
})
