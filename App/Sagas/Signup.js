import { delay } from 'redux-saga';
import { call, put, select, all } from 'redux-saga/effects';
import { isEmpty } from 'lodash/fp';

import { SignupTypes } from '../Redux/Signup';
import { requestStart, requestEnd, requestFail, requestSucceed } from '../Redux/AsyncRequest';

import { setStorage, navigate, isEmail } from '../Helpers/';
import { validate } from '../Validation/';
import { ROUTES, STORAGE_KEYS, URLS, ACCOUNTS, STATUSES } from '../Constants/';
import { SCHEMA_NAMES } from '../Constants/Types';

const ONE_MILION = 1000000;

export function* requestSignup (api, action) {
    const {
        name, passWord, email, type,
        reTypePassWord, phone, dateOfBirth,
        otpCode, otpInput, sendOTP, gender, over18, agreeTerm,
    } = yield select((state) => state.signup);
    let validation = validate({ name, passWord, email, phone }, SCHEMA_NAMES.SIGNUP);
    // compare password and reTypePassWord
    if (passWord !== reTypePassWord) {
        validation = {...validation, reTypePassWord: 'Retype password must be equal to password'}
    }

    // check verified otp
    if (sendOTP === 'show') {
        validation = {...validation, phone: 'Please verify your phone number'}
    }
    // check over 18 yrs old
    if (!over18) {
        validation = {...validation, over18: 'Please confirm that your age >= 18'}
    }
    // check confirm agreement
    if (!agreeTerm) {
        validation = {...validation, agreeTerm: 'Please confirm that agree Terms & Conditions'}
    }
    // Error validation
    if (!isEmpty(validation)) {
        yield put({ type: SignupTypes.SIGNUP_VALIDATION, data: { validation } });
        return;
    }


    // Start submitting login info
    yield put(requestStart(SignupTypes.SIGNUP));

    // TODO: delay for dev, wii be removed later
    // yield delay(2000);

    // check otp code
    if (otpCode !== otpInput) {
        yield put(requestFail('Invalid OTP code'));
        return;
    }

    // call api
    const { code, message } = yield api.post(
        URLS.SIGNUP,
        {
            name, passWord, email, phone, dateOfBirth,
            type: ACCOUNTS.CUSTOMER, otpInput, gender,
            status: STATUSES.APPROVED,
            operate: STATUSES.ACTIVE,
        }
    );

    if (code === 0) {
        // Reset state of login page and turn off loading modal
        yield all([
            put({ type: SignupTypes.SIGNUP_RESET_STATE }),
            put(requestEnd()),
        ]);
        // Navigate to dashboard
        yield put(navigate(ROUTES.LOGIN));
    } else { // Login fail
        yield put(requestFail(message));
    }
}

export function* sendOtp (api, action) {
    const { phone, validation } = yield select((state) => state.signup);
    // check input phone null
    if (!phone) {
        yield put({
            type: SignupTypes.SIGNUP_VALIDATION,
            data: { validation: { ...validation, phone: 'Phone number is required'} }
        });
        return;
    }

    yield put(requestStart(SignupTypes.SENDING_OTP));

    const { code, message } = yield api.post(URLS.GET_OTP, { phone });
    if (code === 0) {
        const { otp } = message;
        delete validation.phone;
        yield all([
            put({
                type: SignupTypes.SEND_OTP_SUCCESS,
                data: {
                    validation: { ...validation },
                    sendOTP: 'resend',
                    otpCode: otp,
                },
            }),
            put(requestSucceed('OTP code have been sent in your phone number, please verify')),
        ]);
    } else if (code === ONE_MILION) {
        yield put({
            type: SignupTypes.SIGNUP_VALIDATION,
            data: {
                validation: { ...validation, ...message },
                sendOTP: 'show',
            },
        });
        yield put(requestEnd());
    } else {
        yield put({
            type: SignupTypes.SIGNUP_VALIDATION,
            data: {
                validation: { ...validation, phone: message },
                sendOTP: 'show'
            },
        });
        yield put(requestEnd());
    }
}
