import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  DatePickerIOS,
  TouchableOpacity,
} from 'react-native';
import styles from './Styles/BirthdayPicker';

export default class BirthdayPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: this.props.isVisible,
      selectedDate: this.props.date,
    };
  }

  render() {
    return (
      <Modal
        visible={this.props.isVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={this.props.onCancel}
      >
        <View style={styles.modal}>
          <View style={styles.container}>
            <View style={styles.confirmContainer}>
              <TouchableOpacity
                style={styles.touchable}
                onPress={this.props.onCancel}
              >
                <View style={styles.buttonCancel}>
                  <Text>Cancel</Text>
                </View>
              </TouchableOpacity>
              <View>
                <Text>Birthday</Text>
              </View>
              <TouchableOpacity
                style={styles.touchable}
                onPress={() => this.props.onConfirm(this.state.selectedDate)}
              >
                <View style={styles.buttonDone}>
                  <Text >Done</Text>
                </View>
              </TouchableOpacity>
            </View>
            <DatePickerIOS
              style={styles.datePicker}
              date={this.state.selectedDate}
              mode="date"
              onDateChange={selectedDate => this.setState({ selectedDate })}
            />
          </View>
        </View>
      </Modal>
    );
  }
}
