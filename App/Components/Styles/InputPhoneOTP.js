import { StyleSheet } from 'react-native';
import { Colors, ApplicationStyles } from '../../Themes';

export default StyleSheet.create({
  container: {
    paddingTop: 18,
    paddingBottom: 6,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  containerSendOTP: {
    position: 'absolute',
    top: 18,
    right: 0,
  },
  containerVerify: {
    alignItems: 'flex-end',
  },
  inputVerify: {
    ...ApplicationStyles.textInput,
    minWidth: 100,
    maxWidth: 100,
    padding: 0,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  textSend: {
    ...ApplicationStyles.textEmphasis,
  },
  textError: {
    ...ApplicationStyles.textEmphasis,
    fontSize: 14,
  }
});
