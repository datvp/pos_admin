import mirrorKeyValue from 'mirror-key-value';
import { cloneDeep } from 'lodash/fp';

/* ------------- Types ------------- */

export const CustomerTypes = mirrorKeyValue([
  'CUSTOMER_UPDATE_STATE',
  'CUSTOMER_START_EDIT',
  'CUSTOMER_END_EDIT',
  'CUSTOMER_REFRESH_DATA',
  'LOGOUT',
  'CUSTOMER_RESET_STATE',
  'RESET_STATE',
]);

const {
  CUSTOMER_UPDATE_STATE,
  CUSTOMER_REFRESH_DATA,
  CUSTOMER_START_EDIT,
  CUSTOMER_END_EDIT,
  LOGOUT,
  CUSTOMER_RESET_STATE,
  RESET_STATE,
} = CustomerTypes;

/* ------------- Initial State ------------- */

const INITIAL_STATE = {
  account: {},
  appointments: {
    pending: [],
    upcoming: [],
    inprogress: [],
    completed: [],
  },
  accountHistory: {},
  detailAppointment: {},
  availableDates: [], // available artist's working date 
  availableTimes: [], // available artist's working time 
  selectedDateIndex: 0, // selected index of available artist's working date 
  selectedTimeIndex: 0, // selected index of available artist's working time
  bookedDateTimes: [],
  isEdit: false,
};

/* ------------- Reducer ------------- */

export const reducer = (state = INITIAL_STATE, action) => {
  const { type, data } = action;

  switch (type) {
    case CUSTOMER_UPDATE_STATE:
      return { ...state, ...data };
    case CUSTOMER_START_EDIT: {
      const { account } = state;
      return {
        ...state,
        accountHistory: cloneDeep(account),
        isEdit: true,
      };
    }
    case CUSTOMER_END_EDIT: {
      const { accountHistory } = state;
      return {
        ...state,
        account: cloneDeep(accountHistory),
        accountHistory: {},
        isEdit: false,
      };
    }
    case CUSTOMER_REFRESH_DATA:
      return { ...state, ...data };
    case LOGOUT:
      return { ...state, ...data };
    case CUSTOMER_RESET_STATE:
    case RESET_STATE:
      return INITIAL_STATE;
    default:
      return state;
  }
};
