/**
 * @file Unit Tests - Token
 * @module docast-parse/interfaces/tests/unit-d/Token
 */

import type { LexerState, TokenKind } from '#src/enums'
import type { Point } from '@flex-development/docast'
import type { Nullable } from '@flex-development/tutils'
import type TestSubject from '../token'

describe('unit-d:interfaces/Token', () => {
  it('should match [kind: TokenKind]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('kind')
      .toEqualTypeOf<TokenKind>()
  })

  it('should match [point: Point]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('point').toEqualTypeOf<Point>()
  })

  it('should match [state: LexerState]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('state')
      .toEqualTypeOf<LexerState>()
  })

  it('should match [value: Nullable<string>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('value')
      .toEqualTypeOf<Nullable<string>>()
  })
})
