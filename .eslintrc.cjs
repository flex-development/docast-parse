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
  extends: ['./.eslintrc.base.cjs'],
  overrides: [
    ...require('./.eslintrc.base.cjs').overrides,
    {
      files: ['__fixtures__/calculate.ts'],
      rules: {
        '@typescript-eslint/strict-boolean-expressions': 0,
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
      files: ['src/parser-abstract.ts'],
      rules: {
        '@typescript-eslint/no-unused-vars': [
          2,
          {
            args: 'none',
            caughtErrors: 'all',
            ignoreRestSiblings: false,
            vars: 'all'
          }
        ],
        '@typescript-eslint/no-useless-constructor': 0
      }
    }
  ],
  root: true
}

module.exports = config
