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
 * @internal
 *
 * @const {RegExp} BLOCK_TAG_REGEX
 */
export const BLOCK_TAG_REGEX: RegExp =
  /(?<=(?:^ +\* )|(?:^\/\*\* +))(?<tag>@\w+(?=\n?))(?: +|\n)(?<text>.*?)(?=\n? +\*(?: @\w+|(?: ?\n)|\/))/gms

/**
 * [`Comment`][1] node value regex pattern.
 *
 * [1]: ../nodes/comment.ts
 *
 * @internal
 *
 * @const {RegExp} COMMENT_REGEX
 */
export const COMMENT_REGEX: RegExp = /\/\*\*.*?\*\//gms

/**
 * Regex to extract **top level** comments with or without context.
 *
 * @internal
 *
 * @const {RegExp} COMMENT_WITH_CONTEXT_REGEX
 */
export const COMMENT_WITH_CONTEXT_REGEX: RegExp =
  /(?<! +)(?<comment>\/\*\*.*?\*\/)(?:(?=\n\n)|\n(?<code>(?:@[\w$]+(?:\(.*?\))?\n)?(?:\/\/ .+?\n)?(?:(?<modifiers>(?:(?:export )?(?:declare )?(?:default )? ?(?:abstract|async|declare|default)|export)|(?:(?:private|protected|public)?(?: abstract)?(?: ?override)?(?: ?readonly)?(?: ?static)?))\s+)?(?:(?<kind>class|function\*?|(?:const +)?enum|const(?!ructor)|get|interface|let|module|namespace|set|type|var)\s+)?(?<identifier>\[.+?]|#?\*?[\w$]+|["'].+?["'])?(?:.+(?=\n\n\/\*\*)|(?:.+(?=\n\n\/\/))|(?:.+(?=\n\n\b))|(?:.+(?=\n?$)))))/gs

/**
 * [`ImplicitDescription`][1] node value regex pattern.
 *
 * [1]: ../nodes/implicit-description.ts
 *
 * @internal
 *
 * @const {RegExp} IMPLICIT_DESCRIPTION_REGEX
 */
export const IMPLICIT_DESCRIPTION_REGEX: RegExp =
  /(?<=\/\*\*(?:\n +\*)? +)(?<raw>(?:[^@].+)+?)(?=(?:\n(?: +\*[\n ]+)+@\w+)|\n? +\*\/)/gm

/**
 * Regex to check if a declaration is an inner class.
 *
 * @internal
 *
 * @const {RegExp} INNER_CLASS_REGEX
 */
export const INNER_CLASS_REGEX: RegExp =
  /^(?:(?:private|protected|public)?(?: abstract)?(?: ?override)?(?: ?readonly)?(?: ?static)? )?\s*#?[\w$]+\s+=\s+class/

/**
 * [`InlineTag`][1] node value regex pattern.
 *
 * **Note**: Finds inline tags in raw block tags and raw implicit descriptions.
 *
 * [1]: ../nodes/tag-inline.ts
 *
 * @internal
 *
 * @const {RegExp} INLINE_TAG_REGEX
 */
export const INLINE_TAG_REGEX: RegExp = /{(?<tag>@\w+) +(?<text>.+)}/g

/**
 * Regex to check if a declaration is a enum member, property declaration, or
 * property signature.
 *
 * @internal
 *
 * @const {RegExp} MEMBER_OR_PROPERTY_REGEX
 */
export const MEMBER_OR_PROPERTY_REGEX: RegExp =
  /^(?:(?:private|protected|public)?(?: abstract)?(?: ?override)?(?: ?readonly)?(?: ?static)? )?\s*(?:\[.+?]|#?\*?[\w$]+|["'].+?["'])(?:(?:\?:)|:|\s+=)?/s

/**
 * Regex to check if a declaration is a method declaration or signature.
 *
 * @internal
 *
 * @const {RegExp} METHOD_REGEX
 */
export const METHOD_REGEX: RegExp =
  /^(?:(?:private|protected|public)?(?: abstract)?(?: ?override)?(?: ?readonly)?(?: ?static)? )?\s*(?:\[.+?]|(?!constructor)#?\*?[\w$]+)\??\(.*?\)(?:.+{.*})?/s
