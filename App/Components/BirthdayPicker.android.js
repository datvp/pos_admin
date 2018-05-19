import React, { Component } from 'react';
import { DatePickerAndroid } from 'react-native';

export default class BirthdayPicker extends Component {
  constructor(props) {
    super(props);
  }

  showDatePicker = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: this.props.date,
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        let date = new Date(year, month, day);
        this.props.onConfirm(date);
      } else {
        this.props.onCancel();
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  };

  render() {
    if (this.props.isVisible) {
      this.showDatePicker();
    }
    return null;
  }
}
