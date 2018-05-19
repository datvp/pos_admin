import mirrorKeyValue from 'mirror-key-value';

/* ------------- Types ------------- */

export const SearchTypes = mirrorKeyValue([
  'SEARCH_UPDATE_STATE',
  'SEARCH_REQUEST',
  'SEARCH_RESET_STATE',
  'RESET_STATE',
]);

const {
  SEARCH_UPDATE_STATE,
  SEARCH_REQUEST,
  SEARCH_RESET_STATE,
  RESET_STATE,
} = SearchTypes;

/* ------------- Initial State ------------- */

const INITIAL_STATE = {
  input: '',
  filter: {},
};

/* ------------- Reducer ------------- */

export const reducer = (state = INITIAL_STATE, action) => {
  const { type, data } = action;
  switch (type) {
    case SEARCH_UPDATE_STATE:
      return { ...state, ...data };
    case SEARCH_REQUEST:
      return { ...state, ...data };
    case SEARCH_RESET_STATE:
    case RESET_STATE:
      return INITIAL_STATE;
    default:
      return state;
  }
};
