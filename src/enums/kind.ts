/**
 * @file Enums - Kind
 * @module docast/enums/Kind
 */

/**
 * Declaration kinds.
 *
 * @enum {Lowercase<string> | -1}
 */
enum Kind {
  CLASS = 'class',
  CONST = 'const',
  CONSTRUCTOR = 'constructor',
  CONST_ENUM = 'const enum',
  DEFAULT = 'default',
  ENUM = 'enum',
  ENUM_MEMBER = 'enum-member',
  FUNCTION = 'function',
  GENERATOR = 'function*',
  GET = 'get',
  INTERFACE = 'interface',
  LET = 'let',
  METHOD_DECLARATION = 'method-declaration',
  METHOD_SIGNATURE = 'method-signature',
  MODULE_DECLARATION = 'module-declaration',
  NAMESPACE = 'namespace',
  PROPERTY_DECLARATION = 'property-declaration',
  PROPERTY_SIGNATURE = 'property-signature',
  SET = 'set',
  TYPE = 'type',
  UNKNOWN = -1,
  VAR = 'var'
}

export default Kind