import mirrorKeyValue from 'mirror-key-value';

/* ------------- Types ------------- */

export const BookingTypes = mirrorKeyValue([
  'BOOKING_UPDATE_STATE',
  'BOOKING_CANCEL',
  'BOOKING_CANCEL_OVERSCHEDULE',
  'BOOKING_RESET_STATE',
  'RESET_STATE',
  'FETCH_ARTIST_WORKING_TIME',
  'SAVE_APPOINTMENT',
  'UPDATE_APPOINTMENT',
]);

const {
  BOOKING_UPDATE_STATE,
  BOOKING_CANCEL,
  BOOKING_CANCEL_OVERSCHEDULE,
  BOOKING_RESET_STATE,
  RESET_STATE,
  FETCH_ARTIST_WORKING_TIME,
  SAVE_APPOINTMENT,
  UPDATE_APPOINTMENT,
} = BookingTypes;

/* ------------- Initial State ------------- */

const INITIAL_STATE = {
  appointment: {},
  cart: [],
  artists: [], // holding the latest selected artist
  subTotal: 0,
  restTotal: 0,
  isRestPayment: false,
};

/* ------------- Reducer ------------- */

export const reducer = (state = INITIAL_STATE, action) => {
  const { type, data } = action;
  switch (type) {
    case BOOKING_UPDATE_STATE:
      return { ...state, ...data };
    case BOOKING_CANCEL:
      return { ...state, ...data };
    case BOOKING_CANCEL_OVERSCHEDULE:
      return { ...state, ...data };
    case FETCH_ARTIST_WORKING_TIME:
      return { ...state, ...data };
    case BOOKING_RESET_STATE:
    case RESET_STATE:
      return INITIAL_STATE;
    default:
      return state;
  }
};
