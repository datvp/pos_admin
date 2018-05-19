import { StyleSheet } from 'react-native';
import { Fonts, Colors, Metrics, ApplicationStyles } from '../../Themes/';

export default StyleSheet.create({
  bottomTabBar: {
    backgroundColor: Colors.bgContainer,
  },
  bottomTabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 54,
    paddingHorizontal: 0,
  },
  bottomTabLabel: {
    fontFamily: Fonts.type.base,
    letterSpacing: 0.03,
    fontSize: 10,
    marginTop: 0,
    marginBottom: 0,
  },
  bottomTabIcon: {
    fontSize: 16,
  },
  bottomTabIndicator: {
    backgroundColor: Colors.activeBottomTab,
  }
});
