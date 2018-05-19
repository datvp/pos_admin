import { all, put, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { isEmpty } from 'lodash/fp';

import { requestStart, requestEnd, requestFail } from '../Redux/AsyncRequest';
import { ArtistTypes } from '../Redux/Artist';
import { navigate } from '../Helpers/';
import { ROUTES, URLS } from '../Constants/';
import { BookingTypes } from '../Redux/Booking';

// Search artists function
export function* fetchAvailableArtist(api, action) {
  // const { cart = [], token = '' } = yield select((state) => ({ ...state.booking, ...state.credential }));

  // const searchPayload = {
  //   where: {
  //     services: {
  //       $all: cart.map(service => service._id),
  //     }
  //   }
  // };

  // // Start searching
  // yield put(requestStart(ArtistTypes.ARTIST_FETCH_AVAILABLE));

  // const { code, message } = yield api.post(URLS.SEARCH_ARTIST, searchPayload, { token });

  // if (code ===0) {
  //   yield all([
  //     put({
  //       type: ArtistTypes.ARTIST_UPDATE_STATE,
  //       data: {
  //         displayKey: 'availableArtists',
  //         availableArtists: message,
  //       }
  //     }),
  //     put(requestEnd()),
  //   ])
  //   yield put(navigate(ROUTES.ARTISTS));
  // } else {
  //   yield put(requestFail(message));
  // }
}

export function* confirmArtist(api) {
  // const {
  //   artist: {
  //     detailArtist: {
  //       _id: artistId = '',
  //     } = {},
  //     detailArtist = {},
  //   } = {},
  //   credential: {
  //     token = ''
  //   } = {},
  // } = yield select((state) => ({ ...state}));

  // const payload = {
  //   artistId,
  // };

  // // Start searching
  // yield put(requestStart(ArtistTypes.ARTIST_CONFIRM));

  // const { code, message } = yield api.post(URLS.FETCH_ARTIST_WORKING_TIME, payload, { token });

  // if (code ===0) {
  //   yield all([
  //     put({ // update booked time
  //       type: ArtistTypes.ARTIST_UPDATE_STATE,
  //       data: {
  //         bookedDateTimes: message,
  //       }
  //     }),
  //     put({ // update artist in booking
  //       type: BookingTypes.BOOKING_UPDATE_STATE,
  //       data: {
  //         artists: [detailArtist],
  //       }
  //     }),
  //     put(requestEnd()),
  //   ]);
  //   yield put(navigate(ROUTES.SUMMARY));
  // } else {
  //   yield put(requestFail(message));
  // }
}