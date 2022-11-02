/**
 * @file Fixtures - Person
 * @module fixtures/Person
 */

/**
 * Object representing a person.
 *
 * @abstract
 */
abstract class Person {
  /**
   * Creates string representations of `Person` objects.
   *
   * @private
   * @static
   * @class
   */
  static #Stringifier = class {}

  /**
   * @public
   * @instance
   * @member {string} first_name - First name
   */
  public first_name: string

  /**
   * @public
   * @instance
   * @member {string} last_name - Last name
   */
  public last_name: string

  /**
   * Creates a new person.
   *
   * @param {string} first_name - First name
   * @param {string} last_name - Last name
   */
  constructor(first_name: string, last_name: string) {
    this.first_name = first_name
    this.last_name = last_name
  }

  /**
   * Returns a string representation of the current person.
   *
   * @public
   * @instance
   * @abstract
   *
   * @return {string} String representation of `this`
   */
  public abstract toString(): string
}

export default Person
