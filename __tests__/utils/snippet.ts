/**
 * @file Test Utilities - snippet
 * @module tests/utils/snippet
 */

import type { VFile } from 'vfile'
import { location } from 'vfile-location'

/**
 * Returns a snippet from {@link document}.
 *
 * @param {VFile | string} document - Document to retrive snippet from
 * @param {number} l1 - Line to begin snippet
 * @param {number} l2 - Line to end snippet
 * @return {string} `document` snippet
 */
const snippet = (document: VFile | string, l1: number, l2: number): string => {
  const { toOffset } = location(document)

  return (typeof document === 'string' ? document : document.toString())
    .slice(toOffset({ column: 1, line: l1 }), toOffset({ column: 1, line: l2 }))
    .trim()
}

export default snippet
