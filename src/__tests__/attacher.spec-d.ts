/**
 * @file Type Tests - attacher
 * @module docast-parse/tests/attacher/unit-d
 */

import type { Options } from '#src/interfaces'
import type { Root } from '@flex-development/docast'
import type unified from 'unified'
import type testSubject from '../attacher'

describe('unit-d:attacher', () => {
  it('should be callable with [Options?]', () => {
    // Act
    type Params = [options?: Options | undefined]

    expectTypeOf<typeof testSubject>().parameters.toEqualTypeOf<Params>()
  })

  it('should be typeof unified.Plugin', () => {
    // Arrange
    type Plugin = unified.Plugin<[options?: Options | undefined], string, Root>

    // Expect
    expectTypeOf<typeof testSubject>().toEqualTypeOf<Plugin>()
  })

  it('should return void', () => {
    expectTypeOf<typeof testSubject>().returns.toBeVoid()
  })
})
