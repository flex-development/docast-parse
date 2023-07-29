/**
 * @file Unit Tests - Options
 * @module docast-parse/interfaces/tests/unit-d/Options
 */

import type { RequiredKeys } from '@flex-development/tutils'
import type TestSubject from '../options'
import type LexerOptions from '../options-lexer'

describe('unit-d:interfaces/Options', () => {
  it('should allow empty object', () => {
    expectTypeOf<RequiredKeys<TestSubject>>().toBeNever()
  })

  it('should extend LexerOptions', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<LexerOptions>()
  })
})
