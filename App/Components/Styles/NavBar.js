import { StyleSheet } from 'react-native';
import { Colors, Metrics, ApplicationStyles } from '../../Themes';

export default StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    backgroundColor: Colors.bgNavBar,
    height: Metrics.navBarHeight,
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  titleContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...ApplicationStyles.textHeader,
  },
  iconBackContainer: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Metrics.sectionPaddingHor,
  },
  iconBack: {
    ...ApplicationStyles.iconHeader,
  },
  iconMenu: {
    ...ApplicationStyles.iconHeader,
    fontSize: 30,
  },
  controlsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    marginRight: Metrics.sectionPaddingHor,
  },
  controlContainertWithoutBackButton: {
    marginLeft: Metrics.sectionPaddingHor,
  },
  controlLeft: {
    flexDirection: 'row',
    alignItems: 'stretch',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
  },
  controlRight: {
    flexDirection: 'row',
    alignItems: 'stretch',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
  }
});
