/**
 * @file Type Definitions - Predicate
 * @module docast-parse/types/Predicate
 */

/**
 * Function that is called once per each element in an array until an array item
 * is found where the predicate function returns `true`.
 *
 * @template T - Array item type
 *
 * @param {T} item - Current array item
 * @param {number} index - Index of `item` in `arr`
 * @param {T[]} arr - Original array
 * @return {boolean} `true` when condition is met, `false` otherwise
 */
type Predicate<T = unknown> = (item: T, index: number, arr: T[]) => boolean

export type { Predicate as default }
