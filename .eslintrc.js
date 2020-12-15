module.exports = {
  extends: [
    require.resolve('./config/eslint/eslint.js'),
    require.resolve('./config/eslint/eslint-react.js'),
  ],
  root: true,
  env: {
    browser: true,
    node: true,
    jasmine: true
  },
  rules: {
    "comma-dangle": ["error", "only-multiline"],
    "indent": ["error", 2, {
      "ignoredNodes": ["JSXElement"],
      "SwitchCase": 1,
    }],
    "react/jsx-indent": ["error", 2],
    "react/jsx-indent-props": [1, "first"],
    "implicit-arrow-linebreak": [0],
    'valid-jsdoc': [0],
    'no-underscore-dangle': [0],
    'camelcase': [0],
    'react/jsx-closing-bracket-location': [1, 'tag-aligned'],
    'react/jsx-closing-tag-location': [0],
    'no-console': [0],
    'react/jsx-handler-names': [1],
    'react/sort-comp': [
      2,
      {
        order: [
          'variables',
          'lifecycle',
          'everything-else',
          'render'
        ],
      }
    ],
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    }
  },
  overrides: [
    Object.assign(
      {
        files: ['**/*.test.js'],
        env: { jest: true },
        rules: {
          "indent": ["error", 2]
        },
        extends: [
          require.resolve('@fcc/config/eslint/eslint-jest')
        ],
        rules: {
          'jest/valid-expect': [0],
          'no-unused-expressions': [0]
        }
      }
    ),
    Object.assign(
      {
        files: ['**/*.ts', '**/*.tsx'],
        extends: [
          require.resolve('@fcc/config/eslint/eslint-typescript.js'),
          require.resolve('@fcc/config/eslint/eslint-react'),
        ],
        rules: {
          "comma-dangle": ["error", "only-multiline"],
          "react/jsx-indent-props": [1, "first"],
          'react/jsx-closing-bracket-location': [1, 'tag-aligned'],
          "@typescript-eslint/indent": ["error", 2, {
            "ignoredNodes": ["JSXElement"],
            "SwitchCase": 1,
          }],
          "@typescript-eslint/quotes": ["error", "single"],
          "implicit-arrow-linebreak": [0],
          'no-console': [0],
          '@typescript-eslint/prefer-readonly': [0],
        },
        parserOptions: {
          project: './tsconfig.json',
          tsconfigRootDir: __dirname,
          ecmaFeatures: {
            jsx: true
          }
        },
      }
    )
  ]
};