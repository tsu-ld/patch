import antfu from '@antfu/eslint-config'

export default antfu({
  react: true,
  rules: {
    // formatting
    'quotes': ['error', 'single'],
    '@stylistic/max-len': ['error', {
      code: 80,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
    }],
    '@stylistic/padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
    ],

    // complexity
    'max-depth': ['error', 2],
    'max-params': ['error', 3],
    'max-lines-per-function': ['error', {
      max: 30,
      skipBlankLines: true,
      skipComments: true,
    }],
    'complexity': ['warn', 15],

    // naming
    'id-denylist': ['error', 'data', 'result', 'temp', 'info', 'flag', 'item'],

    // logic
    'no-else-return': 'error',
    'no-nested-ternary': 'error',
    'no-unneeded-ternary': 'error',
    'no-param-reassign': 'error',
    'no-negated-condition': 'error',
    'no-magic-numbers': ['warn', {
      ignore: [0, 1],
      ignoreEnums: true,
      ignoreDefaultValues: true,
      ignoreClassFieldInitialValues: true,
    }],
    'consistent-return': 'error',

    // disabled
    'no-console': 'off',
    'antfu/no-top-level-await': 'off',
  },
})
