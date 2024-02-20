/**
 * @file Type Tests - plugin
 * @module docast-parse/tests/unit-d/plugin
 */

import type { Root } from '@flex-development/docast'
import type { Options } from '@flex-development/docast-util-from-docs'
import type { Nilable } from '@flex-development/tutils'
import type * as unified from 'unified'
import type TestSubject from '../plugin'

describe('unit-d:plugin', () => {
  it('should match unified.Plugin<[Nilable<Options>?], string, Root>', () => {
    expectTypeOf<typeof TestSubject>()
      .toMatchTypeOf<unified.Plugin<[Nilable<Options>?], string, Root>>()
  })

  describe('parameters', () => {
    it('should be callable with [Nilable<Options>?]', () => {
      expectTypeOf<typeof TestSubject>()
        .parameters.toEqualTypeOf<[Nilable<Options>?]>()
    })
  })

  describe('returns', () => {
    it('should return void', () => {
      expectTypeOf<typeof TestSubject>().returns.toBeVoid()
    })
  })
})
