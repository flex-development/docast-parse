/**
 * @file ESLint Configuration - Root
 * @module config/eslint
 * @see https://eslint.org/docs/user-guide/configuring
 */

/**
 * @type {import('eslint').Linter.Config}
 * @const config - ESLint configuration object
 */
const config = {
  root: true,
  extends: ['./.eslintrc.base.cjs'],
  overrides: [
    ...require('./.eslintrc.base.cjs').overrides,
    {
      files: ['./__fixtures__/calculate.ts'],
      rules: {
        'unicorn/no-unreadable-array-destructuring': 0
      }
    },
    {
      files: ['__fixtures__/dbl-linear.ts', '__fixtures__/fibonacci.ts'],
      rules: {
        '@typescript-eslint/require-await': 0
      }
    },
    {
      files: ['__fixtures__/log-level.ts'],
      rules: {
        '@typescript-eslint/prefer-enum-initializers': 0
      }
    }
  ]
}

module.exports = config
