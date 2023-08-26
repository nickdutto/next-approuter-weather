module.exports = {
  plugins: ['@typescript-eslint', 'import'],
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  overrides: [
    {
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
      files: ['./**/*.{js,cjs}', '!./next-env.d.ts'],
    },
  ],
  root: true,
  rules: {
    '@next/next/no-img-element': 'off',
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
    ],
    'import/consistent-type-specifier-style': ['error', 'prefer-inline'],
    'end-of-line': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/consistent-type-definitions': 'off',
  },
};
