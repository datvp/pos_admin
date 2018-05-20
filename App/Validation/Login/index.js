const Login = {
  type: 'object',
  additionalProperties: false,
  properties: {
    userName: { type: 'string', minLength: 1 },
    passWord: { type: 'string', minLength: 1 },
  },
  required: ['userName', 'passWord'],
  errorMessage: {
    properties: {
      userName: 'UserName required',
      passWord: 'Password required',
    },
  },
};

export default Login;
