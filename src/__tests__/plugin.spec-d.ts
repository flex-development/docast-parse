/**
 * @file Type Tests - plugin
 * @module docast-parse/tests/unit-d/plugin
 */

import type { Root } from '@flex-development/docast'
import type { EmptyArray } from '@flex-development/tutils'
import type * as unified from 'unified'
import type TestSubject from '../plugin'

describe('unit-d:plugin', () => {
  it('should equal unified.Plugin<EmptyArray, string, Root>', () => {
    expectTypeOf<typeof TestSubject>()
      .toEqualTypeOf<unified.Plugin<EmptyArray, string, Root>>()
  })
})
