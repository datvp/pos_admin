import React, { PureComponent } from 'react';
import { isEmpty } from 'lodash/fp';
import { View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { Input } from 'react-native-elements';
import { Container, Header, Content, Form, Item, Label } from 'native-base';
import { connect } from 'react-redux';
import { FBLoginManager } from 'react-native-facebook-login';
import { GoogleSignin } from 'react-native-google-signin';

import { alert, Button, NavBar, RoundedInput } from '../Components';
import { Metrics, Images, Colors } from '../Themes/';
import { navigate, focusOnField } from '../Helpers';
import { LoginTypes } from '../Redux/Login';
import { ROUTES, ACCOUNTS, SOCIAL_NAME } from '../Constants';

// Styles
import styles from './Styles/LoginScreen';

GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
  // play services are available. can now configure library
  })
  .catch((err) => {
  console.tron.log("Play services error", err.code, err.message);
})

GoogleSignin.configure({
  iosClientId: "392548505086-5aqsjo1bmq6t97c2uq6buatdsqb2b3e0.apps.googleusercontent.com", // only for iOS
  // forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login
  // accountName: '', // [Android] specifies an account name on the device that should be used
})
.then(() => {
  // you can now call currentUserAsync()
});

class LoginScreen extends PureComponent {
  _handleLoginFacebook = () => {
    const _this = this;
    FBLoginManager.loginWithPermissions(["email", "user_friends", "public_profile"], function(error, data){
      if (!error) {
        _this.props.loginSocialAccount({ dataSocial: data, socialName: SOCIAL_NAME.FACEBOOK });
      } else {
        console.tron.log(error);
      }
    })
  }

  _updateState = (data) => {
    this.props.updateState({ ...data, validation: {} });
  }

  _loginGoogle = () => {
    GoogleSignin.signIn()
    .then((data) => {
      this.props.loginSocialAccount({ dataSocial: data, socialName: SOCIAL_NAME.GOOGLE });
    })
    .catch((err) => {
      console.tron.log(err);
    })
    .done();
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
            {/* <FastImage
              source={Images.loginTop}
              style={styles.topImg}
              resizeMode={FastImage.resizeMode.contain}/> */}
          </View>
          <View style={styles.mainContent}>
            {/* <FastImage
              source={Images.logo}
              style={styles.logo}
              resizeMode={FastImage.resizeMode.contain}/> */}
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
            <Text>OR</Text>
            <Button
              style={styles.signupButton}
              titleStyle={styles.signupButtonText}
              title='Signup'
              onPress={() => this.props.navigate(ROUTES.SIGNUP)}
            />
            <View style={styles.connectWith}>
              <View style={ styles.divider }/>
              <Text style={styles.connectText}>Connect with</Text>
              <View style={ styles.divider }/>
            </View>
            <View style={styles.socialView}>
              <TouchableOpacity
                onPress={this._handleLoginFacebook}
              >
                {/* <FastImage
                  source={Images.facebookIcon}
                  style={styles.socialIcon}
                  resizeMode={FastImage.resizeMode.contain}
                /> */}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this._loginGoogle}
              >
                {/* <FastImage
                  source={Images.googleIcon}
                  style={styles.socialIcon}
                  resizeMode={FastImage.resizeMode.contain}
                /> */}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.bottomImgContainer}>
            {/* <FastImage
              source={Images.loginBottom}
              style={styles.bottomImg}
              resizeMode={FastImage.resizeMode.contain}/> */}
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
    updateState: data => {
      dispatch({ type: LoginTypes.LOGIN_UPDATE_STATE, data });
    },
    login: () => {
      Keyboard.dismiss();
      dispatch({ type: LoginTypes.LOGIN });
    },
    loginSocialAccount: (data) => {
      dispatch({ type: LoginTypes.LOGIN_SOCIAL, data });
    },
    navigate: (route) => dispatch(navigate(route)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
