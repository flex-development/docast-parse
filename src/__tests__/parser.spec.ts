/**
 * @file Unit Tests - Parser
 * @module docast/tests/parser/unit
 */

import { Type } from '#src/enums'
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
    comment = `/**\n * The divisors of positive integer \`n\` are said to be \`proper\` when considering\n * divisors other than \`n\` itself.\n *\n * Let \`s(n)\` be the sum of \`proper\` divisors of \`n\`. Call \`buddy\` two positive\n * integers such that the sum of the \`proper\` divisors of each number is one\n * more than the other number:\n *\n * \`[n, m]\` are \`buddy\` if \`s(m) = n + 1\` and \`s(n) = m + 1\`\n *\n * Given two positive integers, \`start\` and \`limit\`, the function returns the\n * first pair of \`buddy pairs\` such that \`start <= n <= limit\` and \`m > n\`.\n *\n * @see {@link psum}\n *\n * @example\n *  buddy(2382, 3679) // []\n * @example\n *  buddy(10, 50) // [48, 75]\n * @example\n *  buddy(48, 50) // [48, 75]\n * @example\n *  buddy(1071625, 1103735) // [1081184, 1331967]\n *\n * @param {number} start - Lower bound (inclusive)\n * @param {number} limit - Upper bound (inclusive)\n * @return {[] | [number, number]} First pair of \`buddy pairs\`\n */`
    documentpath = path.resolve('__fixtures__/buddy.ts')
    document = fs.readFileSync(documentpath, 'utf8')
    subject = new TestSubject(document, new VFile(document))
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
      expect(result[0]).to.have.property('data')
      expect(result[0]!.data.tag).to.equal('@see')
      expect(result[0]!.data.text).to.equal('{@link psum}')
      expect(result[0]!.data.value).to.equal('@see {@link psum}')
      expect(result[0]).to.have.property('position')
      expect(result[0]!.position.end.column).to.equal(21)
      expect(result[0]!.position.end.line).to.equal(21)
      expect(result[0]!.position.start.column).to.equal(4)
      expect(result[0]!.position.start.line).to.equal(21)
      expect(result[0]).to.have.property('type').equal(Type.BLOCK_TAG)
    })
  })

  describe('#findComments', () => {
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
      expect(result).to.have.property('data')
      expect(result!.data.value).to.equal(value)
      expect(result).to.have.property('position')
      expect(result!.position.end.column).to.equal(76)
      expect(result!.position.end.line).to.equal(19)
      expect(result!.position.start.column).to.equal(4)
      expect(result!.position.start.line).to.equal(9)
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
      expect(result[0]).to.have.property('data')
      expect(result[0]!.data.tag).to.equal('@link')
      expect(result[0]!.data.text).to.equal('psum')
      expect(result[0]!.data.value).to.equal('{@link psum}')
      expect(result[0]).to.have.property('position')
      expect(result[0]!.position.end.column).to.equal(21)
      expect(result[0]!.position.end.line).to.equal(21)
      expect(result[0]!.position.start.column).to.equal(9)
      expect(result[0]!.position.start.line).to.equal(21)
      expect(result[0]).to.have.property('type').equal(Type.INLINE_TAG)
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
