/* @flow */

import { getOr } from 'lodash/fp';
import Ajv from 'ajv';
import ajvError from 'ajv-errors';

import Login from './Login';
import Signup from './Signup';
import ForgotPassword from './ForgotPassword';
import Review from './Review';
import Address from './Address';
import { SCHEMA_NAMES } from '../Constants/Types';

const ajv = new Ajv({ allErrors: true, coerceTypes: true, jsonPointers: true });
ajvError(ajv);

const getJsonSchema = (schemaName) => {
  let schema;
  switch (schemaName) {
    case SCHEMA_NAMES.LOGIN: {
      schema = Login;
      break;
    }
    case SCHEMA_NAMES.SIGNUP: {
      schema = Signup;
      break;
    }
    case SCHEMA_NAMES.FORGOT_PASSWORD: {
      schema = ForgotPassword;
      break;
    }
    case SCHEMA_NAMES.REVIEW: {
      schema = Review;
      break;
    }
    case SCHEMA_NAMES.ADDRESS: {
      schema = Address;
      break;
    }
    default:
      break;
  }
  return schema;
};

const extractValidationForField = (field, schema) => {
  const valueOfField = getOr(undefined, `properties.${field}`, schema);
  if (!valueOfField) return valueOfField;
  const requireds = getOr([], 'required', schema);
  const required = requireds.indexOf(field) > 0 ? [field] : [];
  const error = getOr('*', `errorMessage.properties.${field}`, schema);
  return {
    type: 'object',
    additionalProperties: false,
    properties: { [field]: valueOfField },
    required,
    errorMessage: {
      properties: {
        [field]: error,
      },
    },
  };
};

const buildErrors = (errors: Array<Object> = []): Array<Object> => {
  const errorList = errors.map((item) => {
    const {
      dataPath,
      message,
      keyword,
      params: { additionalProperty } = {},
    } = item || {};
    // additionalProperties
    // errorMessage
    if (keyword === 'errorMessage') {
      const arr = dataPath.split('/');
      return { [arr[1]]: message };
    }
    // additionalProperties by default
    return { additionalProperties: additionalProperty };
  });
  const result = errorList.reduce((acc, item) => {
    const keys = Object.keys(item);
    const values = Object.values(item);
    const [key] = keys;
    const [value] = values;
    // contains all additional keys
    if (key === 'additionalProperties') {
      if (acc[key]) {
        acc[key] = [...acc[key], value];
      } else {
        acc[key] = [value];
      }
    } else {
      // for other error
      acc[key] = value;
    }
    return acc;
  }, {});
  return result;
};
/**
 * return an object contains error details or underfined or empty object
 * @param {Object} data the json object will be validated
 * @param {String} schemaName the name of schema used for validating data
 */
export const validate = (data: Object, schemaName: string): any => {
  let schema = getJsonSchema(schemaName);
  if (!schema) return undefined;
  const perform = ajv.compile(schema);
  const valid = perform(data);
  return valid ? undefined : buildErrors(perform.errors);
};

/**
 * return an object contains error details of failure or undefined or empty object
 * @param {Object} data an object includes key/value pair need to be validated
 * @param {String} schemaName the name of schema used for validating data
*/
export const validateOnField = (data, schemaName) => {
  const field = Object.keys(data)[0];
  let schema = getJsonSchema(schemaName);
  if (!schema) return undefined;
  const fieldSchema = extractValidationForField(field, schema);
  if (!fieldSchema) return undefined;

  const perform = ajv.compile(fieldSchema);
  const valid = perform(data);
  return valid ? undefined : buildErrors(perform.errors);
};
