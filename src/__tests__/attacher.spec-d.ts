/**
 * @file Type Tests - attacher
 * @module docast-parse/tests/attacher/unit-d
 */

import type { Options } from '#src/interfaces'
import type { Root } from '@flex-development/docast'
import type unified from 'unified'
import type testSubject from '../attacher'

describe('unit-d:attacher', () => {
  it('should be typeof unified.Plugin', () => {
    // Arrange
    type Plugin = unified.Plugin<[Options?], string, Root>

    // Expect
    expectTypeOf<typeof testSubject>().toEqualTypeOf<Plugin>()
  })

  it('should extract parameters [Options?]', () => {
    expectTypeOf<typeof testSubject>().parameters.toEqualTypeOf<[Options?]>()
  })
})
