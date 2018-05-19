import { call, put, select, all } from 'redux-saga/effects';
import { isEmpty } from 'lodash/fp';

import { ForgotPasswordTypes } from '../Redux/ForgotPassword';
import { requestStart, requestEnd, requestFail, requestSucceed } from '../Redux/AsyncRequest';
import { isEmail } from '../Helpers/';
import { validate } from '../Validation/';
import { URLS, SCHEMA_NAMES } from '../Constants/';

export function* forgotPassword(api, action){
  const { email = '', passWord = '', retypePassword = '', type = '' } = yield select((state) => state.forgotPassword);

  // do validation here
  let validation = validate({ email, passWord, retypePassword }, SCHEMA_NAMES.FORGOT_PASSWORD) || {};
  if(passWord !== retypePassword) {
    validation = {...validation, ...{ retypePassword: 'Retype password must be equal to password'} };
  }
  // Error validation
  if (!isEmpty(validation)) {
    yield put({ type: ForgotPasswordTypes.FORGOT_PASSWORD_VALIDATION, data: { validation } });
    return;
  }

  // Start submitting login info
  yield put(requestStart(ForgotPasswordTypes.FORGOT_PASSWORD));

  const { code, message } = yield api.post(URLS.FORGOT_PASSWORD, { email, passWord, type });
  if(code === 0) {
    yield all([
      put(requestSucceed(message)),
      put({ type: ForgotPasswordTypes.FORGOT_PASSWORD_RESET_STATE }),
    ]);
  } else {
    yield put(requestFail(message));
  }

}
