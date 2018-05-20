import { delay } from 'redux-saga';
import { call, put, select, all } from 'redux-saga/effects';
import { isEmpty } from 'lodash/fp';

import { fetchCustomerData } from './Customer';

import { LoginTypes } from '../Redux/Login';
import { CredentialTypes } from '../Redux/Credential';
import { requestStart, requestEnd, requestFail } from '../Redux/AsyncRequest';

import { setStorage, goBack } from '../Helpers/';
import { validate } from '../Validation/';
import { ROUTES, STORAGE_KEYS, URLS } from '../Constants/';
import { SCHEMA_NAMES } from '../Constants/Types';

export function* login(api, action) {
  const { userName, passWord } = yield select((state) => state.login);
  // Validate data
  const validation = validate({ userName, passWord }, SCHEMA_NAMES.LOGIN);

  // Error validation
  if (!isEmpty(validation)) {
    yield put({ type: LoginTypes.LOGIN_VALIDATION, data: { validation } });
    return;
  }

  console.tron.log('info', userName, passWord);
  // Start submitting login info
  yield put(requestStart(LoginTypes.LOGIN));
  // const { code, message } = yield api.post(URLS.LOGIN, { userName, passWord });
  yield delay(2000);
  yield put(requestEnd());
  // // Login succceed
  // if (code === 0) {
  //   const {
  //     _id = '',
  //     token = '',
  //   } = message;

  //   // Update id, token to redux and local storage
  //   yield all([
  //     put({ type: CredentialTypes.CREDENTIAL_UPDATE_STATE, data: { _id, token } }),
  //     call(setStorage, STORAGE_KEYS.CREDENTIAL, { _id, token }),
  //   ]);

  //   // Fetch all customer data
  //   yield all([
  //     call(fetchCustomerData, api),
  //   ]);

  //   // Reset state of login page and turn off loading modal
  //   yield all([
  //     put({ type: LoginTypes.LOGIN_RESET_STATE }),
  //     put(requestEnd()),
  //   ]);

  //   // Navigate to previous screen
  //   yield put(goBack());
  // } else { // Login fail
  //   yield put(requestFail(message));
  // }
}


