const Login = {
  type: 'object',
  additionalProperties: false,
  properties: {
    userName: { type: 'string', minLength: 1 },
    passWord: { type: 'string', minLength: 1 },
    type: { type: 'string', minLength: 1 },
  },
  required: ['userName', 'passWord', 'type'],
  errorMessage: {
    properties: {
      userName: 'UserName required',
      passWord: 'Password required',
      type: 'Type required',
    },
  },
};

export default Login;
