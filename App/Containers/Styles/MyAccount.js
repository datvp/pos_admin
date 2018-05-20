import { StyleSheet } from 'react-native';
import { Metrics, ApplicationStyles, Colors } from '../../Themes/';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.bgScreen,
  },
  container: {
    paddingBottom: Metrics.sectionPaddingVer,
    backgroundColor: Colors.bgScreen,
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 25,
    paddingBottom: 40,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  sectionHeader: {
    ...ApplicationStyles.textBold,
    paddingHorizontal: Metrics.sectionPaddingHor,
    fontSize: 16,
    marginVertical: 10,
  },
  sectionItem: {
    flexDirection: 'row',
    backgroundColor: Colors.bgContainer,
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.sectionPaddingHor,
    paddingVertical: 12,
    marginVertical: 1,
  },
  sectionTitle: {
    ...ApplicationStyles.textMain,
    fontSize: 14,
    flex: 1,
    marginRight: 20,
  },
  sectionValue: {
    ...ApplicationStyles.textBold,
    fontSize: 14,
    flex: 3,
    textAlign: 'right',
  },
  textLogout: {
    ...ApplicationStyles.textBold,
    fontSize: 14,
  },
  headerRightContainer: {
    justifyContent: 'center',
    paddingLeft: Metrics.sectionPaddingHor,
  },
  textHeader: {
    ...ApplicationStyles.textHeader,
  },
});
