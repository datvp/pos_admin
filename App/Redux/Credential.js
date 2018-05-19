import mirrorKeyValue from 'mirror-key-value';

/* ------------- Types ------------- */

export const CredentialTypes = mirrorKeyValue([
  'CREDENTIAL_UPDATE_STATE',
  'CREDENTIAL_RESET_STATE',
  'RESET_STATE',
]);

const {
  CREDENTIAL_UPDATE_STATE,
  CREDENTIAL_RESET_STATE,
  RESET_STATE,
} = CredentialTypes;

/* ------------- Initial State ------------- */

const INITIAL_STATE = {
  _id: '',
  token: '',
};

/* ------------- Reducer ------------- */

export const reducer = (state = INITIAL_STATE, action) => {
  const { type, data } = action;
  switch (type) {
    case CREDENTIAL_UPDATE_STATE:
      return { ...state, ...data };
    case CREDENTIAL_RESET_STATE:
    case RESET_STATE:
      return INITIAL_STATE;
    default:
      return state;
  }
};
