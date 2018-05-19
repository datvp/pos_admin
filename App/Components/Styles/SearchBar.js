import { StyleSheet } from 'react-native';
import { Colors, Metrics, ApplicationStyles } from '../../Themes';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: Colors.bgSearchBar,
  },
  containerLoading: {
    paddingRight: Metrics.sectionPaddingHor,
  },
  iconContainer: {
    paddingHorizontal: Metrics.sectionPaddingHor,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconSearch: {
    fontSize: 20,
    color: Colors.textMain,
  },
  input: {
    flex: 1,
    padding: 0,
  }
});
