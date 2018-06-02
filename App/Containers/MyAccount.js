import React, { PureComponent } from 'react';
import { isEmpty } from 'lodash/fp';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';

import { alert } from '../Components';
import { Images } from '../Themes';
import { CustomerTypes } from '../Redux/Customer';
import styles from './Styles/MyAccount';

class MyAccount extends PureComponent {
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

  _renderRow = ({ title, value }) => {
    return (
      <View style={styles.sectionItem}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionValue}>{value}</Text>
      </View>
    );
  }

  _renderLoggedInContent = () => {
    const {
      credential: { token },
      asyncRequest: { reqSending } = {},
      login: {
        accountName= '',
        pwd= '',
        avatar= '',
        empId= '',
        empName= '',
        phone= '',
        email= '',
        birthday= '',
      }
    } = this.props;

    return (
      <ScrollView
        contentContainerStyle={styles.container}
        bounces={false}
      >
        <View style={styles.avatarContainer}>
          <FastImage
            style={styles.avatar}
            source={isEmpty(avatar) ? Images.avatarDefault : { uri: avatar }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
        <Text style={styles.sectionHeader}>Personal Information</Text>
        { this._renderRow({ title: 'Name', value: empName }) }
        { this._renderRow({ title: 'Employee ID', value: empId }) }
        { this._renderRow({ title: 'Birthday', value: birthday }) }
        { this._renderRow({ title: 'Email', value: email }) }
        { this._renderRow({ title: 'Mobile', value: phone }) }
        { this._renderRow({ title: 'Account', value: accountName }) }
        { this._renderRow({ title: 'Password', value: '**********' }) }
        <Text style={styles.sectionHeader}>Addresses</Text>
        <TouchableOpacity onPress={this._confirmLogout}>
          <View style={styles.sectionItem}>
            <Text style={styles.textLogout}>Logout</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  render() {
    return (
      <Container style={styles.mainContainer}>
        { this._renderLoggedInContent() }
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const { credential, asyncRequest, login } = state;
  return { credential, asyncRequest, login };
};
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch({ type: CustomerTypes.LOGOUT }),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);
