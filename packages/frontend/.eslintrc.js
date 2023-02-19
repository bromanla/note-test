module.exports = {
  extends: [
    '../../.eslintrc.js',
    'plugin:vue/vue3-essential',
    '@vue/typescript/recommended',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
  parserOptions: {
    project: './tsconfig.json',
  },
}
