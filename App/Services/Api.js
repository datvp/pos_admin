import axios from 'axios';
import AppConfig from '../Config/AppConfig';
import { isAndroid } from '../Helpers/';

const {
  api: { host, port, protocol, version },
  connectTimeout,
} = AppConfig;

const BASE_URL = `${protocol}://${host}:${port}${version}`;

// for local dev APIs
// const BASE_URL = 'http://10.0.2.2:4000';
const DEFAULT_RESULT = { code: 100, message: 'Network error! Please check your network connection.' };
const headers = {
  chanel: isAndroid() ? 'android' : 'ios',
  'Content-Type': 'application/json',
};

const uploadHeaders = {
  chanel: isAndroid() ? 'android' : 'ios',
  'content-type': 'multipart/form-data',
};

/* ------------- Axios configs ------------- */

axios.defaults.baseURL = BASE_URL;
axios.defaults.timeout = connectTimeout || 5000;

/* ------------- Api object ------------- */
/**
 * asking server save payload data and return the result of its action
 * @param {string} url the relative url compared to BASE_URL
 * @param {object} payload the json object need to be saved to DB
 */
const post = async (url, payload, config) => {
  try {
    const { data } = await axios.post(url, payload, {
      headers: {
        ...headers,
        ...config,
      },
    });
    return data;
  } catch (error) {
    console.tron.display({ name: 'POST API ERROR', value: { error } });
  }
  return DEFAULT_RESULT;
};
/**
 * asking server update payload data and return result of its action
 * @param {string} url the relative url compared to BASE_URL
 * @param {object} payload the json data need to be updated to DB
 */
const put = async (url, payload, config) => {
  try {
    const { data } = await axios.put(url, payload, {
      headers: {
        ...headers,
        ...config,
      },
    });
    return data;
  } catch (error) {
    console.tron.display({ name: 'PUT API ERROR', value: { error } });
  }
  return DEFAULT_RESULT;
};

/**
 * fetching data with total field, serving for paging
 * @param {string} url the relative api url compared to BASE_URL
 * @param {object} data criteria for searching, segment
 */
const search = async (url, payload) => {
  try {
    const { data } = await axios.post(url, payload, {
      headers,
    });
    return data;
  } catch (error) {
    console.tron.display({ name: 'SEARCH API ERROR', value: { error } });
  }
  return DEFAULT_RESULT;
};

/**
 * return data without total field, not use for paging
 * @param {string} url url api for searching
 * @param {object} payload payload of searching
 */
const find = async (url, payload) => {
  try {
    const { data } = await axios.post(url, payload, {
      headers,
    });
    return data;
  } catch (error) {
    console.tron.display({ name: 'FIND API ERROR', value: { error } });
  }
  return DEFAULT_RESULT;
};

const get = async (url, config) => {
  try {
    const { data } = await axios.get(url, {
      headers: {
        ...headers,
        ...config,
      },
    });
    return data;
  } catch (error) {
    console.tron.display({ name: 'GET API ERROR', value: { error } });
  }
  return DEFAULT_RESULT;
};

const upload = async (url, payload, config) => {
  try {
    const { data } = await axios.post(url, payload, {
      headers: {
        ...uploadHeaders,
        ...config,
      },
    });
    return data;
  } catch (error) {
    console.tron.display({ name: 'UPLOAD API ERROR', value: { error } });
  }
  return DEFAULT_RESULT;
};

export default {
  post,
  put,
  search,
  find,
  get,
  upload,
};
