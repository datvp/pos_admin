import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash/fp';
import { View, Text, TextInput, Animated, TouchableWithoutFeedback } from 'react-native';

import { Colors, ApplicationStyles} from '../Themes';
import styles from './Styles/RoundedInput';

export default class RoundedInput extends PureComponent {
  render() {
    const { inputRef, style, showError, error, ...props } = this.props;

    return (
      <View style={[styles.container, style]}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          underlineColorAndroid='transparent'
          selectionColor={Colors.inputSelection}
          placeholderTextColor={Colors.textMain}
          {...props}
        />
        {showError && <Text style={styles.textError}>{error}</Text>}
      </View>
    );
  }
}
