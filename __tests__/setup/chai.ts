/**
 * @file Test Setup - chai
 * @module tests/setup/chai
 * @see https://chaijs.com
 */

import { JestExtend as extend } from '@vitest/expect'
import chaiQuantifiers from 'chai-quantifiers'
import chaiString from 'chai-string'
import { chai } from 'vitest'

/**
 * initialize chai plugins.
 *
 * @see https://github.com/funny-bytes/chai-quantifiers
 * @see https://github.com/onechiporenko/chai-string
 */
extend(chai, chai.util)
chai.use(chaiQuantifiers)
chai.use(chaiString)
