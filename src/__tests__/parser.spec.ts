/**
 * @file Unit Tests - Parser
 * @module docast-parse/tests/parser/unit
 */

import { LexerState, TokenKind } from '#src/enums'
import type { Token } from '#src/interfaces'
import type { Point } from '@flex-development/docast'
import fs from 'node:fs'
import path from 'node:path'
import { VFile } from 'vfile'
import TestSubject from '../parser'

describe('unit:parser', () => {
  let document: string
  let subject: TestSubject

  beforeEach(() => {
    document = fs.readFileSync(path.resolve('__fixtures__/buddy.ts'), 'utf8')
    subject = new TestSubject(document, new VFile(document))
  })

  describe('#parseComment', () => {
    let subject: TestSubject

    beforeEach(() => {
      subject = new TestSubject('', new VFile(''))
    })

    it('should throw if token is not of kind COMMENT_START', () => {
      // Arrange
      let error: SyntaxError | undefined

      // Act
      try {
        // @ts-expect-error ts(2445)
        subject.parseComment({} as Token, 0)
      } catch (e: unknown) {
        error = e as typeof error
      }

      // Expect
      expect(error).to.not.be.undefined
      expect(error).toBeInstanceOf(SyntaxError)
      expect(error?.message).to.equal('expected token of kind COMMENT_START')
    })

    it('should throw if token match is not of kind COMMENT_END', () => {
      // Arrange
      const kind: TokenKind = TokenKind.COMMENT_START
      const point: Point = { column: 1, line: 1, offset: 0 }
      const state: LexerState = LexerState.COMMENT
      let error: SyntaxError | undefined

      // Act
      try {
        // @ts-expect-error ts(2445)
        subject.parseComment({ kind, point, state, value: '/**' }, 0)
      } catch (e: unknown) {
        error = e as typeof error
      }

      // Expect
      expect(error).to.not.be.undefined
      expect(error).toBeInstanceOf(SyntaxError)
      expect(error?.message).to.equal('expected token of kind COMMENT_END')
    })
  })

  describe('#parseContext', () => {
    let subject: TestSubject

    beforeEach(() => {
      subject = new TestSubject('', new VFile(''))
    })

    it('should throw if token match is not of kind CONTEXT_END', () => {
      // Arrange
      const kind: TokenKind = TokenKind.CONTEXT_START
      const point: Point = { column: 1, line: 36, offset: 1005 }
      const state: LexerState = LexerState.READY
      let error: SyntaxError | undefined

      // Act
      try {
        // @ts-expect-error ts(2445)
        subject.parseContext({ kind, point, state, value: '' }, 0)
      } catch (e: unknown) {
        error = e as typeof error
      }

      // Expect
      expect(error).to.not.be.undefined
      expect(error).toBeInstanceOf(SyntaxError)
      expect(error?.message).to.equal('expected token of kind CONTEXT_END')
    })
  })

  describe('#parseImplicitDescription', () => {
    let subject: TestSubject

    const kinds: (keyof typeof TokenKind)[] = [
      'IMPLICIT_DESCRIPTION_START',
      'IMPLICIT_DESCRIPTION_END'
    ]

    beforeEach(() => {
      subject = new TestSubject('', new VFile(''))
    })

    it(`should throw if token is not of kind ${kinds[0]}`, () => {
      // Arrange
      const kind: keyof typeof TokenKind = kinds[0]!
      let error: SyntaxError | undefined

      // Act
      try {
        // @ts-expect-error ts(2445)
        subject.parseImplicitDescription({} as Token, 0)
      } catch (e: unknown) {
        error = e as typeof error
      }

      // Expect
      expect(error).to.not.be.undefined
      expect(error).toBeInstanceOf(SyntaxError)
      expect(error?.message).to.equal(`expected token of kind ${kind}`)
    })

    it(`should throw if token match is not of kind ${kinds[1]}`, () => {
      // Arrange
      const kind_expected: keyof typeof TokenKind = kinds[1]!
      const kind: TokenKind = TokenKind.IMPLICIT_DESCRIPTION_START
      const point: Point = { column: 4, line: 9, offset: 95 }
      const state: LexerState = LexerState.IMPLICIT_DESCRIPTION
      let error: SyntaxError | undefined

      // Act
      try {
        // @ts-expect-error ts(2445)
        subject.parseImplicitDescription({ kind, point, state, value: 'T' }, 0)
      } catch (e: unknown) {
        error = e as typeof error
      }

      // Expect
      expect(error).to.not.be.undefined
      expect(error).toBeInstanceOf(SyntaxError)
      expect(error?.message).to.equal(`expected token of kind ${kind_expected}`)
    })
  })

  describe('#parseTagBlock', () => {
    let subject: TestSubject

    beforeEach(() => {
      subject = new TestSubject('', new VFile(''))
    })

    it('should throw if token is not of kind TAG_BLOCK_START', () => {
      // Arrange
      let error: SyntaxError | undefined

      // Act
      try {
        // @ts-expect-error ts(2445)
        subject.parseTagBlock({} as Token, 0)
      } catch (e: unknown) {
        error = e as typeof error
      }

      // Expect
      expect(error).to.not.be.undefined
      expect(error).toBeInstanceOf(SyntaxError)
      expect(error?.message).to.equal('expected token of kind TAG_BLOCK_START')
    })

    it('should throw if token match is not of kind TAG_BLOCK_END', () => {
      // Arrange
      const kind: TokenKind = TokenKind.TAG_BLOCK_START
      const point: Point = { column: 4, line: 2, offset: 7 }
      const state: LexerState = LexerState.COMMENT
      let error: SyntaxError | undefined

      // Act
      try {
        // @ts-expect-error ts(2445)
        subject.parseTagBlock({ kind, point, state, value: '@' }, 0)
      } catch (e: unknown) {
        error = e as typeof error
      }

      // Expect
      expect(error).to.not.be.undefined
      expect(error).toBeInstanceOf(SyntaxError)
      expect(error?.message).to.equal('expected token of kind TAG_BLOCK_END')
    })
  })

  describe('#parseTagInline', () => {
    let subject: TestSubject

    beforeEach(() => {
      subject = new TestSubject('', new VFile(''))
    })

    it('should throw if token is not of kind TAG_INLINE_START', () => {
      // Arrange
      let error: SyntaxError | undefined

      // Act
      try {
        // @ts-expect-error ts(2445)
        subject.parseTagInline({} as Token, 0)
      } catch (e: unknown) {
        error = e as typeof error
      }

      // Expect
      expect(error).to.not.be.undefined
      expect(error).toBeInstanceOf(SyntaxError)
      expect(error?.message).to.equal('expected token of kind TAG_INLINE_START')
    })

    it('should throw if token match is not of kind TAG_INLINE_END', () => {
      // Arrange
      const kind: TokenKind = TokenKind.TAG_INLINE_START
      const point: Point = { column: 9, line: 21, offset: 631 }
      const state: LexerState = LexerState.COMMENT
      const value: string = '{@link psum}'
      let error: SyntaxError | undefined

      // Act
      try {
        // @ts-expect-error ts(2445)
        subject.parseTagInline({ kind, point, state, value }, 0)
      } catch (e: unknown) {
        error = e as typeof error
      }

      // Expect
      expect(error).to.not.be.undefined
      expect(error).toBeInstanceOf(SyntaxError)
      expect(error?.message).to.equal('expected token of kind TAG_INLINE_END')
    })
  })

  describe('#uncomment', () => {
    it('should remove comment delimiters from node value', () => {
      // Arrange
      const raw: string = `@example\n *  buddy(1071625, 1103735) // [1081184, 1331967]`
      const expected: string = `@example\n buddy(1071625, 1103735) // [1081184, 1331967]`

      // Act + Expect
      // @ts-expect-error ts(2445)
      expect(subject.uncomment(raw)).to.equal(expected)
    })
  })
})
