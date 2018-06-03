import { call, all, put, select } from 'redux-saga/effects';

import { CustomerTypes } from '../Redux/Customers';
import { CredentialTypes } from '../Redux/Credential';
import { requestStart, requestEnd, requestFail } from '../Redux/AsyncRequest';

import { URLS, STORAGE_KEYS, SOCIAL_NAME } from '../Constants/';
import { removeStorage, isEmail, navigate } from '../Helpers';
import { FBLoginManager } from 'react-native-facebook-login';
import { GoogleSignin } from 'react-native-google-signin';

export function* fetchCustomers(api, action) {
  const { lastItemIndex } = action;
  const { token = '' } = yield select(state => state.credential);

  // call api get artist profile
  const { code, message } = yield api.get(`${URLS.FETCH_CUSTOMERS}/${lastItemIndex}`, { token });
  if (code === 0) {
    yield put({ type: CustomerTypes.CUSTOMERS_UPDATE_STATE, data: message });
  } else {
    yield put(requestFail(message));
  }
}

export function* refreshCustomers(api, action) {
  const {
    data: {
      lastItemIndex = 0,
    } = {},
  } = action;

  const { token = '' } = yield select(state => state.credential);

  yield put(requestStart(CustomerTypes.CUSTOMERS_REFRESH_DATA));

  const { code, message } = yield api.get(`${URLS.FETCH_CUSTOMERS}/${lastItemIndex}`, { token });
  
  if (code === 0) {
    yield all([
      put({ type: CustomerTypes.CUSTOMERS_UPDATE_STATE, data: message }),
      put(requestEnd()),
    ]);
  } else {
    yield put(requestFail(message));
  }
}
