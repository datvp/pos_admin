import mirrorKeyValue from 'mirror-key-value';

import { ACCOUNTS } from '../Constants/Types';

/* ------------- Types ------------- */

export const LoginTypes = mirrorKeyValue([
  'LOGIN_UPDATE_STATE',
  'LOGIN_RESET_STATE',
  'LOGIN',
  'LOGIN_SUCCEED',
  'LOGIN_FAIL',
  'LOGIN_VALIDATION',
  'RESET_STATE',
  'LOGIN_SOCIAL',
]);

const {
  LOGIN_UPDATE_STATE,
  LOGIN_RESET_STATE,
  LOGIN,
  LOGIN_SUCCEED,
  LOGIN_FAIL,
  LOGIN_VALIDATION,
  RESET_STATE,
  LOGIN_SOCIAL,
} = LoginTypes;

/* ------------- Initial State ------------- */

const INITIAL_STATE = {
  userName: '',
  passWord: '',
  avatar: '',
  empId: '',
  empName: '',
  phone: '',
  email: '',
  birthday: '',
  validation: {},
};

/* ------------- Reducer ------------- */

export const reducer = (state = INITIAL_STATE, action) => {
  const { type, data } = action;
  switch (type) {
    case LOGIN_UPDATE_STATE:
      return { ...state, ...data };
    case LOGIN_RESET_STATE:
      return INITIAL_STATE;
    case LOGIN:
      return { ...state, ...data };
    case LOGIN_SUCCEED:
      return { ...state, ...data };
    case LOGIN_FAIL:
      return { ...state, ...data };
    case LOGIN_VALIDATION:
      return { ...state, ...data };
    case RESET_STATE:
      return INITIAL_STATE;
    default:
      return state;
  }
};
