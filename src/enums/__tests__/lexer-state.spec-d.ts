/**
 * @file Unit Tests - LexerState
 * @module docast-parse/enums/tests/unit-d/LexerState
 */

import type TestSubject from '../lexer-state'

describe('unit-d:enums/LexerState', () => {
  it('should match [COMMENT: number]', () => {
    expectTypeOf<typeof TestSubject>().toHaveProperty('COMMENT').toBeNumber()
  })

  it('should match [DONE: number]', () => {
    expectTypeOf<typeof TestSubject>().toHaveProperty('DONE').toBeNumber()
  })

  it('should match [IMPLICIT_DESCRIPTION: number]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('IMPLICIT_DESCRIPTION')
      .toBeNumber()
  })

  it('should match [READY: number]', () => {
    expectTypeOf<typeof TestSubject>().toHaveProperty('READY').toBeNumber()
  })

  it('should match [TAG_BLOCK: number]', () => {
    expectTypeOf<typeof TestSubject>().toHaveProperty('TAG_BLOCK').toBeNumber()
  })

  it('should match [TAG_INLINE: number]', () => {
    expectTypeOf<typeof TestSubject>().toHaveProperty('TAG_INLINE').toBeNumber()
  })
})
