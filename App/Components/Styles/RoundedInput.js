import { StyleSheet } from 'react-native';
import { Colors, Metrics, ApplicationStyles } from '../../Themes';

export default StyleSheet.create({
  container: {
    // backgroundColor: 'red',
  },
  input: {
    ...ApplicationStyles.textInput,
    backgroundColor: Colors.bgTextInput,
    borderColor: 'transparent',
    borderRadius: Metrics.inputRadius,
    paddingHorizontal: 20,
    paddingVertical: 5,
    textAlign: 'center',
    // width: 200,
  },
  textError: {
    ...ApplicationStyles.textEmphasis,
    fontSize: 14,
    marginTop: 5,
  }
});
