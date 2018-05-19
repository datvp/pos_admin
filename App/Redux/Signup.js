import mirrorKeyValue from 'mirror-key-value';

import { ACCOUNTS } from '../Constants';

/* ------------- Types ------------- */

export const SignupTypes = mirrorKeyValue([
  'SIGNUP_UPDATE_STATE',
  'SIGNUP_RESET_STATE',
  'SIGNUP',
  'SIGNUP_REQUEST',
  'SIGNUP_SUCCEED',
  'SIGNUP_FAIL',
  'SIGNUP_VALIDATION',
  'RESET_STATE',
  'SENDING_OTP',
  'SEND_OTP',
  'SEND_OTP_SUCCESS',
]);

const {
  SIGNUP_UPDATE_STATE,
  SIGNUP_RESET_STATE,
  SIGNUP,
  SIGNUP_REQUEST,
  SIGNUP_SUCCEED,
  SIGNUP_FAIL,
  SIGNUP_VALIDATION,
  RESET_STATE,
  SEND_OTP_SUCCESS,
  SENDING_OTP,
  SEND_OTP,
} = SignupTypes;

/* ------------- Initial State ------------- */

const INITIAL_STATE = {
  name: '',
  email: '',
  passWord: '',
  phone: '',
  dateOfBirth: '',
  gender: '',
  type: ACCOUNTS.CUSTOMER,
  reTypePassWord: '',
  validation: {},
  otpInput: '',
  otpCode: '',
  sendOTP: 'show',
  over18: true,
  agreeTerm: true,
};

/* ------------- Reducer ------------- */

export const reducer = (state = INITIAL_STATE, action) => {
  const { type, data } = action;
  switch (type) {
    case SIGNUP_UPDATE_STATE:
      return { ...state, ...data };
    case SIGNUP_RESET_STATE:
      return INITIAL_STATE;
    case SIGNUP:
      return { ...state, ...data };
    case SEND_OTP:
      return { ...state, ...data };
    case SENDING_OTP:
      return { ...state, ...data };
    case SEND_OTP_SUCCESS:
      return { ...state, ...data };
    case SIGNUP_REQUEST:
      return { ...state, ...data };
    case SIGNUP_SUCCEED:
      return { ...state, ...data };
    case SIGNUP_FAIL:
      return { ...state, ...data };
    case SIGNUP_VALIDATION:
      return { ...state, ...data };
    case RESET_STATE:
      return INITIAL_STATE;
    default:
      return state;
  }
};
