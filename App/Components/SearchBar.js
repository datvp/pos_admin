import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, Text, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-spinkit';

import { Colors, Metrics } from '../Themes';
import styles from './Styles/SearchBar';

export default class SearchBar extends Component {
  // Prop type warnings
  static propTypes = {
    onSubmit: PropTypes.func,
    showLoading: PropTypes.bool,
    style: PropTypes.any
  };

  static defaultProps = {
    onSubmit: undefined,
    showLoading: false,
    style: undefined,
  }

  render() {
    const { onSubmit, showLoading, style, ...props } = this.props;

    const containerStyle = showLoading ?
      [styles.container, style] :
      [styles.container, styles.containerLoading, style];
    return (
      <View style={containerStyle}>
        <TouchableWithoutFeedback onPress={onSubmit}>
          <View style={styles.iconContainer}>
            <Icon name='md-search' style={styles.iconSearch} />
          </View>
        </TouchableWithoutFeedback>
        <TextInput
          { ...props }
          style={styles.input}
          underlineColorAndroid='transparent'
          selectionColor={Colors.inputSelection}
          onSubmitEditing={onSubmit}
        />
        {
          showLoading &&
          <View style={styles.iconContainer}>
            <Spinner
              isVisible={true}
              color={Colors.textMain}
              size={20}
              type='Circle'
            />
          </View>
        }
      </View>
    );
  }
}
