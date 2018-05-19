import { StyleSheet } from 'react-native';
import { Colors, ApplicationStyles } from '../../Themes';

export default StyleSheet.create({
  container: {
    paddingTop: 18,
  },
  input: {
    ...ApplicationStyles.textInput,
    padding: 0,
  },
  textError: {
    ...ApplicationStyles.textEmphasis,
    fontSize: 14,
  }
});
