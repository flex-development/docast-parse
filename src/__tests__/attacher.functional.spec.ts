/**
 * @file Functional Tests - attacher
 * @module docast-parse/tests/attacher/functional
 */

import type { Options } from '#src/interfaces'
import type { Root } from '@flex-development/docast'
import fs from 'node:fs'
import path from 'node:path'
import { unified, type Processor } from 'unified'
import { inspectNoColor } from 'unist-util-inspect'
import type { TestContext } from 'vitest'
import testSubject from '../attacher'

describe('functional:attacher', () => {
  let processor: Processor

  beforeEach((ctx: TestContext): void => {
    processor = unified()

    ctx.expect.addSnapshotSerializer({
      print: (val: unknown): string => inspectNoColor(val),
      test: (): boolean => true
    })
  })

  it('should create ast for abstract class declaration', () => {
    // Arrange
    const filepath: string = path.resolve('__fixtures__/person.ts')
    const file: string = fs.readFileSync(filepath, 'utf8')
    processor.use<[Options?], string, Root>(testSubject)

    // Act + Expect
    expect(processor.parse(file)).toMatchSnapshot()
  })

  it('should create ast for async function declaration', () => {
    // Arrange
    const filepath: string = path.resolve('__fixtures__/dbl-linear.ts')
    const file: string = fs.readFileSync(filepath, 'utf8')
    processor.use<[Options?], string, Root>(testSubject)

    // Act + Expect
    expect(processor.parse(file)).toMatchSnapshot()
  })

  it('should create ast for async function* declaration', () => {
    // Arrange
    const filepath: string = path.resolve('__fixtures__/fibonacci.ts')
    const file: string = fs.readFileSync(filepath, 'utf8')
    processor.use<[Options?], string, Root>(testSubject)

    // Act + Expect
    expect(processor.parse(file)).toMatchSnapshot()
  })

  it('should create ast for class declaration', () => {
    // Arrange
    const filepath: string = path.resolve('__fixtures__/fibonacci-sequence.ts')
    const file: string = fs.readFileSync(filepath, 'utf8')
    processor.use<[Options?], string, Root>(testSubject)

    // Act + Expect
    expect(processor.parse(file)).toMatchSnapshot()
  })

  it('should create ast for const enum declaration', () => {
    // Arrange
    const filepath: string = path.resolve('__fixtures__/log-level.ts')
    const file: string = fs.readFileSync(filepath, 'utf8')
    processor.use<[Options?], string, Root>(testSubject)

    // Act + Expect
    expect(processor.parse(file)).toMatchSnapshot()
  })

  it('should create ast for default function declaration', () => {
    // Arrange
    const filepath: string = path.resolve('__fixtures__/sum-of-intervals.ts')
    const file: string = fs.readFileSync(filepath, 'utf8')
    processor.use<[Options?], string, Root>(testSubject)

    // Act + Expect
    expect(processor.parse(file)).toMatchSnapshot()
  })

  it('should create ast for default variable declaration', () => {
    // Arrange
    const filepath: string = path.resolve('__fixtures__/mini-string-fuck.ts')
    const file: string = fs.readFileSync(filepath, 'utf8')
    processor.use<[Options?], string, Root>(testSubject)

    // Act + Expect
    expect(processor.parse(file)).toMatchSnapshot()
  })

  it('should create ast for enum declaration', () => {
    // Arrange
    const filepath: string = path.resolve('__fixtures__/op.ts')
    const file: string = fs.readFileSync(filepath, 'utf8')
    processor.use<[Options?], string, Root>(testSubject)

    // Act + Expect
    expect(processor.parse(file)).toMatchSnapshot()
  })

  it('should create ast for function declaration', () => {
    // Arrange
    const filepath: string = path.resolve('__fixtures__/calculate.ts')
    const file: string = fs.readFileSync(filepath, 'utf8')
    processor.use<[Options?], string, Root>(testSubject)

    // Act + Expect
    expect(processor.parse(file)).toMatchSnapshot()
  })

  it('should create ast for function* declaration', () => {
    // Arrange
    const filepath: string = path.resolve('__fixtures__/alphabet.ts')
    const file: string = fs.readFileSync(filepath, 'utf8')
    processor.use<[Options?], string, Root>(testSubject)

    // Act + Expect
    expect(processor.parse(file)).toMatchSnapshot()
  })

  it('should create ast for interface declaration', () => {
    // Arrange
    const filepath: string = path.resolve('__fixtures__/coordinate-pair.ts')
    const file: string = fs.readFileSync(filepath, 'utf8')
    processor.use<[Options?], string, Root>(testSubject)

    // Act + Expect
    expect(processor.parse(file)).toMatchSnapshot()
  })

  it('should create ast for module declaration', () => {
    // Arrange
    const filepath: string = path.resolve('typings/fast-clean/index.d.ts')
    const file: string = fs.readFileSync(filepath, 'utf8')
    processor.use<[Options?], string, Root>(testSubject)

    // Act + Expect
    expect(processor.parse(file)).toMatchSnapshot()
  })

  it('should create ast for namespace declaration', () => {
    // Arrange
    const filepath: string = path.resolve('__fixtures__/string-utils.ts')
    const file: string = fs.readFileSync(filepath, 'utf8')
    processor.use<[Options?], string, Root>(testSubject)

    // Act + Expect
    expect(processor.parse(file)).toMatchSnapshot()
  })

  it('should create ast for type declaration', () => {
    // Arrange
    const filepath: string = path.resolve('__fixtures__/coordinate.ts')
    const file: string = fs.readFileSync(filepath, 'utf8')
    processor.use<[Options?], string, Root>(testSubject)

    // Act + Expect
    expect(processor.parse(file)).toMatchSnapshot()
  })
})
