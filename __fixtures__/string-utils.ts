/**
 * @file Fixtures - StringUtils
 * @module fixtures/StringUtils
 */

/**
 * String utility types.
 */
namespace StringUtils {
  /**
   * Concatenates strings `String1` and `String2`.
   *
   * @template S1 - String to split
   * @template S2 - String delimiter
   * @template D - String delimiter
   */
  export type Concat<
    S1 extends number | string | symbol,
    S2 extends number | string | symbol,
    D extends string = ''
  > = `${S1 & string}${D}${S2 & string}`

  /**
   * Constructs a string array by splitting string `S` using delimiter `D`.
   *
   * @template S - String to split
   * @template D - String delimiter
   */
  export type Split<S extends string, D extends string> = string extends S
    ? string[]
    : S extends ''
    ? []
    : S extends `${infer T}${D}${infer U}`
    ? [T, ...Split<U, D>]
    : [S]
}

export type { StringUtils as default }
