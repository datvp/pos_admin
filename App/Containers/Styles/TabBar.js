import { StyleSheet } from 'react-native';
import { Colors, Metrics, ApplicationStyles, Fonts } from '../../Themes';

export default StyleSheet.create({
  tabContainer: {
    backgroundColor: Colors.bgScreen,
    height: Metrics.topBarHeight,
    elevation: 0,
  },
  tabBorderRight: {
    borderRightWidth: 1,
    borderColor: Colors.borderGray,
  },
  activeTabContainer: {
    backgroundColor: Colors.bgScreen,
    height: Metrics.topBarHeight,
    elevation: 0,
  },
  tabTitle: {
    fontFamily: Fonts.type.base,
    letterSpacing: 0.03,
    color: Colors.textMain,
    fontWeight: 'normal',
    fontSize: 12,
  },
  activeTabTitle: {
    fontFamily: Fonts.type.base,
    letterSpacing: 0.03,
    color: Colors.textMain,
    fontWeight: 'bold',
    fontSize: 12,
  },
  underline: {
    backgroundColor: '#4A91E3',
    height: 2,
  }
});
