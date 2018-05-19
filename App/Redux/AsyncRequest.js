import mirrorKeyValue from 'mirror-key-value';

/* ------------- Types ------------- */

export const AsyncTypes = mirrorKeyValue([
  'ASYNC_START',
  'ASYNC_SUCCEED',
  'ASYNC_FAIL',
  'ASYNC_RESET',
  'RESET_STATE',
]);

/* ------------- Actions ------------- */

export const requestStart = (reqSending = 'Sending request...') => ({
  type: ASYNC_START,
  data: {
    reqSending,
    error: '',
    success: '',
  },
});

export const requestSucceed = (success = 'Succeeded') => ({
  type: ASYNC_SUCCEED,
  data: {
    reqSending: '',
    error: '',
    success,
  },
});

export const requestFail = (error = 'Failed') => ({
  type: ASYNC_FAIL,
  data: {
    reqSending: '',
    error,
    success: '',
  },
});

export const requestEnd = () => ({
  type: ASYNC_RESET,
  data: {
    reqSending: '',
    error: '',
    success: '',
  },
});

const {
  ASYNC_START,
  ASYNC_SUCCEED,
  ASYNC_FAIL,
  ASYNC_RESET,
  RESET_STATE,
} = AsyncTypes;

/* ------------- Initial State ------------- */

const INITIAL_STATE = {
  reqSending: '',
  error: '',
  success: '',
};

/* ------------- Reducer ------------- */

export const reducer = (state = INITIAL_STATE, action) => {
  const { type, data } = action;
  switch (type) {
    case ASYNC_START:
      return { ...state, ...data };
    case ASYNC_SUCCEED:
      return { ...state, ...data };
    case ASYNC_FAIL:
      return { ...state, ...data };
    case ASYNC_RESET:
      return { ...state, ...data };
    case RESET_STATE:
      return INITIAL_STATE;
    default:
      return state;
  }
};
