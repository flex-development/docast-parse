/**
 * [`fast-clean`][1] module declaration.
 *
 * [1]: https://github.com/Youssef93/fast-clean
 */
declare module 'fast-clean' {
  import type { ObjectPlain } from '@flex-development/tutils'

  /**
   * Object cleaning options.
   */
  export interface ICleanerOptions {
    /**
     * Remove empty arrays.
     *
     * @default true
     */
    emptyArraysCleaner?: boolean

    /**
     * Remove empty objects.
     *
     * @default true
     */
    emptyObjectsCleaner?: boolean

    /**
     * Remove empty strings.
     *
     * @default true
     */
    emptyStringsCleaner?: boolean

    /**
     * Remove `NaN`.
     *
     * @default true
     */
    nanCleaner?: boolean

    /**
     * Remove `null` values.
     *
     * @default false
     */
    nullCleaner?: boolean
  }

  /**
   * Removes empty values, `NaN`, `null`, and `undefined` from `object`.
   *
   * @template T - Object type
   * @template R - Return type
   *
   * @param {T} object - Object to remove values from
   * @param {import('fast-clean').ICleanerOptions} options - Cleaning options
   * @param {boolean} [options.emptyArraysCleaner=true] - Remove empty arrays
   * @param {boolean} [options.emptyObjectsCleaner=true] - Remove empty objects
   * @param {boolean} [options.emptyStringsCleaner=true] - Remove empty strings
   * @param {boolean} [options.nanCleaner=true] - Remove `NaN`
   * @param {boolean} [options.nullCleaner=false] - Remove `null`
   * @return {R} Sanitized `object`
   */
  export function clean<T extends ObjectPlain = infer T, R = any>(
    object: T,
    options?: ICleanerOptions
  ): R
}
