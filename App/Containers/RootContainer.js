import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { includes, isEmpty } from 'lodash/fp';
import Drawer from 'react-native-drawer';

import MyAccount from '../Containers/MyAccount';

import { ModalLoading, alert } from '../Components';
import AppNavigation from '../Navigation/AppNavigation';
import { Colors } from '../Themes';
import { isIOS } from '../Helpers';

import { StartupTypes } from '../Redux/Startup';
import { LoginTypes } from '../Redux/Login';
import { SignupTypes } from '../Redux/Signup';
import { ForgotPasswordTypes } from '../Redux/ForgotPassword';
import { SearchTypes } from '../Redux/Search';
import { ArtistTypes } from '../Redux/Artist';
import { CustomerTypes } from '../Redux/Customer';
import { BookingTypes } from '../Redux/Booking';
import { ReviewTypes } from '../Redux/Review';
import { requestEnd } from '../Redux/AsyncRequest';

// Styles
import styles from './Styles/RootContainer';

class RootContainer extends Component {
  componentDidMount() {
    this.props.startup();
  }

  _onModalDismiss = () => {
    const { asyncRequest: { error = '', success = '' } = {} } = this.props;
    if (error || success) {
      alert({
        message: error || success,
        positive: { onPress: this.props.resetRequest },
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const { asyncRequest: { reqSending: currRequest, error: currError } = {} } = this.props;
    const { asyncRequest: { reqSending: prevRequest } = {} } = prevProps;

    // Fetch launch data failed
    if(prevRequest === StartupTypes.FETCH_LAUNCH_DATA
      && isEmpty(currRequest)
      && !isEmpty(currError)) {
        alert({
          message: currError,
          positive: { onPress: this.props.resetRequest },
        });
      }
  }

  // closeControlPanel = () => {
  //   this._drawer.close()
  // };

  // openControlPanel = () => {
  //   this._drawer.open()
  // };

  render() {
    const { asyncRequest: { reqSending = '' } = {} } = this.props;

    const modalVisible = includes(reqSending,
      [
        LoginTypes.LOGIN,
        SignupTypes.SIGNUP,
        SignupTypes.SENDING_OTP,
        ForgotPasswordTypes.FORGOT_PASSWORD,
        SearchTypes.SEARCH_REQUEST,
        ArtistTypes.ARTIST_FETCH_AVAILABLE,
        ArtistTypes.ARTIST_CONFIRM,
        CustomerTypes.LOGOUT,
        BookingTypes.SAVE_APPOINTMENT,
        BookingTypes.BOOKING_CANCEL,
        BookingTypes.BOOKING_CANCEL_OVERSCHEDULE,
        BookingTypes.FETCH_ARTIST_WORKING_TIME,
        ReviewTypes.REVIEW_SUBMIT,
      ],
    );

    return (
      <Drawer
        ref={(ref) => this._drawer = ref}
        side="right"
        type="overlay"
        // styles={drawerStyles}
        tapToClose={true}
        openDrawerOffset={0.2} // 30% gap on the right side of drawer
        panCloseMask={0.2}
        panOpenMask={0.2}
        negotiatePan={true}
        closedDrawerOffset={-3}
        content={<MyAccount/>}
        tweenHandler={(ratio) => ({
          mainOverlay: { backgroundColor:'#000', opacity: ratio * 0.8},
        })}
        >
        <View style={styles.applicationView}>
          <StatusBar
            backgroundColor={Colors.bgStatusBar}
            barStyle="light-content"
          />
          { isIOS() && <View style={styles.statusBar} /> }
          <ModalLoading visible={modalVisible} onDismiss={this._onModalDismiss} />
          <AppNavigation />
        </View>
      </Drawer>
    );
  }
}

const mapStateToProps = state => {
  const { asyncRequest } = state;
  return {
    asyncRequest,
  };
};

const mapDispatchToProps = dispatch => ({
  startup: () => dispatch({ type: StartupTypes.STARTUP }),
  resetRequest: () => dispatch(requestEnd()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);
