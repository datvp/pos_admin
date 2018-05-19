import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Modal } from 'react-native';
import Spinner from 'react-native-spinkit';

import { isAndroid } from '../Helpers/';
import { Colors, Metrics } from '../Themes';
import styles from './Styles/ModalLoading';

export default class ModalLoading extends Component {
  // Prop type warnings
  static propTypes = {
    visible: PropTypes.bool.isRequired,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.visible && !this.props.visible && isAndroid()) {
      this.props.onDismiss();
    }
  }

  render() {
    return (
      <Modal
        style={styles.modal}
        visible={this.props.visible}
        animationType='fade'
        transparent
        onDismiss={this.props.onDismiss}
        onRequestClose={() => { }}>
        <View style={styles.container}>
          <Spinner
            isVisible={true}
            color={Colors.spinnerMain}
            size={Metrics.spinner}
            type='Wave'
          />
        </View>
      </Modal>
    );
  }
}
