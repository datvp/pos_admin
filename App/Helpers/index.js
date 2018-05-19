import { AsyncStorage, Platform } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { cloneDeep, isEmpty, range } from 'lodash/fp';
import { SOCIAL_NAME, ACCOUNTS } from './../Constants'

import AppConfig from '../Config/AppConfig';
const moment = require('moment-timezone');

const REG_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const isEmail = email => REG_EMAIL.test(email);

export const parseJson = (data, defaultValue) => {
  if (data === undefined || data === null) return defaultValue;
  let result = defaultValue;
  try {
    result = JSON.parse(data);
  } catch (e) {
    console.tron.log(e);
  }
  return result;
};

/**
 * Navigate to another route
 *
 * @param {any} routeName
 */
export const navigate = (routeName, params = {}) => NavigationActions.navigate({ routeName, params });
export const goBack = () => ({ type: 'Navigation/BACK' });

export const isAndroid = () => {
  return (Platform.OS === 'android');
}

export const isIOS = () => {
  return (Platform.OS === 'ios');
}

/**
 * Set focus on an element inside component
 *
 * @param {any} containerComponent Component that has this field
 * @param {any} field Element that is set focus
 */
export const focusOnField = (containerComponent, field) => {
  containerComponent.refs[field].focus();
}

export const setStorage = async (key, value) => {
  try {
    const expireAt = new Date().getTime() + AppConfig.sessionTimeout;
    await AsyncStorage.setItem(
      key,
      JSON.stringify({ value, expireAt }),
    );
  } catch (error) {
    console.tron.log(error);
  }
};

export const getStorage = async (key, defaultValue = undefined) => {
  let result = defaultValue;
  try {
    result = await AsyncStorage.getItem(key);
    if (!result) return defaultValue;
    const { value, expireAt } = parseJson(result, {});
    if (expireAt < new Date().getTime()) return defaultValue;
    result = value || defaultValue;
  } catch (error) {
    console.tron.log(error);
  }
  return result;
};

export const removeStorage = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.tron.log(error);
  }
};

export const buildFormData = (list, type) => {
  const formData = new FormData();

  if (type === 'media') {
    list.forEach(item => formData.append(item.key, {
      uri: item.value.path,
      type: item.value.mime,
      name: `${item.key}_${Date.now()}`,
    }));
  } else {
    list.forEach(item => formData.append(item.key, {
      uri: item.value.uri,
      type: 'image/jpg',
      name: `${item.key}_${Date.now()}`,
    }));
  }

  return formData;
};

export const getActualData = (data, fields: Array) => {
  const record = cloneDeep(data);
  fields.forEach(item => delete record[item]);
  return record;
};

export const buildSocialAccountFacebook = (socialResponse, socialName = SOCIAL_NAME.FACEBOOK) => {
  const {
    name = '',
    email = '',
    id: socialId,
    picture: {
      data: { url: avatar = '' } = {},
    } = {},
    accessToken,
  } = socialResponse;
  return {
    name,
    email,
    socialId,
    avatar,
    accessToken,
    socialName,
    userName: email,
    role: ACCOUNTS.CUSTOMER,
  };
};

export const buildSocialAccountGoogle = (socialResponse, socialName = SOCIAL_NAME.GOOGLE ) => {
  const {
    accessToken,
    id,
    name,
    email,
    photo,
  } = socialResponse;
  return {
    name,
    email,
    socialId: id,
    avatar: photo,
    accessToken,
    socialName,
    role: ACCOUNTS.CUSTOMER,
    userName: email,
  };
};

export const convertFloatWithPrecision = (floatValue, precision = 3) => {
  const newVal = floatValue.toPrecision(precision);
  try {
    return parseFloat(newVal);
  } catch (e) {
    console.log(e);
  }
  return 0;
};

export const MAPPING_TIME = {
  0: "0 am",
  1: "1 am",
  2: "2 am",
  3: "3 am",
  4: "4 am",
  5: "5 am",
  6: "6 am",
  7: "7 am",
  8: "8 am",
  9: "9 am",
  10: "10 am",
  11: "11 am",
  12: "12 pm",
  13: "1 pm",
  14: "2 pm",
  15: "3 pm",
  16: "4 pm",
  17: "5 pm",
  18: "6 pm",
  19: "7 pm",
  20: "8 pm",
  21: "9 pm",
  22: "10 pm",
  23: "11 pm"
}

export const getTextByTime = (time, defaultValue = '') => {
  return MAPPING_TIME[time] || defaultValue;
}

export const NEXT_30_DAYS = range(0, 30)
  .map(i => ({
    value: moment().add(i, 'days').format('MM/DD/YYYY'),
    text: moment().add(i, 'days').format('Do MMM YYYY'),
    day: moment().add(i, 'days').format('dddd'),
  }));