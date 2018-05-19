import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { isEmpty } from 'lodash/fp';
import { Container, Content, Form, Item, Input, Label } from 'native-base';
import Checkbox from 'react-native-custom-checkbox';
import RadioForm from 'react-native-radio-form';
import { connect } from 'react-redux';
import moment from 'moment';

import { SignupTypes } from '../Redux/Signup';
import { alert, ModalLoading, NavBar, Button, FloatingLabelInput, BirthdayPicker } from '../Components';
import { focusOnField, navigate, isEmail } from '../Helpers';
import { DATE_FORMAT, ROUTES } from '../Constants';
import { SCHEMA_NAMES } from '../Constants/Types';
import InputPhoneOTP from '../Components/InputPhoneOTP';
import styles from './Styles/SignupScreen';
import { validateOnField } from '../Validation';
const CUSTOM_VALIDATE_FIELDS = ['email'];
const mockData = [
  {
      label: 'Male',
      value: 'M'
  },
  {
      label: 'Female',
      value: 'F'
  }
];
class SignupScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isShowDatePicker: false,
    };
  }

  _updateState = (data) => {
    const len = Object.keys(data).length;
    if (len === 1) {
      let { validation = {} } = this.props.signup;
      const field = Object.keys(data)[0];
      let result;
      if (CUSTOM_VALIDATE_FIELDS.indexOf(field) >= 0 && data[field]) {
        if (!isEmail(data[field])) {
          result = { email: 'Email is invalid format' };
        }
      } else {
        // using schema
        result = validateOnField(data, SCHEMA_NAMES.SIGNUP);
        // console.tron.log('data', field);
      }
      // no error
      if (!result) {
        delete validation[field];
      } else {
        // has error
        validation = { ...validation, ...result };
      }
      if (field === 'phone') {
        console.tron.log(data[field]);
        if (data[field] === '') validation = { ...validation, [field]: 'Phone number is required' }
        data  = { ...data, sendOTP: 'show' };
      } else if (field === 'gender') {
        data  = { ...data, gender: data[field] ? 'M' : 'F' };
      }
      // append validation to original input data
      data  = { ...data, validation };
    }
    this.props.updateState(data);
  }

  _onSelect = ( item ) => {
    // console.tron.log(item);
    let { gender = 'M' } = this.props.signup;
    this.props.updateState({...this.props.signup, gender: item.value});
  };

  _onChecked = (name, checked) => {
    let { over18 = true, agreeTerm = true, validation = {} } = this.props.signup;
    // console.tron.log('name', name, checked);
    if (name ==='over18') {
      !checked && (validation = {...validation, over18: 'Please confirm that your age >= 18'});
      this.props.updateState({...this.props.signup, over18: checked, validation});
    } else if (name === 'agreeTerm') {
      !checked && (validation = {...validation, agreeTerm: 'Please confirm that agree Terms & Conditions'});
      this.props.updateState({...this.props.signup, agreeTerm: checked, validation});
    }
    // this.props.updateState({...this.props.signup, [name]: checked});
    checked && delete validation[name];
  }

  _onDateChange = (selectedDate) => {
    this.setState({ isShowDatePicker: false });
    this._updateState({ dateOfBirth: moment(selectedDate).format(DATE_FORMAT.DEFAULT) });
  }

  _onSelectCountry = () => {
    this._updateState({
      sendOTP: 'show',
    })
  }

  render() {
    const {
      name = '',
      passWord = '',
      email = '',
      phone = '',
      dateOfBirth = '',
      reTypePassWord = '',
      validation = {},
      sendOTP = 'show',
      over18 = true,
      agreeTerm = true,
      // gender = 'M',
    } = this.props.signup;
    // console.tron.log(this.props.signup);
    // console.tron.log('validation.email', validation.email, isEmpty(validation.name));
    // const isMale = gender === 'M' ? true : false;
    return (
      <Container style={styles.mainContainer}>
        <NavBar
          title='Sign Up'
          navigation={this.props.navigation}
        />
        <Content contentContainerStyle={styles.container}>
          {/* name */}
          <View>
            <FloatingLabelInput
              style={styles.input}
              ref='name'
              label='Name'
              value={name}
              onChangeText={name => this._updateState({ name })}
              showError={!isEmpty(validation.name)}
              error={validation.name}
            />
            <View style={styles.containerGenderCheckbox}>
              <RadioForm
                style={styles.renderRadio}
                dataSource={mockData}
                itemShowKey="label"
                itemRealKey="value"
                circleSize={16}
                // initial={1}
                formHorizontal={true}
                labelHorizontal={true}
                onPress={(item) => this._onSelect(item)}
              />
            </View>
          </View>
          {/* date of birth */}
          <FloatingLabelInput
            style={styles.input}
            ref='birthday'
            label='Date of birth'
            value={dateOfBirth}
            editable={false}
            onChangeText={dateOfBirth => this._updateState({ dateOfBirth })}
            onPress={() => this.setState({ isShowDatePicker: true })}
          />
          <BirthdayPicker
            isVisible={this.state.isShowDatePicker}
            date={isEmpty(dateOfBirth) ? new Date() : moment(dateOfBirth, DATE_FORMAT.DEFAULT).toDate()}
            onConfirm={this._onDateChange}
            onCancel={() => this.setState({ isShowDatePicker: false })}
          />
          <View style={styles.container18yrsOldCheckbox}>
            <Checkbox
              name='over18'
              checked={over18} 
              onChange={(name, checked) => this._onChecked(name, checked)}
            />
            <Text style={styles.text}>
              {' I am 18 yrs old'}
            </Text>
          </View>
          {validation.over18 && <Text style={styles.textErrorRight}>{validation.over18}</Text>}
          {/* email */}
          <FloatingLabelInput
            style={styles.input}
            ref='email'
            label='Email'
            keyboardType='email-address'
            value={email}
            onChangeText={email => this._updateState({ email })}
            showError={!isEmpty(validation.email)}
            error={validation.email}
          />
          {/* phone number */}
          <InputPhoneOTP
            value={phone}
            onChangePhoneNumber={phone => this._updateState({ phone })}
            placeholder='Phone Number'
            sendOTP={sendOTP}
            updateState={this._updateState}
            onSendOTP={this.props.sendOtp}
            onSelectCountry={this._onSelectCountry}
            showError={!isEmpty(validation.phone)}
            error={validation.phone}
            configs={this.props.configs}
          />
          {/* passWord */}
          <FloatingLabelInput
            style={styles.input}
            ref='pwd'
            label='Password'
            secureTextEntry
            value={passWord}
            onChangeText={passWord => this._updateState({ passWord })}
            showError={!isEmpty(validation.passWord)}
            error={validation.passWord}
          />
          {/* re-type passWord */}
          <FloatingLabelInput
            style={styles.input}
            ref='repwd'
            label='Re-Type Password'
            secureTextEntry
            value={reTypePassWord}
            onChangeText={reTypePassWord => this._updateState({ reTypePassWord })}
            showError={!isEmpty(validation.reTypePassWord)}
            error={validation.reTypePassWord}
          />
          <View style={styles.containerText}>
            <Checkbox
              name='agreeTerm'
              checked={agreeTerm} 
              onChange={(name, checked) => this._onChecked(name, checked)}
            />
            <Text style={styles.text}>{' I agree '} </Text>
            <Text
              style={styles.textLink}
              // onPress={() => this.props.navigate(ROUTES.TERMS_CONDITIONS)}
            >
              terms and conditions 
            </Text>
            <Text style={styles.text}>
              {' to sign up'}
            </Text>
            {validation.agreeTerm && <Text style={styles.textError}>{validation.agreeTerm}</Text>}
          </View>
        </Content>
        <Button
          title='Sign Up'
          titleStyle={styles.buttonTitle}
          style={styles.button}
          onPress={this.props.requestSignup}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  signup: state.signup,
  configs: state.configs
});
const mapDispatchToProps = dispatch => ({
  updateState: data => {
    dispatch({ type: SignupTypes.SIGNUP_UPDATE_STATE, data });
  },
  requestSignup: () => dispatch({ type: SignupTypes.SIGNUP }),
  navigate: (route) => dispatch(navigate(route)),
  sendOtp: () => dispatch({ type: SignupTypes.SEND_OTP }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);
