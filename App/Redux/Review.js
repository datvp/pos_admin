import mirrorKeyValue from 'mirror-key-value';

/* ------------- Types ------------- */

export const ReviewTypes = mirrorKeyValue([
  'REVIEW_UPDATE_STATE',
  'REVIEW_RESET_STATE',
  'REVIEW_SUBMIT',
  'RESET_STATE',
  'REVIEW_VALIDATION',
]);

const {
  REVIEW_UPDATE_STATE,
  REVIEW_RESET_STATE,
  REVIEW_SUBMIT,
  RESET_STATE,
  REVIEW_VALIDATION,
} = ReviewTypes;

/* ------------- Initial State ------------- */

const INITIAL_STATE = {
  isModalVisible: false,
  description: '',
  rating: 0,
  validation: {},
};

/* ------------- Reducer ------------- */

export const reducer = (state = INITIAL_STATE, action) => {
  const { type, data } = action;
  switch (type) {
    case REVIEW_UPDATE_STATE:
      return { ...state, ...data };
    case REVIEW_SUBMIT:
      return { ...state, ...data };
    case REVIEW_VALIDATION:
      return { ...state, ...data };
    case REVIEW_RESET_STATE:
    case RESET_STATE:
      return INITIAL_STATE;
    default:
      return state;
  }
};
