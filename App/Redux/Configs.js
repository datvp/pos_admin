import mirrorKeyValue from 'mirror-key-value';

/* ------------- Types ------------- */

export const ConfigsTypes = mirrorKeyValue([
  'CONFIGS_UPDATE_STATE',
  'CONFIGS_RESET_STATE',
  'RESET_STATE',
]);

const {
  CONFIGS_UPDATE_STATE,
  CONFIGS_RESET_STATE,
  RESET_STATE,
} = ConfigsTypes;

/* ------------- Initial State ------------- */

const INITIAL_STATE = {
  payPal: {},
  facebook: {},
  google: {},
  contactUs: {},
  countries: [],
  termsAndConditions: {},
};

/* ------------- Reducer ------------- */

export const reducer = (state = INITIAL_STATE, action) => {
  const { type, data } = action;
  switch (type) {
    case CONFIGS_UPDATE_STATE:
      return { ...state, ...data };
    case CONFIGS_RESET_STATE:
    case RESET_STATE:
      return INITIAL_STATE;
    default:
      return state;
  }
};
