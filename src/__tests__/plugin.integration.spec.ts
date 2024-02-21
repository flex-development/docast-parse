/**
 * @file Integration Tests - plugin
 * @module docast-parse/tests/integration/plugin
 */

import { constant } from '@flex-development/tutils'
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

  describe.each<'empty' | 'non-empty'>([
    'empty',
    'non-empty'
  ])('%s document', type => {
    let file: VFile
    let value: string

    beforeAll(async () => {
      value = type === 'empty' ? '' : '__fixtures__/fibonacci-sequence.ts'
      file = type === 'empty' ? new VFile(value) : await read(value)
    })

    it('should configure parser', () => {
      // Act
      const result = unified()
        .use(testSubject)
        .use(remarkDirective)
        .parse(file)

      // Expect
      expect(result).toMatchSnapshot()
    })
  })
})
