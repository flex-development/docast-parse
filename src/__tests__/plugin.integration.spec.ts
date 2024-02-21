/**
 * @file Integration Tests - plugin
 * @module docast-parse/tests/integration/plugin
 */

import type { Options } from '@flex-development/docast-util-from-docs'
import { constant, type Nilable } from '@flex-development/tutils'
import remarkDirective from 'remark-directive'
import { read } from 'to-vfile'
import { unified } from 'unified'
import { inspectNoColor } from 'unist-util-inspect'
import { VFile } from 'vfile'
import type { TestContext } from 'vitest'
import testSubject from '../plugin'

describe('integration:plugin', () => {
  beforeEach((ctx: TestContext): void => {
    ctx.expect.addSnapshotSerializer({
      print: (val: unknown): string => inspectNoColor(val),
      test: constant(true)
    })
  })

  describe.each<['empty' | 'non-empty', Nilable<Options>?]>([
    ['empty'],
    ['non-empty', { transforms: [vi.fn()] }]
  ])('%s document', (type, options) => {
    let file: VFile
    let value: string

    beforeAll(async () => {
      value = type === 'empty' ? '' : '__fixtures__/fibonacci-sequence.ts'
      file = type === 'empty' ? new VFile(value) : await read(value)
    })

    it('should configure parser', () => {
      // Act
      const result = unified()
        .use(testSubject, options)
        .use(remarkDirective)
        .parse(file)

      // Expect
      expect(result).toMatchSnapshot()
    })
  })
})
