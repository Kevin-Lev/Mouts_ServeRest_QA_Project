const cypressPlugin = require('eslint-plugin-cypress')

module.exports = [
  {
    ...cypressPlugin.configs.recommended,
    files: ['cypress/**/*.js'],
  },
]
