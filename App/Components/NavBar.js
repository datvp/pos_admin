import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isNull } from 'lodash/fp';
import { View, TouchableWithoutFeedback, Text, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './Styles/NavBar';

export default class NavBar extends Component {
  // Prop type warnings
  static propTypes = {
    title: PropTypes.string,
    showTitle: PropTypes.bool,
    showBackButton: PropTypes.bool,
    renderLeft: PropTypes.func,
    renderRight: PropTypes.func,
    navigation: PropTypes.object.isRequired,
    onBackPress: PropTypes.func,
  };

  static defaultProps = {
    title: '',
    showTitle: true,
    showBackButton: true,
    renderLeft: () => {},
    renderRight: () => {},
    navigation: null,
    onBackPress: null,
  }

  _onBackPress = () => {
    const { onBackPress, navigation, showBackButton } = this.props;
    if (!isNull(onBackPress) && showBackButton) {
      onBackPress();
    } else {
      navigation.goBack();
    }
    return true;
  }

  _renderBackButton = () => {
    const { showBackButton } = this.props;
    return ( showBackButton ?
      <TouchableWithoutFeedback
        onPress={this._onBackPress}>
        <View style={styles.iconBackContainer}>
          <Icon name='keyboard-backspace' style={styles.iconBack}/>
        </View>
      </TouchableWithoutFeedback> :
      null
    )
  }

  _renderControls = () => {
    const { showBackButton } = this.props;
    const controlsStyles = showBackButton ?
      styles.controlsContainer :
      [styles.controlsContainer, styles.controlContainertWithoutBackButton];
    return (
      <View style={controlsStyles}>
        <View style={styles.controlLeft}>
          { this.props.renderLeft() }
        </View>
        <View style={styles.controlRight}>
          { this.props.renderRight() }
        </View>
      </View>
    );
  }

  render() {
    const { showTitle } = this.props;
    return (
      <View
        style={styles.navBar}>
        {
          showTitle ?
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{this.props.title}</Text>
          </View> : null
        }
        { this._renderBackButton() }
        { this._renderControls() }
      </View>
    );
  }
}
