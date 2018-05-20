import React, { PureComponent } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  RefreshControl,
  TouchableWithoutFeedback,
  BackHandler,
} from 'react-native';
import { Container, Content } from 'native-base';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash/fp';
import FastImage from 'react-native-fast-image';

import { CustomerTypes } from '../Redux/Customer';
import { BookingTypes } from '../Redux/Booking';
import { navigate } from '../Helpers';
import { ROUTES, GENDERS } from '../Constants';
import { NavBar, Button, alert } from '../Components';
import { LoggedOutSection } from '../Containers';
import { Images } from '../Themes';
import styles from './Styles/MyAccount';

class MyAccount extends PureComponent {
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this._onBackPress);
  }

  componentWillUnmount() {
    const {
      customer: {
        isEdit,
      }
    } = this.props;

    if (isEdit) {
      this._cancelEdit();
    }

    BackHandler.removeEventListener('hardwareBackPress', this._onBackPress);
  }

  _onBackPress = () => {
    const {
      customer: {
        isEdit,
      }
    } = this.props;

    if (isEdit) {
      this._cancelEdit();
    }
    return true;
  }

  _confirmLogout = () => {
    alert({
      message: 'Do you want to logout?',
      positive: {
        text: 'YES',
        onPress: this.props.logout,
      },
      negative: {
        text: 'NO',
      }
    });
  }

  _resetBookedAddress = () => {
    const {
      booking: {
        appointment = {},
        appointment: { addresses = [] } = {},
      } = {},
    } = this.props;

    this.props.updateBookingState({
      appointment: {
        ...appointment,
        addresses: [],
      }
    });
  }

  _cancelEdit = () => {
    this._resetBookedAddress();
    this.props.endEdit();
  }

  _onPressEdit = () => {
    this._resetBookedAddress();
    this.props.startEdit();
  }

  _onPressSave = () => {
    this._resetBookedAddress();
    this.props.endEdit();
  }

  _renderRow = ({ title, value }) => {
    return (
      <View style={styles.sectionItem}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionValue}>{value}</Text>
      </View>
    );
  }

  _renderRightHeader = () => {
    const {
      customer: {
        isEdit,
      }
    } = this.props;

    return (
      <TouchableWithoutFeedback onPress={isEdit ? this._onPressSave : this._onPressEdit}>
        <View style={styles.headerRightContainer}>
          <Text style={styles.textHeader}>{isEdit ? 'Save' : 'Edit'}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  _renderLoggedInContent = () => {
    const {
      credential: { token },
      asyncRequest: { reqSending } = {},
      customer: {
        account: {
          name = '',
          avatar = '',
          dateOfBirth = '',
          gender = '',
          email = '',
          phone = '',
          passWord = '',
        },
        isEdit,
      }
    } = this.props;

    return (
      <ScrollView
        contentContainerStyle={styles.container}
        bounces={false}
        refreshControl={
          !isEdit ?
          <RefreshControl
            refreshing={reqSending === CustomerTypes.CUSTOMER_REFRESH_DATA}
            onRefresh={this.props.refresh}
          /> :
          undefined
        }>
        <View style={styles.avatarContainer}>
          <FastImage
            style={styles.avatar}
            source={isEmpty(avatar) ? Images.avatarDefault : { uri: avatar }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
        <Text style={styles.sectionHeader}>Personal Information</Text>
        { this._renderRow({ title: 'Name', value: name }) }
        { this._renderRow({ title: 'Birthday', value: dateOfBirth }) }
        { this._renderRow({ title: 'Gender', value: GENDERS[gender] || '' }) }
        { this._renderRow({ title: 'Email ID', value: email }) }
        { this._renderRow({ title: 'Mobile', value: phone }) }
        { this._renderRow({ title: 'Password', value: '**********' }) }
        <Text style={styles.sectionHeader}>Addresses</Text>
        {
          !isEdit &&
          <TouchableOpacity onPress={this._confirmLogout}>
            <View style={styles.sectionItem}>
              <Text style={styles.textLogout}>Logout</Text>
            </View>
          </TouchableOpacity>
        }
      </ScrollView>
    );
  }

  render() {
    const {
      credential: { token },
      customer: {
        account: {
          name = '',
        },
        isEdit,
      }
    } = this.props;
    const isLoggedIn = !isEmpty(token);

    return (
      <Container style={styles.mainContainer}>
        {
          this._renderLoggedInContent()
          // isLoggedIn ?
          // this._renderLoggedInContent() :
          // <LoggedOutSection />
        }
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const { credential, customer, asyncRequest, booking } = state;
  return { credential, customer, asyncRequest, booking };
};
const mapDispatchToProps = dispatch => ({
  updateCustomerState: data => dispatch({ type: CustomerTypes.CUSTOMER_UPDATE_STATE, data }),
  updateBookingState: data => dispatch({ type: BookingTypes.BOOKING_UPDATE_STATE, data }),
  startEdit: () => dispatch({ type: CustomerTypes.CUSTOMER_START_EDIT }),
  endEdit: () => dispatch({ type: CustomerTypes.CUSTOMER_END_EDIT }),
  logout: () => dispatch({ type: CustomerTypes.LOGOUT }),
  navigate: (route) => dispatch(navigate(route)),
  refresh: () => dispatch({ type: CustomerTypes.CUSTOMER_REFRESH_DATA }),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);
