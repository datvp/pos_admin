import mirrorKeyValue from 'mirror-key-value';

/* ------------- Types ------------- */

export const StartupTypes = mirrorKeyValue([
  'STARTUP',
  'STARTUP_UPDATE_STATE',
  'FETCH_LAUNCH_DATA',
  'RESET_STATE',
]);

const {
  STARTUP,
  STARTUP_UPDATE_STATE,
  FETCH_LAUNCH_DATA,
  RESET_STATE,
} = StartupTypes;

/* ------------- Initial State ------------- */

const INITIAL_STATE = {};

/* ------------- Reducer ------------- */

export const reducer = (state = INITIAL_STATE, action) => {
  const { type, data } = action;
  switch (type) {
    case STARTUP:
      return { ...state, ...data };
    case STARTUP_UPDATE_STATE:
      return { ...state, ...data };
    case FETCH_LAUNCH_DATA:
      return { ...state, ...data };
    case RESET_STATE:
      return INITIAL_STATE;
    default:
      return state;
  }
};
