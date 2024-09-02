module.exports = {
  rules: {
    'error-message-period': require('./rules/error-message-punctuation.cjs')
  },
  configs: {
    recommended: {
      rules: {
        '@freenet-group/mcbs/error-message-period': 'warn'
      }
    }
  }
}
