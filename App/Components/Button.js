import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, View } from 'react-native';

import styles from './Styles/Button';

export default class Button extends Component {
  // Prop type warnings
  static propTypes = {
    title: PropTypes.string.isRequired,
    titleStyle: PropTypes.any,
    disableTitle: PropTypes.string,
    disableTitleStyle: PropTypes.any,
    style: PropTypes.any,
    disableStyle: PropTypes.any,
    onPress: PropTypes.func,
    disable: PropTypes.bool,
  };

  static defaultProps = {
    title: 'Button',
    disable: false,
  }

  render() {
    const {
      disable,
      onPress,
      style,
      disableStyle,
      title,
      disableTitle,
      titleStyle,
      disableTitleStyle
    } = this.props;

    return (
      disable ?
      (
        <View style={[style, styles.buttonDisable, disableStyle]}>
          <Text
            style={[titleStyle, disableTitleStyle]}
            numberOfLines={1}>
            {disableTitle || title}
          </Text>
        </View>
      ) :
      (
        <TouchableOpacity style={style} onPress={onPress}>
          <Text
            style={titleStyle}
            numberOfLines={1}>
            {title}
          </Text>
        </TouchableOpacity>
      )
    );
  }
}
