import { takeLatest, all, take } from 'redux-saga/effects';
import API from '../Services/Api';
import DebugConfig from '../Config/DebugConfig';

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/Startup';
import { LoginTypes } from '../Redux/Login';
import { SignupTypes } from '../Redux/Signup';
import { SearchTypes } from '../Redux/Search';
import { ArtistTypes } from '../Redux/Artist';
import { ForgotPasswordTypes } from '../Redux/ForgotPassword';
import { CustomerTypes } from '../Redux/Customer';
import { BookingTypes } from '../Redux/Booking';
import { ReviewTypes } from '../Redux/Review';
import { AddressTypes } from '../Redux/Address';

/* ------------- Sagas ------------- */

import { startup, fetchLaunchData } from './Startup';
import { requestSignup, sendOtp } from './Signup';
import { forgotPassword } from './ForgotPassword';
import { login } from './Login';
import { search } from './Search';
import { fetchAvailableArtist, confirmArtist } from './Artist';
import { logout, refreshCustomerData } from './Customer';
import { submitReview } from './Review';
import { saveAdress } from './Address';

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup, API),
    takeLatest(StartupTypes.FETCH_LAUNCH_DATA, fetchLaunchData, API),

    //Login
    takeLatest(LoginTypes.LOGIN, login, API),

    //Signup
    takeLatest(SignupTypes.SIGNUP, requestSignup, API),
    takeLatest(SignupTypes.SEND_OTP, sendOtp, API),

    // Forgot password
    takeLatest(ForgotPasswordTypes.FORGOT_PASSWORD, forgotPassword, API),

    // Search
    takeLatest(SearchTypes.SEARCH_REQUEST, search, API),

    // Artist
    takeLatest(ArtistTypes.ARTIST_FETCH_AVAILABLE, fetchAvailableArtist, API),
    takeLatest(ArtistTypes.ARTIST_CONFIRM, confirmArtist, API),

    // Customer
    takeLatest(CustomerTypes.LOGOUT, logout, API),
    takeLatest(CustomerTypes.CUSTOMER_REFRESH_DATA, refreshCustomerData, API),
    
    // Review
    takeLatest(ReviewTypes.REVIEW_SUBMIT, submitReview, API),

    // Address
    takeLatest(AddressTypes.ADDRESS_SAVE, saveAdress, API),
  ]);
}
