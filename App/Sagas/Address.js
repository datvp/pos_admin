import { all, put, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { isEmpty, isEqual } from 'lodash/fp';

import { requestStart, requestEnd, requestFail } from '../Redux/AsyncRequest';
import { AddressTypes } from '../Redux/Address';
import { CustomerTypes } from '../Redux/Customer';
import { BookingTypes } from '../Redux/Booking';

import { SCHEMA_NAMES } from '../Constants';

import { validate } from '../Validation/';

// Search artists function
export function* saveAdress(api) {
  const {
    address: {
      content = {},
      displayKey,
    } = {},
    customer: {
      account = {},
      account: { addresses = [] } = {},
    } = {},
    booking: {
      appointment = {},
      appointment: {
        addresses: [bookedAddress = {}] = [],
      } = {},
    },
  } = yield select();

  // Case 1: add new address
  if (displayKey === null) {
    yield put({
      type: CustomerTypes.CUSTOMER_UPDATE_STATE,
      data: {
        account: {
          ...account,
          addresses: [...addresses, content],
        }
      },
    });
  } else { // Case 2: edit existed address
    const oldAddress = addresses[displayKey];
    addresses[displayKey] = content;

    const requests = [
      put({
        type: CustomerTypes.CUSTOMER_UPDATE_STATE,
        data: {
          account: {
            ...account,
            addresses,
          }
        },
      }),
    ];
    if (isEqual(bookedAddress, oldAddress)) {
      requests.push(
        put({
          type: BookingTypes.BOOKING_UPDATE_STATE,
          data: {
            appointment: {
              ...appointment,
              addresses: [content],
            }
          }
        }),
      );
    }

    yield all(requests);
  }

  yield put({ type: AddressTypes.ADDRESS_RESET_STATE });
}
