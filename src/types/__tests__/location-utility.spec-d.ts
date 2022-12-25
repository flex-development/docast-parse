/**
 * @file Unit Tests - LocationUtility
 * @module docast-parse/types/tests/unit-d/LocationUtility
 */

import type { Point } from '@flex-development/docast'
import type unist from 'unist'
import type TestSubject from '../location-utility'

describe('unit-d:types/LocationUtility', () => {
  it('should match [toPoint(offset: number): Point]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('toPoint')
      .toEqualTypeOf<(offset: number) => Point>()
  })

  it('should match [toOffset(point: unist.Point): number]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('toOffset')
      .toEqualTypeOf<(point: unist.Point) => number>()
  })
})
