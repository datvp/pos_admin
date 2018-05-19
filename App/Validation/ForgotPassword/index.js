const ForgotPassword = {
    type: 'object',
    additionalProperties: false,
    properties: {
        email: { type: 'string', minLength: 1, format: 'email' },
        passWord: { type: 'string', minLength: 8 },
        retypePassword: { type: 'string', minLength: 8 },
    },
    required: ['email', 'passWord', 'retypePassword'],
    errorMessage: {
        properties: {
            email: 'Email required',
            passWord: 'Password required and min length >= 8 characters',
            retypePassword: 'Retype password required and min length >= 8 characters',
        },
    },
};

export default ForgotPassword;
