module.exports = {
    'root': true,
    'parser': '@typescript-eslint/parser',
    'plugins': [
      '@typescript-eslint'
    ],
    'extends': [
      'eslint:recommended',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended'
    ],
    'rules': {
      'indent': ['error', 2, {
          'ignoredNodes': ['TemplateLiteral']
      }],
      'linebreak-style': [
          'error',
          'unix'
      ],
      'quotes': [
          'error',
          'single'
      ],
      'semi': [
          'error',
          'always'
      ],
      'no-console': [
          'error', {
              allow: [
                  'error'
              ]
          }
      ],
      'array-bracket-spacing': 'error',
      'block-spacing': 'error',
      'brace-style': ['error', '1tbs', { 'allowSingleLine': true }],
      'camelcase': 'error',
      'comma-spacing': 'error',
      'computed-property-spacing': ['error', 'never'],
      'func-call-spacing': ['error', 'never'],
      'jsx-quotes': ['error', 'prefer-single'],
      'key-spacing': ["error", { "beforeColon": false, "afterColon": true }],
      'keyword-spacing': ["error", { "before": true, "after": true }],
      'no-tabs': 'error',
      'no-trailing-spaces': 'error',
      'no-whitespace-before-property': 'error',
      'object-curly-spacing': ["error", "always"],
      'quotes': ["error", "single"],
      'space-before-blocks': "error",
      'space-before-function-paren': ["error", "never"],
      'space-in-parens': ["error", "never"],
      'space-infix-ops': "error"
  }
};