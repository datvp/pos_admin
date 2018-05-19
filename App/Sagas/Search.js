import { all, put, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { isEmpty } from 'lodash/fp';

import { requestStart, requestEnd, requestFail } from '../Redux/AsyncRequest';
import { SearchTypes } from '../Redux/Search';
import { ArtistTypes } from '../Redux/Artist';
import { navigate } from '../Helpers/';
import { ROUTES, URLS } from '../Constants/';

// Search artists function
export function* search(api) {
  // const { input = '', token = '' } = yield select((state) => ({ ...state.search, ...state.credential }));

  // const searchPayload = {
  //   where: {
  //     $or: [
  //       { name: { $regex: input, $options: '-i' } },
  //       { zipCode: input },
  //     ],
  //   }
  // };

  // // Start searching
  // yield put(requestStart(SearchTypes.SEARCH_REQUEST));

  // const { code, message } = yield api.post(URLS.SEARCH_ARTIST, searchPayload, { token });

  // if (code ===0) {
  //   yield all([
  //     put({
  //       type: ArtistTypes.ARTIST_UPDATE_STATE,
  //       data: {
  //         displayKey: 'searchArtists',
  //         searchArtists: message,
  //       }
  //     }),
  //     put({
  //       type: SearchTypes.SEARCH_RESET_STATE,
  //     }),
  //     put(requestEnd()),
  //   ])
  //   yield put(navigate(ROUTES.ARTISTS));
  // } else {
  //   yield put(requestFail(message));
  // }
}
