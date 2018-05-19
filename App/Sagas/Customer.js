import { call, all, put, select } from 'redux-saga/effects';

import { CustomerTypes } from '../Redux/Customer';
import { CredentialTypes } from '../Redux/Credential';
import { requestStart, requestEnd, requestFail } from '../Redux/AsyncRequest';

import { URLS, STORAGE_KEYS, SOCIAL_NAME } from '../Constants/';
import { removeStorage, isEmail, navigate } from '../Helpers';
import { FBLoginManager } from 'react-native-facebook-login';
import { GoogleSignin } from 'react-native-google-signin';

export function* fetchCustomerData(api) {
  const { _id = '', token = '' } = yield select(state => state.credential);

  // call api get artist profile
  const { code, message } = yield api.get(`${URLS.FETCH_CUSTOMER_DATA}/${_id}`, { token });
  if (code === 0) {
    yield put({ type: CustomerTypes.CUSTOMER_UPDATE_STATE, data: message });
  } else {
    yield put(requestFail(message));
  }
}

export function* refreshCustomerData(api) {
  const { _id = '', token = '' } = yield select(state => state.credential);

  yield put(requestStart(CustomerTypes.CUSTOMER_REFRESH_DATA));
  const { code, message } = yield api.get(`${URLS.FETCH_CUSTOMER_DATA}/${_id}`, { token });

  if (code === 0) {
    yield all([
      put({ type: CustomerTypes.CUSTOMER_UPDATE_STATE, data: message }),
      put(requestEnd()),
    ]);
  } else {
    yield put(requestFail(message));
  }
}

export function * logout(api) {
  const { token = '', _id = '' } = yield select(state => state.credential);

  yield put(requestStart(CustomerTypes.LOGOUT));

  const { code } = yield api.post(URLS.LOGOUT, {}, { token });

  if (_id.indexOf(SOCIAL_NAME.FACEBOOK)) {
    FBLoginManager.logout(function(error, data){

    });
  } else if (_id.indexOf(SOCIAL_NAME.GOOGLE)) {
    GoogleSignin.signOut()
    .then(() => {

    })
    .catch((err) => {

    });
  }

  // force logout
  yield all([
    call(removeStorage, STORAGE_KEYS.CREDENTIAL), // remove id, token in store
    put({ type: CustomerTypes.CUSTOMER_RESET_STATE }), // reset state
    put({ type: CredentialTypes.CREDENTIAL_RESET_STATE }), // reset state
  ]);

  yield put(requestEnd());
}