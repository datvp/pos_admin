import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash/fp';
import { View, Text, TextInput, Animated, TouchableWithoutFeedback } from 'react-native';

import { Colors, ApplicationStyles} from '../Themes';
import styles from './Styles/FloatingLabelInput';

  export default class FloatingLabelInput extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
    }
  }

  _onFocus = () => this.setState({ isFocused: true })

  _onBlur = () => this.setState({ isFocused: false })

  componentWillMount() {
    const { value = '' } = this.props;
    this._animatedIsFocused = new Animated.Value(isEmpty(value) ? 0 : 1);
  }

  componentDidUpdate() {
    const { value = '' } = this.props;
    Animated.timing(this._animatedIsFocused, {
      toValue: (this.state.isFocused || !isEmpty(value)) ? 1 : 0,
      duration: 200,
    }).start();
  }

  render() {
    const { label, style, showError, error, onPress, ...props } = this.props;
    const { isFocused } = this.state;

    const labelStyle = {
      ...ApplicationStyles.textInput,
      position: 'absolute',
      top: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [20, 0],
      }),
      left: 0,
      fontSize: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [ApplicationStyles.textInput.fontSize, ApplicationStyles.textInput.fontSize * 0.8],
      }),
    }

    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.container}>
          <Animated.Text style={labelStyle}>{label}</Animated.Text>
          <TextInput
          {...props}
          style={[styles.input, style]}
          underlineColorAndroid='transparent'
          selectionColor={Colors.inputSelection}
          onFocus={this._onFocus}
          onBlur={this._onBlur}
          />
          {showError && <Text style={styles.textError}>{error}</Text>}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
