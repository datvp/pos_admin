import { StyleSheet } from 'react-native';
import { Metrics, ApplicationStyles, Colors } from '../../Themes/';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.bgScreen,
  },
  container: {
    paddingHorizontal: Metrics.sectionPaddingHor,
    paddingVertical: Metrics.sectionPaddingVer,
    backgroundColor: Colors.bgContainer,
  },
});
