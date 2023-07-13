/** @type {import("prettier").Config} */
const config = {
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
  tailwindFunctions: ['clsx'],
  trailingComma: 'all',
  tabWidth: 2,
  printWidth: 100,
  semi: true,
  singleQuote: true,
  endOfLine: 'auto',
};

module.exports = config;
