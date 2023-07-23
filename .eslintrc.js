module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true,
    'react-native/react-native': true,
  },
  extends: ['@react-native', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react', 'react-native'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['off'],
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-empty-interface': [
          'error',
          {
            allowSingleExtends: false,
          },
        ],
        'react/no-unstable-nested-components': ['off', {allowAsProps: true}],
        'react-hooks/exhaustive-deps': 'warn',
        'no-shadow': 'off',
        'no-undef': 'off',
        'no-console': 1,
      },
    },
  ],
};
