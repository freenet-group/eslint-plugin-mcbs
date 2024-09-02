export default {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Ensure error messages end with proper punctuation.',
            category: 'Stylistic Issues',
            recommended: false
        },
        fixable: 'code',
        schema: []
    },
    create(context) {
        function checkErrorMessage(node, message) {
            if (typeof message === 'string' && !/[.!?]$/.test(message.trim())) {
                context.report({
                    node,
                    message: 'Error messages should end with a proper punctuation mark (., !, ?).',
                    fix(fixer) {
                        const trimmedMessage = message.trim()
                        const range = node.range
                        const start = range[0] + 1 // Skip the opening quote
                        const end = range[1] - 1 // Skip the closing quote

                        return fixer.replaceTextRange([start, end], `${trimmedMessage}.`)
                    }
                })
            }
        }

        return {
            ThrowStatement(node) {
                if (node.argument && node.argument.type === 'NewExpression') {
                    const errorType = node.argument.callee.name
                    const args = node.argument.arguments

                    if (errorType.endsWith('Error') && args.length > 0) {
                        const errorMessageNode = args[args.length - 1]

                        if (errorMessageNode.type === 'Literal') {
                            checkErrorMessage(errorMessageNode, errorMessageNode.value)
                        } else if (errorMessageNode.type === 'TemplateLiteral') {
                            const quasis = errorMessageNode.quasis
                            const lastQuasi = quasis[quasis.length - 1]

                            if (lastQuasi && lastQuasi.value.cooked) {
                                const message =
                                    lastQuasi.value.cooked +
                                    (errorMessageNode.expressions.length > 0
                                        ? ''
                                        : lastQuasi.value.cooked)
                                checkErrorMessage(lastQuasi, message)
                            }
                        }
                    }
                }
            }
        }
    }
}
