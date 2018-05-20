import React, { PureComponent } from 'react';
import { isEmpty } from 'lodash/fp';
import { View, Text, TouchableOpacity, Keyboard } from 'react-native';
import { Container, Content } from 'native-base';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';

import { Button, NavBar, RoundedInput } from '../Components';
import { Images } from '../Themes/';
import { navigate, focusOnField } from '../Helpers';
import { LoginTypes } from '../Redux/Login';
import { ROUTES } from '../Constants';
import { SCHEMA_NAMES } from '../Constants/Types';
import { validateOnField } from '../Validation';

import styles from './Styles/LoginScreen';

class LoginScreen extends PureComponent {
  _updateState = (data) => {
    const len = Object.keys(data).length;
    if (len === 1) {
      let { validation = {} } = this.props;
      const field = Object.keys(data)[0];
      const result = validateOnField(data, SCHEMA_NAMES.LOGIN);
      // no error
      if (!result) {
        delete validation[field];
      } else {
        // has error
        validation = { ...validation, ...result };
      }
      // append validation to original input data
      data  = { ...data, validation };
    }
    this.props.updateState(data);
  }

  render() {
    const {
      userName = '',
      passWord = '',
      validation = '',
    } = this.props;
    return (
      <Container style={styles.mainContainer}>
        <NavBar
          title='Login'
          navigation={this.props.navigation}
        />
        <Content contentContainerStyle={styles.container} bounces={false}>
          <View style={styles.topImgContainer}>
            <FastImage
              source={Images.loginTop}
              style={styles.topImg}
              resizeMode={FastImage.resizeMode.contain}/>
          </View>
          <View style={styles.mainContent}>
            <FastImage
              source={Images.logo}
              style={styles.logo}
              resizeMode={FastImage.resizeMode.contain}/>
            <Text style={styles.signinText}>SIGN IN</Text>
            <RoundedInput
              // inputRef={ref => this.refs.email = ref}
              style={styles.inputContainer}
              placeholder='User Name'
              value={userName}
              keyboardType='email-address'
              showError={!isEmpty(validation.userName)}
              error={validation.userName}
              // onSubmitEditing={() => focusOnField(this, 'passWord')}
              onChangeText={userName => this._updateState({ userName })}
            />
            <RoundedInput
              // inputRef={ref => this.refs.email = ref}
              style={styles.inputContainer}
              placeholder='Password'
              value={passWord}
              secureTextEntry
              showError={!isEmpty(validation.passWord)}
              error={validation.passWord}
              onSubmitEditing={this.props.login}
              onChangeText={passWord => this._updateState({ passWord })}
            />
            <TouchableOpacity style={styles.forgotPwButton} onPress={() => this.props.navigate(ROUTES.FORGOT_PASSWORD)}>
              <View style={styles.forgotPwTextWrapper}>
                <Text style={styles.forgotPwText}>
                  Forgot Password
                </Text>
              </View>
            </TouchableOpacity>
            <Button
              style={styles.loginButton}
              titleStyle={styles.loginButtonText}
              title='Login'
              onPress={this.props.login}
            /> 
          </View>
          <View style={styles.bottomImgContainer}>
            <FastImage
              source={Images.loginBottom}
              style={styles.bottomImg}
              resizeMode={FastImage.resizeMode.contain}/>
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const { login, asyncRequest } = state;
  return {
    ...login,
    ...asyncRequest,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updateState: data => dispatch({ type: LoginTypes.LOGIN_UPDATE_STATE, data }),
    navigate: (route) => dispatch(navigate(route)),
    login: () => {
      Keyboard.dismiss();
      dispatch({ type: LoginTypes.LOGIN });
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
