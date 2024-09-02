module.exports = {
  rules: {
    'error-message-period': require('./rules/error-message-punctuation.cjs')
  },
  configs: {
    recommended: {
      rules: {
        'error-message-period': 'warn'
      }
    }
  }
}
