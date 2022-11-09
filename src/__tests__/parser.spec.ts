/**
 * @file Unit Tests - Parser
 * @module docast-parse/tests/parser/unit
 */

import snippet from '#tests/utils/snippet'
import { Kind, Type } from '@flex-development/docast'
import fs from 'node:fs'
import path from 'node:path'
import { VFile } from 'vfile'
import TestSubject from '../parser'

describe('unit:parser', () => {
  let comment: string
  let document: string
  let documentpath: string
  let subject: TestSubject

  beforeEach(() => {
    documentpath = path.resolve('__fixtures__/buddy.ts')
    document = fs.readFileSync(documentpath, 'utf8')
    subject = new TestSubject(document, new VFile(document))
    comment = snippet(document, 8, 36)
  })

  describe('#findBlockTags', () => {
    it('should find block tags in comment', () => {
      // Act
      // @ts-expect-error ts(2445)
      const result = subject.findBlockTags(comment)

      // Expect
      expect(result).to.be.an('array').of.length(8)
      expect(result[0]).to.have.property('children')
      expect(result[0]!.children).to.be.an('array').of.length(1)
      expect(result[0]!.tag).to.equal('@see')
      expect(result[0]!.value).to.equal('@see {@link psum}')
      expect(result[0]).to.have.property('position')
      expect(result[0]).to.have.property('type').equal(Type.BLOCK_TAG)
    })
  })

  describe('#findComments', () => {
    it('should find comments in #document', () => {
      // Act
      // @ts-expect-error ts(2445)
      const result = subject.findComments()

      // Expect
      expect(result).to.be.an('array').of.length(4)
      expect(result).each.to.have.a.property('type').that.equals(Type.COMMENT)
      expect(result[0]).to.have.property('children')
      expect(result[0]!.context).to.be.null
      expect(result[0]!.value).to.equal(snippet(document, 1, 5))
      expect(result[0]).to.have.property('position')
      expect(result[1]).to.have.property('children')
      expect(result[1]!.context).to.not.be.null
      expect(result[1]!.context!.identifier).to.equal('buddy')
      expect(result[1]!.context!.kind).to.equal(Kind.CONST)
      expect(result[1]!.context!.members).to.be.an('array').of.length(0)
      expect(result[1]!.context!.modifiers).to.be.an('array').of.length(0)
      expect(result[1]!.context!.parent).to.be.null
      expect(result[1]!.context).to.have.property('position')
      expect(result[1]!.value).to.equal(comment)
      expect(result[1]).to.have.property('position')
      expect(result[2]).to.have.property('children')
      expect(result[2]!.context).to.not.be.null
      expect(result[2]!.context!.identifier).to.equal('m')
      expect(result[2]!.context!.kind).to.equal(Kind.CONST)
      expect(result[2]!.context!.members).to.be.an('array').of.length(0)
      expect(result[2]!.context!.modifiers).to.be.an('array').of.length(0)
      expect(result[2]!.context!.parent).to.be.null
      expect(result[2]!.context).to.have.property('position')
      expect(result[2]!.value).to.equal(snippet(document, 38, 39))
      expect(result[2]).to.have.property('position')
      expect(result[3]).to.have.property('children')
      expect(result[3]!.context).to.not.be.null
      expect(result[3]!.context!.identifier).to.equal('if')
      expect(result[3]!.context!.kind).to.equal(Kind.UNKNOWN)
      expect(result[3]!.context!.members).to.be.an('array').of.length(0)
      expect(result[3]!.context!.modifiers).to.be.an('array').of.length(0)
      expect(result[3]!.context!.parent).to.be.null
      expect(result[3]!.context).to.have.property('position')
      expect(result[3]!.value).to.equal(snippet(document, 41, 42))
      expect(result[3]).to.have.property('position')
    })

    it('should return empty array if #document is empty', () => {
      // Arrange
      const subject = new TestSubject('', new VFile(''))

      // Act + Expect
      // @ts-expect-error ts(2445)
      expect(subject.findComments()).to.be.an('array').of.length(0)
    })
  })

  describe('#findImplicitDescription', () => {
    it('should find implicit description in comment', () => {
      // Arrange
      const value: string = `The divisors of positive integer \`n\` are said to be \`proper\` when considering\ndivisors other than \`n\` itself.\n\nLet \`s(n)\` be the sum of \`proper\` divisors of \`n\`. Call \`buddy\` two positive\nintegers such that the sum of the \`proper\` divisors of each number is one\nmore than the other number:\n\n\`[n, m]\` are \`buddy\` if \`s(m) = n + 1\` and \`s(n) = m + 1\`\n\nGiven two positive integers, \`start\` and \`limit\`, the function returns the\nfirst pair of \`buddy pairs\` such that \`start <= n <= limit\` and \`m > n\`.`

      // Act
      // @ts-expect-error ts(2445)
      const result = subject.findImplicitDescription(comment)

      // Expect
      expect(result).to.not.be.null
      expect(result).to.have.property('children')
      expect(result!.children).to.be.an('array').of.length(0)
      expect(result!.value).to.equal(value)
      expect(result).to.have.property('position')
      expect(result).to.have.property('type').equal(Type.IMPLICIT_DESCRIPTION)
    })

    it('should return null if implicit description is not found', () => {
      // Arrange
      const comment = document.split('\nimport')[0]!

      // Act + Expect
      // @ts-expect-error ts(2445)
      expect(subject.findImplicitDescription(comment)).to.be.null
    })
  })

  describe('#findInlineTags', () => {
    it('should find inline tags in node value', () => {
      // Act
      // @ts-expect-error ts(2445)
      const result = subject.findInlineTags('@see {@link psum}')

      // Expect
      expect(result).to.be.an('array').of.length(1)
      expect(result[0]).to.not.have.property('children')
      expect(result[0]!.tag).to.equal('@link')
      expect(result[0]!.value).to.equal('{@link psum}')
      expect(result[0]).to.have.property('position')
      expect(result[0]).to.have.property('type').equal(Type.INLINE_TAG)
    })
  })

  describe('#position', () => {
    it('should calculate node position', () => {
      // Act
      // @ts-expect-error ts(2445)
      const result = subject.position(comment)

      // Expect
      expect(result.end.column).to.equal(4)
      expect(result.end.line).to.equal(35)
      expect(result.indent).to.be.undefined
      expect(result.start.column).to.equal(1)
      expect(result.start.line).to.equal(8)
    })
  })

  describe('#uncomment', () => {
    it('should remove comment delimiters from raw node value', () => {
      // Arrange
      const raw: string = `@example\n *  buddy(1071625, 1103735) // [1081184, 1331967]`
      const expected: string = `@example\n buddy(1071625, 1103735) // [1081184, 1331967]`

      // Act + Expect
      // @ts-expect-error ts(2445)
      expect(subject.uncomment(raw)).to.equal(expected)
    })
  })
})
