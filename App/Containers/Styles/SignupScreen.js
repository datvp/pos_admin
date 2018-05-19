import { StyleSheet } from 'react-native';
import { Metrics, ApplicationStyles, Colors } from '../../Themes/';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.bgContainer,
  },
  container: {
    paddingHorizontal: Metrics.sectionPaddingHor,
    paddingTop: Metrics.sectionPaddingVer,
    paddingBottom: Metrics.sectionPaddingVer + 50,
    backgroundColor: Colors.bgContainer,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginBottom: 10,
  },
  button: {
    ...ApplicationStyles.buttonAction,
    position: 'absolute',
    right:0,
    left: 0,
    bottom: 0,
  },
  buttonTitle: {
    ...ApplicationStyles.textAction,
  },
  containerGenderCheckbox: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    // alignItems:'flex-end',
    position: 'absolute',
    marginTop: 10,
    right: 0,
    // left: 100,
  },
  renderRadio: {
    width: 180,
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    position: 'absolute',
    right: 0
  },
  container18yrsOldCheckbox: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
  },
  containerText: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  text: {
    ...ApplicationStyles.textMain,
  },
  textLink: {
    ...ApplicationStyles.textLink,
    textDecorationLine: 'underline',
  },
  textError: {
    ...ApplicationStyles.textEmphasis,
    fontSize: 14,
  },
  textErrorRight: {
    ...ApplicationStyles.textEmphasis,
    fontSize: 14,
    right: 0
  }
});
