import antfu from '@antfu/eslint-config'
import reactPlugin from 'eslint-plugin-react'

export default antfu({
  react: true,
  ignores: ['src/styles/reset.css', 'src/dist/**', 'src/routes/calibrate.jsx'],
  plugins: {
    'react-old': reactPlugin,
  },
  rules: {
    'quotes': ['error', 'single'],
    '@stylistic/padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
    ],
    'max-depth': ['error', 2],
    'max-params': ['error', 3],
    'max-lines-per-function': ['error', {
      max: 45,
      skipBlankLines: true,
      skipComments: true,
    }],
    'complexity': ['warn', 15],
    'no-else-return': 'error',
    'no-nested-ternary': 'error',
    'no-unneeded-ternary': 'error',
    'no-param-reassign': 'error',
    'no-console': 'off',
    'antfu/no-top-level-await': 'off',
    'react-refresh/only-export-components': 'off',
    'react-old/jsx-uses-vars': 'error',
    'react-old/jsx-uses-react': 'off',
    'unused-imports/no-unused-vars': 'off',
  },
})
