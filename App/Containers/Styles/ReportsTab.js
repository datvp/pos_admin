import { StyleSheet } from 'react-native';
import { Metrics, ApplicationStyles, Colors } from '../../Themes/';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.bgContainer,
  },
  tabContainer: {
    backgroundColor: Colors.bgContainer,
    height: Metrics.topBarHeight,
    elevation: 0,
  },
  itemGroupContainer: {
    paddingHorizontal: Metrics.sectionPaddingHor,
    paddingVertical: Metrics.sectionPaddingVer,
    borderBottomWidth: 1,
    borderColor: Colors.borderGray,
  },
  itemTitle: {
    ...ApplicationStyles.textBold,
    fontSize: 14,
  },
  itemContainer: {
    flexDirection: 'row',
  },
  itemContainerCompleted: {
    flexDirection: 'row',
    flex: 3,
  },
  itemImage: {
    height: 90,
    flex: 1,
    alignSelf: 'center',
  },
  itemSubContain: {
    paddingHorizontal: Metrics.sectionPaddingHor,
    flex: 3
  },
  itemContainDescription: {
    flexDirection: 'row',
  },
  itemDescription: {
    ...ApplicationStyles.textMain,
  },
  itemStatus: {
    ...ApplicationStyles.textEmphasis,
  },
  textNoBooking: {
    paddingHorizontal: Metrics.sectionPaddingHor,
    paddingVertical: Metrics.sectionPaddingVer,
    alignSelf: 'center',
  }
});
