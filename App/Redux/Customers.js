import mirrorKeyValue from 'mirror-key-value';

/* ------------- Types ------------- */

export const CustomerTypes = mirrorKeyValue([
  'CUSTOMERS_UPDATE_STATE',
  'CUSTOMERS_REFRESH_DATA',
  'CUSTOMERS_RESET_STATE',
]);

const {
  CUSTOMERS_UPDATE_STATE,
  CUSTOMERS_REFRESH_DATA,
  CUSTOMERS_RESET_STATE,
} = CustomerTypes;

/* ------------- Initial State ------------- */

const INITIAL_STATE = [];

/* ------------- Reducer ------------- */

export const reducer = (state = INITIAL_STATE, action) => {
  const { type, data } = action;

  switch (type) {
    case CUSTOMERS_UPDATE_STATE:
      return data;
    case CUSTOMERS_REFRESH_DATA:
      return data;
    case CUSTOMERS_RESET_STATE:
      return INITIAL_STATE;
    default:
      return state;
  }
};
