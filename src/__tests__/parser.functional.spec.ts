/**
 * @file Functional Tests - Parser
 * @module docast/tests/parser/functional
 */

import fs from 'node:fs'
import path from 'node:path'
import { inspect } from 'unist-util-inspect'
import { VFile } from 'vfile'
import type { TestContext } from 'vitest'
import TestSubject from '../parser'

describe('functional:parser', () => {
  beforeEach((ctx: TestContext): void => {
    ctx.expect.addSnapshotSerializer({
      print: (val: unknown): string => inspect(val),
      test: (): boolean => true
    })
  })

  it('should create ast for abstract class declaration', () => {
    // Arrange
    const docpath: string = path.resolve('__fixtures__/person.ts')
    const document: string = fs.readFileSync(docpath, 'utf8')
    const subject = new TestSubject(document, new VFile(document))

    // Act + Expect
    expect(subject.parse()).toMatchSnapshot()
  })

  it('should create ast for async function declaration', () => {
    // Arrange
    const docpath: string = path.resolve('__fixtures__/dbl-linear.ts')
    const document: string = fs.readFileSync(docpath, 'utf8')
    const subject = new TestSubject(document, new VFile(document))

    // Act + Expect
    expect(subject.parse()).toMatchSnapshot()
  })

  it('should create ast for async function* declaration', () => {
    // Arrange
    const docpath: string = path.resolve('__fixtures__/fibonacci.ts')
    const document: string = fs.readFileSync(docpath, 'utf8')
    const subject = new TestSubject(document, new VFile(document))

    // Act + Expect
    expect(subject.parse()).toMatchSnapshot()
  })

  it('should create ast for class declaration', () => {
    // Arrange
    const docpath: string = path.resolve('__fixtures__/fibonacci-sequence.ts')
    const document: string = fs.readFileSync(docpath, 'utf8')
    const subject = new TestSubject(document, new VFile(document))

    // Act + Expect
    expect(subject.parse()).toMatchSnapshot()
  })

  it('should create ast for const enum declaration', () => {
    // Arrange
    const docpath: string = path.resolve('__fixtures__/log-level.ts')
    const document: string = fs.readFileSync(docpath, 'utf8')
    const subject = new TestSubject(document, new VFile(document))

    // Act + Expect
    expect(subject.parse()).toMatchSnapshot()
  })

  it('should create ast for default function declaration', () => {
    // Arrange
    const docpath: string = path.resolve('__fixtures__/sum-of-intervals.ts')
    const document: string = fs.readFileSync(docpath, 'utf8')
    const subject = new TestSubject(document, new VFile(document))

    // Act + Expect
    expect(subject.parse()).toMatchSnapshot()
  })

  it('should create ast for default variable declaration', () => {
    // Arrange
    const docpath: string = path.resolve('__fixtures__/mini-string-fuck.ts')
    const document: string = fs.readFileSync(docpath, 'utf8')
    const subject = new TestSubject(document, new VFile(document))

    // Act + Expect
    expect(subject.parse()).toMatchSnapshot()
  })

  it('should create ast for enum declaration', () => {
    // Arrange
    const docpath: string = path.resolve('__fixtures__/op.ts')
    const document: string = fs.readFileSync(docpath, 'utf8')
    const subject = new TestSubject(document, new VFile(document))

    // Act + Expect
    expect(subject.parse()).toMatchSnapshot()
  })

  it('should create ast for function declaration', () => {
    // Arrange
    const docpath: string = path.resolve('__fixtures__/calculate.ts')
    const document: string = fs.readFileSync(docpath, 'utf8')
    const subject = new TestSubject(document, new VFile(document))

    // Act + Expect
    expect(subject.parse()).toMatchSnapshot()
  })

  it('should create ast for function* declaration', () => {
    // Arrange
    const docpath: string = path.resolve('__fixtures__/alphabet.ts')
    const document: string = fs.readFileSync(docpath, 'utf8')
    const subject = new TestSubject(document, new VFile(document))

    // Act + Expect
    expect(subject.parse()).toMatchSnapshot()
  })

  it('should create ast for interface declaration', () => {
    // Arrange
    const docpath: string = path.resolve('__fixtures__/coordinate-pair.ts')
    const document: string = fs.readFileSync(docpath, 'utf8')
    const subject = new TestSubject(document, new VFile(document))

    // Act + Expect
    expect(subject.parse()).toMatchSnapshot()
  })

  it('should create ast for namespace declaration', () => {
    // Arrange
    const docpath: string = path.resolve('__fixtures__/string-utils.ts')
    const document: string = fs.readFileSync(docpath, 'utf8')
    const subject = new TestSubject(document, new VFile(document))

    // Act + Expect
    expect(subject.parse()).toMatchSnapshot()
  })

  it('should create ast for type declaration', () => {
    // Arrange
    const docpath: string = path.resolve('__fixtures__/coordinate.ts')
    const document: string = fs.readFileSync(docpath, 'utf8')
    const subject = new TestSubject(document, new VFile(document))

    // Act + Expect
    expect(subject.parse()).toMatchSnapshot()
  })

  it('should create ast for variable declaration', () => {
    // Arrange
    const docpath: string = path.resolve('__fixtures__/psum.ts')
    const document: string = fs.readFileSync(docpath, 'utf8')
    const subject = new TestSubject(document, new VFile(document))

    // Act + Expect
    expect(subject.parse()).toMatchSnapshot()
  })
})
