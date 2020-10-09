module.exports = {
    'env': {
        'node': true,
        'browser': true,
        'es6': true,
        'jest': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended'
    ],
    'parser': 'babel-eslint',
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 2018,
        'sourceType': 'module'
    },
    'plugins': [
        'react'
    ],
    'settings': {
        'react': {
            'version': 'detect'
        }
    },
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
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error',
        'react/forbid-prop-types': [
            'error', { }
        ],
        'react/no-unused-prop-types': [
            'error', { }
        ],
        'react/boolean-prop-naming': [
            'error',  {
                "rule": "^(is|has|show)[A-Z]([A-Za-z0-9]?)+"
            }
        ],
        'react/jsx-no-duplicate-props': [
            'error', { }
        ],
        'react/jsx-props-no-multi-spaces': 'error',
        'react/require-default-props': [
            'error', {
                'forbidDefaultForRequired': true
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
