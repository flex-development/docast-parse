/**
 * @file Internals - Constants
 * @module docast/internal/constants
 */

/**
 * [`BlockTag`][1] node value regex pattern.
 *
 * **Note**: Finds block tags in a raw comment.
 *
 * [1]: ../nodes/tag-block.ts
 *
 * @const {RegExp} BLOCK_TAG_REGEX
 */
export const BLOCK_TAG_REGEX: RegExp =
  /(?<=(?:^[\t ]+\* )|(?:^\/\*\* +))(?<tag>@\w+(?=\n?))(?: +|\n)(?<text>.*?)(?=\n?[\t ]+\*(?: @\w+|(?: ?\n)|\/))/gms

/**
 * [`Comment`][1] node value regex pattern.
 *
 * [1]: ../nodes/comment.ts
 *
 * @const {RegExp} COMMENT_REGEX
 */
export const COMMENT_REGEX: RegExp = /\/\*\*.*?\*\//gms

/**
 * [`ImplicitDescription`][1] node value regex pattern.
 *
 * [1]: ../nodes/implicit-description.ts
 *
 * @const {RegExp} IMPLICIT_DESCRIPTION_REGEX
 */
export const IMPLICIT_DESCRIPTION_REGEX: RegExp =
  /(?<=\/\*\*(?:\n[\t ]+\*)? +)(?<raw>(?:[^@].+)+?)(?=(?:\n(?:[\t ]+\*[\n ]+)+@\w+)|\n? +\*\/)/gm

/**
 * [`InlineTag`][1] node value regex pattern.
 *
 * **Note**: Finds inline tags in raw block tags and raw implicit descriptions.
 *
 * [1]: ../nodes/tag-inline.ts
 *
 * @const {RegExp} INLINE_TAG_REGEX
 */
export const INLINE_TAG_REGEX: RegExp = /{(?<tag>@\w+) +(?<text>.+)}/g
