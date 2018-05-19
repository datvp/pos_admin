import { all, put, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { isEmpty } from 'lodash/fp';

import { StartupTypes } from '../Redux/Startup';
import { CredentialTypes } from '../Redux/Credential';
import { ConfigsTypes } from '../Redux/Configs';
import { ArtistTypes } from '../Redux/Artist';
import { ServiceTypes } from '../Redux/Service';
import { CustomerTypes } from '../Redux/Customer';

import { requestStart, requestFail, requestEnd } from '../Redux/AsyncRequest';
import { getStorage, navigate } from '../Helpers';
import { STORAGE_KEYS, ROUTES, URLS } from '../Constants';

// process STARTUP actions
export function* startup(api) {
  const credential = yield getStorage(STORAGE_KEYS.CREDENTIAL, {});

  // User already logged in
  if (!isEmpty(credential)) {
    // Save credential to redux
    const { _id, token } = credential;
    yield put({ type: CredentialTypes.CREDENTIAL_UPDATE_STATE, data: { _id, token } });
  }

  // Get data for app
  yield fetchLaunchData(api);

  // Navigate to main page
  yield put(navigate(ROUTES.MAIN));
}

export function* fetchLaunchData(api) {
  // const { _id = '', token = '' } = yield select(state => state.credential);

  // // Fetch data
  // yield put(requestStart(StartupTypes.FETCH_LAUNCH_DATA));
  // const { code, message } = yield api.get(URLS.FETCH_LAUNCH_DATA, { token });

  // // Fetch success
  // if (code === 0) {
  //   const {
  //     configs = {},
  //     artists = [],
  //     services = [],
  //     customer = {},
  //   } = message;

  //   yield all([
  //     put({ type: ConfigsTypes.CONFIGS_UPDATE_STATE, data: configs }),
  //     put({ type: ArtistTypes.ARTIST_UPDATE_STATE, data: { listArtists: artists } }),
  //     put({ type: ServiceTypes.SERVICE_UPDATE_STATE, data: { listServices: services } }),
  //     put({ type: CustomerTypes.CUSTOMER_UPDATE_STATE, data: customer }),
  //   ]);
  //   yield put(requestEnd());
  // } else {
  //   yield put(requestFail(message));
  // }
}
