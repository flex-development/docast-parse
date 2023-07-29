/**
 * @file Unit Tests - Reader
 * @module docast-parse/tests/reader/unit
 */

import { set } from '@flex-development/tutils'
import fs from 'node:fs'
import TestSubject from '../reader'

describe('unit:reader', () => {
  let document: string

  beforeEach(() => {
    document = fs.readFileSync('__fixtures__/buddy.ts', 'utf8')
  })

  describe('#eof', () => {
    it('should return false if position is less than document length', () => {
      expect(new TestSubject(document).eof).to.be.false
    })

    it('should return true if document is empty', () => {
      expect(new TestSubject('').eof).to.be.true
    })

    it('should return true if position is equal to document length', () => {
      // Arrange
      const subject = new TestSubject(document)
      set(subject, 'position', document.length)

      // Act + Expect
      expect(subject.eof).to.be.true
    })

    it('should return true if position is greater than document length', () => {
      // Arrange
      const subject = new TestSubject(document)
      set(subject, 'position', document.length + 1)

      // Act + Expect
      expect(subject.eof).to.be.true
    })
  })

  describe('#offset', () => {
    it('should return current position in document', () => {
      expect(new TestSubject(document).offset).to.equal(-1)
    })
  })

  describe('#peek', () => {
    let subject: TestSubject

    beforeEach(() => {
      subject = new TestSubject(document)
    })

    it('should return empty string if peeking past end of document', () => {
      expect(subject.peek(document.length + 1)).to.be.empty
    })

    it('should return next character without changing position', () => {
      expect(subject.peek()).to.equal(subject.peek())
    })

    it('should return next k-th character without changing position', () => {
      expect(subject.peek(4)).to.equal(subject.peek(4))
    })
  })

  describe('#peekUntil', () => {
    it('should return document section from next k-th character', () => {
      expect(new TestSubject(document).peekUntil(1, 2)).to.equal('/**')
    })
  })

  describe('#read', () => {
    it('should return empty string if reading past end of document', () => {
      expect(new TestSubject(document).read(document.length + 1)).to.be.empty
    })

    it('should return next character', () => {
      // Arrange
      const subject = new TestSubject(document)

      // Act + Expect
      expect(subject.read()).to.equal('/')
      expect(subject.read()).to.equal('*')
      expect(subject.read()).to.equal('*')
    })

    it('should return next k-th character', () => {
      expect(new TestSubject(document).read(4)).to.equal('\n')
    })
  })

  describe('#toOffset', () => {
    it('should return document index', () => {
      // Arrange
      const subject = new TestSubject(document)

      // Act + Expect
      expect(subject.toOffset({ column: 1, line: 1 })).to.equal(0)
    })
  })

  describe('#toPoint', () => {
    it('should return line and column based point', () => {
      expect(new TestSubject(document).toPoint(0)).to.deep.equal({
        column: 1,
        line: 1,
        offset: 0
      })
    })
  })
})
