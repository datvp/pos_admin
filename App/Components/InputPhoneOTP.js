import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import PhoneInput from 'react-native-phone-input';
import { Colors, ApplicationStyles} from '../Themes';
import { isEmpty } from 'lodash/fp';
import styles from './Styles/InputPhoneOTP';

export default class InputPhoneOTP extends PureComponent {
  constructor(props) {
    super(props);
  }

  _renderSendOTP = () => {
    const { sendOTP, onSendOTP } = this.props;
    return (
      <View style={styles.containerSendOTP}> 
        <Text onPress={onSendOTP} style={styles.textSend}>Send OTP</Text>
      </View>
    )
  }

  _renderEditOTP = () => {
    const { sendOTP, onSendOTP } = this.props;
    return (
      <View style={styles.containerSendOTP}> 
        <Text onPress={onSendOTP} style={styles.textSend}>Re-send</Text>
      </View>
    )
  }

  render() {
    const {
      sendOTP, placeholder, value, updateState,
      onSelectCountry, showError, error, onChangePhoneNumber,
      configs: {
        countries = [],
      } = {},
    } = this.props;

    return (
      <View>
        <View style={styles.container}>
          <PhoneInput
            ref={ref => {
              this.phone = ref;
            }}
            initialCountry="us"
            textProps={{ placeholder: placeholder || '' }}
            onChangePhoneNumber={onChangePhoneNumber}
            value={value}
            countriesList={countries}
            onSelectCountry={onSelectCountry}
          />
          {
            sendOTP === 'show' ? this._renderSendOTP() : this._renderEditOTP()
          }
        </View>
        {
          sendOTP !== 'show' ?
            <View style={styles.containerVerify}>
              <TextInput
                style={styles.inputVerify}
                placeholder='Otp code'
                underlineColorAndroid='transparent'
                onChangeText={otpInput => updateState({ otpInput })}
              />
            </View>
          : <View></View>
        }
        {showError && <Text style={styles.textError}>{error}</Text>}
      </View>
    );
  }
}