import { delay } from 'redux-saga';
import { call, put, select, all } from 'redux-saga/effects';
import { isEmpty } from 'lodash/fp';

import { fetchCustomerData } from './Customer';

import { LoginTypes } from '../Redux/Login';
import { CredentialTypes } from '../Redux/Credential';
import { requestStart, requestEnd, requestFail } from '../Redux/AsyncRequest';

import { setStorage, navigate, isEmail } from '../Helpers/';
import { validate } from '../Validation/';
import { ROUTES, STORAGE_KEYS, URLS, SOCIAL_NAME, ACCOUNTS } from '../Constants/';
import { buildSocialAccountFacebook, buildSocialAccountGoogle } from './../Helpers';

export function* login(api, action) {
  const { userName, passWord, type } = yield select((state) => state.login);
  // Validate data
  const validation = validate({ userName, passWord, type }, 'Login');

  // Error validation
  if (!isEmpty(validation)) {
    yield put({ type: LoginTypes.LOGIN_VALIDATION, data: { validation } });
    return;
  }

  // Start submitting login info
  yield put(requestStart(LoginTypes.LOGIN));
  const { code, message } = yield api.post(URLS.LOGIN, { userName, passWord, type });

  // Login succceed
  if (code === 0) {
    const {
      _id = '',
      token = '',
    } = message;

    // Update id, token to redux and local storage
    yield all([
      put({ type: CredentialTypes.CREDENTIAL_UPDATE_STATE, data: { _id, token } }),
      call(setStorage, STORAGE_KEYS.CREDENTIAL, { _id, token }),
    ]);

    // Fetch all customer data
    yield all([
      call(fetchCustomerData, api),
    ]);

    // Reset state of login page and turn off loading modal
    yield all([
      put({ type: LoginTypes.LOGIN_RESET_STATE }),
      put(requestEnd()),
    ]);

    // Navigate to previous screen
    yield put({ type: 'Navigation/BACK' });
  } else { // Login fail
    yield put(requestFail(message));
  }
}

export function* loginSocialAccount(api, action) {
  const {
    data: {
      dataSocial = {},
      socialName,
    } = {},
  } = action;

  // Start submitting login info
  yield put(requestStart(LoginTypes.LOGIN));
  let data = {};
  if (socialName === SOCIAL_NAME.GOOGLE) {
    data = buildSocialAccountGoogle(dataSocial);
  } else {
    const {
      credentials: {
        userId = '',
        token = '',
      } = {},
    } = dataSocial;
    // api get public profile facebook
    const apiFb = `https://graph.facebook.com/v2.3/${userId}?fields=picture,email,name,about,website&access_token=${token}`
    const fbProfile = yield api.get(apiFb);
    data = buildSocialAccountFacebook({ ...fbProfile, accessToken: token });
  }

  const { socialId } = data;
  if (!socialId) return;
  const filter = { socialId, socialName };
  data = { data: { ...data, type: ACCOUNTS.CUSTOMER }, filter }
  const { code, message } = yield api.post(URLS.SOCIAL_NETWORK_UPSERT, data);

  if (code === 0) {
    const {
      _id = '',
      token = '',
    } = message;

    // Update id, token to redux and local storage
    yield all([
      put({ type: CredentialTypes.CREDENTIAL_UPDATE_STATE, data: { _id, token } }),
      call(setStorage, STORAGE_KEYS.CREDENTIAL, { _id, token }),
    ]);

    // Fetch all customer data
    yield all([
      call(fetchCustomerData, api),
    ]);

    // Reset state of login page and turn off loading modal
    yield all([
      put({ type: LoginTypes.LOGIN_RESET_STATE }),
      put(requestEnd()),
    ]);

    // Navigate to previous screen
    yield put({ type: 'Navigation/BACK' });
  } else {
    yield put(requestFail(message));
  }
};


