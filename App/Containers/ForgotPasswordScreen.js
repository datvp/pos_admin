import React, { PureComponent } from 'react';
import { View, Text, Image, Keyboard, TouchableOpacity, TextInput } from 'react-native';
import { Container, Content } from 'native-base';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash/fp';

import { ForgotPasswordTypes } from '../Redux/ForgotPassword';
import { requestEnd } from '../Redux/AsyncRequest';
import { focusOnField, isIOS } from '../Helpers/';
import { ROUTES } from '../Constants';
import { alert, LoadingModal, Button, NavBar, RoundedInput } from '../Components';
import styles from './Styles/ForgotPasswordScreen';
import { Images, Colors } from '../Themes';

class ForgotPasswordScreen extends PureComponent {
  _updateState = (data) => {
    this.props.updateState({ ...data, validation: {} });
  }

  render() {
    const {
      forgotPassword: {
        validation = {},
        email = '',
        passWord = '',
        retypePassword = '',
      } = {},
    } = this.props;

    return (
      <Container style={styles.mainContainer}>
        <NavBar
          title='Forgot Password'
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
              resizeMode={FastImage.resizeMode.contain}
            /> */}
            <Text style={styles.forgotPasswordText}>RESET PASSWORD</Text>
            <RoundedInput
              // inputRef={ref => this.refs.email = ref}
              style={styles.inputContainer}
              placeholder='Email Id'
              value={email}
              keyboardType='email-address'
              showError={!isEmpty(validation.email)}
              error={validation.email}
              // onSubmitEditing={() => focusOnField(this, 'passWord')}
              onChangeText={email => this._updateState({ email })}
            />
            <RoundedInput
              // inputRef={ref => this.refs.passWord = ref}
              style={styles.inputContainer}
              placeholder='New Password'
              value={passWord}
              secureTextEntry
              showError={!isEmpty(validation.passWord)}
              error={validation.passWord}
              // onSubmitEditing={() => focusOnField(this, 'retypePassword')}
              onChangeText={passWord => this._updateState({ passWord })}
            />
            <RoundedInput
              // inputRef={ref => this.refs.retypePassword = ref}
              style={styles.inputContainer}
              placeholder='Retype New Password'
              value={retypePassword}
              secureTextEntry
              showError={!isEmpty(validation.retypePassword)}
              error={validation.retypePassword}
              onSubmitEditing={this.props.submitForgotPassword}
              onChangeText={retypePassword => this._updateState({ retypePassword })}
            />
            <Button
              style={styles.forgotPasswordButton}
              titleStyle={styles.forgotPasswordButtonText}
              onPress={this.props.submitForgotPassword}
              title='Reset Password'
            />
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

const mapStateToProps = (state) => {
  const { forgotPassword } = state;
  return { forgotPassword };
};

const mapDispatchToProps = (dispatch) => ({
  updateState: data => dispatch({ type: ForgotPasswordTypes.FORGOT_PASSWORD_UPDATE_STATE, data}),
  submitForgotPassword: () => {
    Keyboard.dismiss();
    dispatch({ type: ForgotPasswordTypes.FORGOT_PASSWORD });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreen);
