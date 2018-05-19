const Signup = {
    type: 'object',
    additionalProperties: false,
    properties: {
      name: { type: 'string', minLength: 1 },
      passWord: { type: 'string', minLength: 8 },
      email: { type: 'string', minLength: 1 },
      otpInput: { type: 'string' },
      otpCode: { type: 'string' },
      sendOTP: { type: 'string' },
      phone: { type: 'string' },
      reTypePassWord: { type: 'string' },
      over18: { type: 'boolean' },
      agreeTerm: { type: 'boolean' },
    },
    required: ['name', 'passWord', 'email', 'phone'],
    errorMessage: {
      properties: {
        name: 'Name is required',
        passWord: 'Password is required and min length >= 8 characters',
        email: 'Email is required',
        phone: 'Phone is required'
      },
    },
  };
  
  export default Signup;
  