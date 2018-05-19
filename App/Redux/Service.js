import mirrorKeyValue from 'mirror-key-value';

/* ------------- Types ------------- */

export const ServiceTypes = mirrorKeyValue([
  'SERVICE_UPDATE_STATE',
  'SERVICE_RESET_STATE',
  'RESET_STATE',
]);

const {
  SERVICE_UPDATE_STATE,
  SERVICE_RESET_STATE,
  RESET_STATE,
} = ServiceTypes;

/* ------------- Initial State ------------- */

const INITIAL_STATE = {
  listServices: [], // all available services on system
  displayKey: 0, // index section expand
};

/* ------------- Reducer ------------- */

export const reducer = (state = INITIAL_STATE, action) => {
  const { type, data } = action;
  switch (type) {
    case SERVICE_UPDATE_STATE:
      return { ...state, ...data };
    case SERVICE_RESET_STATE:
    case RESET_STATE:
      return INITIAL_STATE;
    default:
      return state;
  }
};
