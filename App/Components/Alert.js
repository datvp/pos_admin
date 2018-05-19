import React from 'react';
import { Alert } from 'react-native';

export default alert = ({ title = '', message, neutral, negative, positive = {} }) => {
  const buttons = [{ text: positive.text ? positive.text : 'OK' , onPress: positive.onPress }];
  if (positive && negative) buttons.unshift({ text: negative.text ? negative.text : 'Cancel' , onPress: negative.onPress });
  if (positive && negative && neutral) buttons.unshift({ text: neutral.text ? neutral.text : 'Ask me later' , onPress: neutral.onPress })
  Alert.alert(
    title,
    message,
    buttons,
    { cancelable: false },
  );
};
