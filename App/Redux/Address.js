import mirrorKeyValue from 'mirror-key-value';

import { validate } from '../Validation/';
import { SCHEMA_NAMES } from '../Constants';

/* ------------- Types ------------- */

export const AddressTypes = mirrorKeyValue([
  'ADDRESS_UPDATE_STATE',
  'ADDRESS_SAVE',
  'ADDRESS_RESET_STATE',
  'RESET_STATE',
]);

const {
  ADDRESS_UPDATE_STATE,
  ADDRESS_SAVE,
  ADDRESS_RESET_STATE,
  RESET_STATE,
} = AddressTypes;

/* ------------- Initial State ------------- */

const INITIAL_CONTENT = {
  label: '',
  houseNo: '',
  landMark: '',
  state: '',
  city: '',
  zipCode: '',
}

const INITIAL_STATE = {
  content: INITIAL_CONTENT,
  isModalVisible: false,
  displayKey: null,
  validation: validate(INITIAL_CONTENT, SCHEMA_NAMES.ADDRESS),
};

/* ------------- Reducer ------------- */

export const reducer = (state = INITIAL_STATE, action) => {
  const { type, data } = action;
  switch (type) {
    case ADDRESS_UPDATE_STATE: {
      const newData = { ...state, ...data };
      const { content = {} } = newData;
      return {
        ...newData,
        validation: validate(content, SCHEMA_NAMES.ADDRESS),
      };
    }
    case ADDRESS_SAVE:
      return { ...state, ...data };
    case ADDRESS_RESET_STATE:
    case RESET_STATE:
      return INITIAL_STATE;
    default:
      return state;
  }
};
