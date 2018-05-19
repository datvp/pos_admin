import React, { Component } from 'react';
import { ScrollView, Text, Image, View } from 'react-native';
import Spinner from 'react-native-spinkit';

import { Colors, Metrics } from '../Themes';
import { CustomIcon } from '../Components';

// Styles
import styles from './Styles/LaunchScreen';

export default class LaunchScreen extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <Spinner
          isVisible={true}
          color={Colors.spinnerLight}
          size={Metrics.spinner}
          type='Wave'
        />
        <Text style={styles.text}>Launching . . .</Text>
      </View>
    );
  }
}
