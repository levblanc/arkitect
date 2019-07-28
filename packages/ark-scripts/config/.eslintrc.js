module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2018,
  },
  // https://prettier.io/docs/en/integrating-with-linters.html#recommended-configuration
  extends: ['plugin:prettier/recommended'],
  rules: {
    'linebreak-style': ['error', 'unix'],
  }
}