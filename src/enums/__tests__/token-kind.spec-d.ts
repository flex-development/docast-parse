/**
 * @file Unit Tests - TokenKind
 * @module docast-parse/enums/tests/unit-d/TokenKind
 */

import type TestSubject from '../token-kind'

describe('unit-d:enums/TokenKind', () => {
  it('should match [COMMENT_END: number]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('COMMENT_END')
      .toBeNumber()
  })

  it('should match [COMMENT_START: number]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('COMMENT_START')
      .toBeNumber()
  })

  it('should match [CONTEXT_END: number]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('CONTEXT_END')
      .toBeNumber()
  })

  it('should match [CONTEXT_START: number]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('CONTEXT_START')
      .toBeNumber()
  })

  it('should match [EOF: number]', () => {
    expectTypeOf<typeof TestSubject>().toHaveProperty('EOF').toBeNumber()
  })

  it('should match [IDENTIFIER: number]', () => {
    expectTypeOf<typeof TestSubject>().toHaveProperty('IDENTIFIER').toBeNumber()
  })

  it('should match [IMPLICIT_DESCRIPTION_END: number]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('IMPLICIT_DESCRIPTION_END')
      .toBeNumber()
  })

  it('should match [IMPLICIT_DESCRIPTION_START: number]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('IMPLICIT_DESCRIPTION_START')
      .toBeNumber()
  })

  it('should match [KEYWORD: number]', () => {
    expectTypeOf<typeof TestSubject>().toHaveProperty('KEYWORD').toBeNumber()
  })

  it('should match [KIND: number]', () => {
    expectTypeOf<typeof TestSubject>().toHaveProperty('KIND').toBeNumber()
  })

  it('should match [MODIFIER: number]', () => {
    expectTypeOf<typeof TestSubject>().toHaveProperty('MODIFIER').toBeNumber()
  })

  it('should match [NEWLINE: number]', () => {
    expectTypeOf<typeof TestSubject>().toHaveProperty('NEWLINE').toBeNumber()
  })

  it('should match [TAG_BLOCK_END: number]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('TAG_BLOCK_END')
      .toBeNumber()
  })

  it('should match [TAG_BLOCK_START: number]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('TAG_BLOCK_START')
      .toBeNumber()
  })

  it('should match [TAG_INLINE_END: number]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('TAG_INLINE_END')
      .toBeNumber()
  })

  it('should match [TAG_INLINE_START: number]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('TAG_INLINE_START')
      .toBeNumber()
  })
})
