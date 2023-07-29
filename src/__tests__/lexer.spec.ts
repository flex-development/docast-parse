/**
 * @file Unit Tests - Lexer
 * @module docast-parse/tests/lexer/unit
 */

import { LexerState, TokenKind } from '#src/enums'
import type { Token } from '#src/interfaces'
import { set, type Predicate } from '@flex-development/tutils'
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

      // Act
      const subject = new TestSubject(document, new VFile(document))

      // Expect
      expect(subject).to.have.property('state', LexerState.DONE)
    })

    it('should set state to DONE if source file is empty', () => {
      // Act
      const subject = new TestSubject('', new VFile())

      // Expect
      expect(subject).to.have.property('state', LexerState.DONE)
    })
  })

  describe('#done', () => {
    const max: string = 'token sequence length - 1'
    const position: string = 'token sequence position'

    it(`should return false if ${position} is less than ${max}`, () => {
      expect(new TestSubject(document, file)).to.have.property('done', false)
    })

    it(`should return true if ${position} is equal to ${max}`, () => {
      // Arrange
      const subject = new TestSubject(document, file)
      set(subject, 'position', subject.tokens.length - 1)

      // Act + Expect
      expect(subject).to.have.property('done', true)
    })

    it(`should return true if ${position} is greater than ${max}`, () => {
      // Arrange
      const subject = new TestSubject(document, file)
      set(subject, 'position', subject.tokens.length)

      // Act + Expect
      expect(subject).to.have.property('done', true)
    })
  })

  describe('#offset', () => {
    it('should return current position in token sequence', () => {
      expect(new TestSubject(document, file)).to.have.property('offset', -1)
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
      expect(subject.peek()).to.eql(subject.peek())
    })

    it('should return next k-th token without changing position', () => {
      expect(subject.peek(3)).to.eql(subject.peek(3))
    })
  })

  describe('#peekUntil', () => {
    let subject: TestSubject

    beforeEach(() => {
      subject = new TestSubject(document, file)
    })

    it('should return token sequence subset', () => {
      // Arrange
      const condition: Predicate<Token[]> = (token: Token) => {
        return token.kind === TokenKind.EOF
      }

      // Act + Expect
      expect(subject.peekUntil(condition)).to.eql(subject.tokens)
    })

    it('should return token sequence subset from next k-th token', () => {
      // Arrange
      const condition: Predicate<Token[]> = (token: Token) => {
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
      expect(new TestSubject(document, file))
        .to.have.property('tokens')
        .be.an('array')
    })
  })
})
