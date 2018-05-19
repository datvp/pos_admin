import mirrorKeyValue from 'mirror-key-value';

import { ACCOUNTS } from '../Constants/Types';

/* ------------- Types ------------- */

export const ForgotPasswordTypes = mirrorKeyValue([
  'FORGOT_PASSWORD_UPDATE_STATE',
  'FORGOT_PASSWORD',
  'FORGOT_PASSWORD_RESET_STATE',
  'RESET_STATE',
  'FORGOT_PASSWORD_VALIDATION',
]);

const {
  FORGOT_PASSWORD_UPDATE_STATE,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_RESET_STATE,
  RESET_STATE,
  FORGOT_PASSWORD_VALIDATION,
} = ForgotPasswordTypes;

/* ------------- Initial State ------------- */

const INITIAL_STATE = {
  email: '',
  passWord: '',
  retypePassword: '',
  validation: {},
  type: ACCOUNTS.CUSTOMER,
};

/* ------------- Reducer ------------- */

export const reducer = (state = INITIAL_STATE, action) => {
  const { type, data } = action;
  switch (type) {
    case FORGOT_PASSWORD_UPDATE_STATE:
      return { ...state, ...data };
    case FORGOT_PASSWORD:
      return { ...state, ...data };
    case FORGOT_PASSWORD_RESET_STATE:
    case RESET_STATE:
      return INITIAL_STATE;
    case FORGOT_PASSWORD_VALIDATION:
      return { ...state, ...data };
    default:
      return state;
  }
};
