import { StyleSheet } from 'react-native';
import { Colors } from '../../Themes';

export default StyleSheet.create({
  modal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: Colors.bgModal,
  },
  container: {
    backgroundColor: 'white',
  },
  datePicker: {
    borderBottomWidth: 0.5,
  },
  confirmContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    height: 30,
  },
  touchable: {
    flex: 1,
  },
  buttonDone: {
    position: 'absolute',
    right: 15,
  },
  buttonCancel: {
    position: 'absolute',
    left: 15,
  }
});
