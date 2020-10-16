module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  // required to lint *.vue files
  plugins: [
    'vue',
  ],
  // add your custom rules here
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 1,
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state', // for vuex state
        'localState', // for vuex state
        'acc', // for reduce accumulators
        'e', // for e.returnvalue
      ],
    }],
    'import/extensions': ['error', {
      svg: 'never',
    }],
    'no-unused-vars': 'warn',
    'arrow-body-style': 'warn',
    'func-names': [1, 'as-needed'],
    'no-underscore-dangle': 'off',
    'class-methods-use-this': 'off',
    'arrow-parens': 'off',
    'import/no-named-as-default': 'off',
    'import/prefer-default-export': 'off',
    'import/no-dynamic-require': 'off',
    'import/no-unresolved': ['error', {
      ignore: ['.svg'],
    }],
    'no-restricted-syntax': 'off',
    'global-require': 'off',
    'no-plusplus': 'off',
    'max-len': 'off',
    'vue/max-len': ['error', {
      code: 80,
      template: 80,
      tabWidth: 2,
      comments: 100,
      ignorePattern: '',
      ignoreComments: false,
      ignoreTrailingComments: false,
      ignoreUrls: false,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreRegExpLiterals: true,
      ignoreHTMLAttributeValues: false,
      ignoreHTMLTextContents: false,
    }],
  },
  settings: {
    'import/core-modules': [
      // for disable ''vue' should be listed in the project's dependencies' error
      'vue',
      'vuex',
    ],
  },
};
