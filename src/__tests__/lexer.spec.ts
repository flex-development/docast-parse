/**
 * @file Unit Tests - Lexer
 * @module docast-parse/tests/lexer/unit
 */

import { LexerState, TokenKind } from '#src/enums'
import type { Token } from '#src/interfaces'
import type { Predicate } from '@flex-development/tutils'
import fs from 'node:fs'
import { VFile } from 'vfile'
import TestSubject from '../lexer'

describe('unit:lexer', () => {
  let document: string
  let file: VFile

  beforeEach(() => {
    document = fs.readFileSync('__fixtures__/psum.ts', 'utf8')
    file = new VFile(file)
  })

  describe('constructor', () => {
    it('should set state to DONE if source file does not have comments', () => {
      // Arrange
      const document = 'export default "foo"'
      const subject = new TestSubject(document, new VFile(document))

      // Act + Expect
      // @ts-expect-error ts(2445)
      expect(subject.state).to.equal(LexerState.DONE)
    })

    it('should set state to DONE if source file is empty', () => {
      // @ts-expect-error ts(2445)
      expect(new TestSubject('', new VFile()).state).to.equal(LexerState.DONE)
    })
  })

  describe('#done', () => {
    const max: string = 'token sequence length - 1'
    const position: string = 'token sequence position'

    it(`should return false if ${position} is less than ${max}`, () => {
      expect(new TestSubject(document, file).done).to.be.false
    })

    it(`should return true if ${position} is equal to ${max}`, () => {
      // Arrange
      const subject = new TestSubject(document, file)
      Object.assign(subject, { position: subject.tokens.length - 1 })

      // Act + Expect
      expect(subject.done).to.be.true
    })

    it(`should return true if ${position} is greater than ${max}`, () => {
      // Arrange
      const subject = new TestSubject(document, file)
      Object.assign(subject, { position: subject.tokens.length })

      // Act + Expect
      expect(subject.done).to.be.true
    })
  })

  describe('#offset', () => {
    it('should return current position in token sequence', () => {
      expect(new TestSubject(document, file).offset).to.equal(-1)
    })
  })

  describe('#peek', () => {
    let subject: TestSubject

    beforeEach(() => {
      subject = new TestSubject(document, file)
    })

    it('should return null if peeking past end of token sequence', () => {
      expect(subject.peek(subject.tokens.length + 1)).to.be.null
    })

    it('should return next token without changing position', () => {
      expect(subject.peek()).to.deep.equal(subject.peek())
    })

    it('should return next k-th token without changing position', () => {
      expect(subject.peek(3)).to.deep.equal(subject.peek(3))
    })
  })

  describe('#peekUntil', () => {
    let subject: TestSubject

    beforeEach(() => {
      subject = new TestSubject(document, file)
    })

    it('should return token sequence subset', () => {
      // Arrange
      const condition: Predicate<Token> = (token: Token) => {
        return token.kind === TokenKind.EOF
      }

      // Act + Expect
      expect(subject.peekUntil(condition)).to.deep.equal(subject.tokens)
    })

    it('should return token sequence subset from next k-th token', () => {
      // Arrange
      const condition: Predicate<Token> = (token: Token) => {
        return token.kind === TokenKind.TAG_BLOCK_END
      }

      // Act + Expect
      expect(subject.peekUntil(condition, 2)).to.be.of.length(2)
    })
  })

  describe('#read', () => {
    it('should return null if reading past end of token sequence', () => {
      // Arrange
      const subject = new TestSubject(document, file)

      // Act + Expect
      expect(subject.read(subject.tokens.length + 1)).to.be.null
    })

    it('should return next token', () => {
      // Arrange
      const subject = new TestSubject(document, file)

      // Act + Expect
      expect(subject.read()?.kind).to.equal(TokenKind.COMMENT_START)
      expect(subject.read()?.kind).to.equal(TokenKind.TAG_BLOCK_START)
      expect(subject.read()?.kind).to.equal(TokenKind.TAG_BLOCK_END)
    })

    it('should return next k-th token', () => {
      // Arrange
      const subject = new TestSubject(document, file)

      // Act + Expect
      expect(subject.read(6)?.kind).to.equal(TokenKind.COMMENT_END)
    })
  })

  describe('#tokens', () => {
    it('should return token sequence', () => {
      expect(new TestSubject(document, file).tokens).to.be.an('array')
    })
  })
})
