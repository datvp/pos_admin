import { all, put, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { isEmpty } from 'lodash/fp';

import { requestStart, requestFail, requestEnd, requestSucceed } from '../Redux/AsyncRequest';
import { ReviewTypes } from '../Redux/Review';
import { refreshCustomerData } from './Customer';
import { getStorage, navigate, goBack } from '../Helpers';
import { validate } from '../Validation/';
import { STORAGE_KEYS, ROUTES, URLS, ACCOUNTS, SCHEMA_NAMES, STATUSES } from '../Constants';

export function* submitReview(api) {
  const {
    customer: {
      detailAppointment: {
        _id: appointmentId = '',
        artists: [{
          _id: artistId = '',
        } = {}] = [],
      } = {},
      account: {
        _id: customerId = '',
      } = {},
    },
    review: {
      description = '',
      rating = 0,
    } = {},
    credential: {
      token = '',
    } = {},
  } = yield select(state => state );

  let validation = validate({ description, rating }, SCHEMA_NAMES.REVIEW);

  if (rating === 0) {
    validation = { ...validation, rating: 'Rating required'}
  }

  if (!isEmpty(validation)) {
    yield put({ type: ReviewTypes.REVIEW_VALIDATION, data: { validation } });
    return;
  }

  const payloadReview = {
    appointmentId,
    artistId,
    creator: ACCOUNTS.CUSTOMER,
    description,
    customerId,
    rating,
  }
  // Fetch data
  yield put(requestStart(ReviewTypes.REVIEW_SUBMIT));
  // update status appointment
  const {
    code: codeAppointment = -1,
    message: messageAppointment = {}
  } = yield api.put(
    `${URLS.APPOINTMENT_SAVE}/${appointmentId}`,
    { status: STATUSES.REVIEWED },
    { token }
  );

  // check call api success
  if (codeAppointment === 0) {
    // save ratings
    const {
      code: codeRatings = -1,
      message: messageRating = {}
    } = yield api.post(URLS.RATING, payloadReview, { token });
    if (codeRatings === 0) {
      yield put({ type: ReviewTypes.REVIEW_RESET_STATE }), // reset state review
      yield refreshCustomerData(api);
      yield put(goBack());
    } else {
      yield put(requestFail(message));
    }
  } else {
    yield put(requestFail(message));
  }   
}
