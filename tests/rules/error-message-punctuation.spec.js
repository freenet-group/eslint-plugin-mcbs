import {RuleTester} from 'eslint'
import rule from '../../src/rules/error-message-punctuation.js'

const ruleTester = new RuleTester({
    languageOptions: {
        parserOptions: {
            ecmaVersion: 2020,
            sourceType: 'module'
        }
    }
})

ruleTester.run('error-message-punctuation', rule, {
    valid: [
        {code: 'throw new Error("Error message.");'},
        {code: 'throw new CustomError("Custom error message!");'},
        {code: 'throw new AnotherError("Another message?");'}
    ],
    invalid: [
        {
            code: 'throw new Error("Error message");',
            errors: [
                {message: 'Error messages should end with a proper punctuation mark (., !, ?).'}
            ],
            output: 'throw new Error("Error message.");'
        },
        {
            code: 'throw new CustomError("Custom error message");',
            errors: [
                {message: 'Error messages should end with a proper punctuation mark (., !, ?).'}
            ],
            output: 'throw new CustomError("Custom error message.");'
        },
        {
            code: 'throw new AnotherError("Another message");',
            errors: [
                {message: 'Error messages should end with a proper punctuation mark (., !, ?).'}
            ],
            output: 'throw new AnotherError("Another message.");'
        }
    ]
})
