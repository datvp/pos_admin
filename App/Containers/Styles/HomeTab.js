import { StyleSheet } from 'react-native';
import { Metrics, ApplicationStyles, Colors } from '../../Themes/';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.bgScreen,
  },
  sectionContainer: {
    paddingHorizontal: Metrics.sectionPaddingHor,
    paddingTop: Metrics.sectionPaddingVer,
  },
  sectionDetailContainer: {
    backgroundColor: Colors.bgContainer,
  },
  mainSection: {
    backgroundColor: Colors.bgContainer,
    paddingHorizontal: Metrics.sectionPaddingHor,
    paddingVertical: 10,
    marginBottom: Metrics.sectionMargin,
  },
  searchBar: {
    elevation: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerRowLeftText: {
    ...ApplicationStyles.textMain,
    fontSize: 14,
  },
  headerRowRightText: {
    ...ApplicationStyles.textGray,
    fontSize: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.bgContainer,
    marginVertical: Metrics.sectionMargin,
  },
  itemListContainer: {
    paddingVertical: 5,
  },
  textNoItems: {
    ...ApplicationStyles.textEmphasis,
    paddingVertical: 20,
    fontSize: 16,
  },
  itemContainer: {
    width: 100,
    padding: 0,
  },
  listSeparator: {
    width: 20,
  },
  itemImage: {
    width: 100,
    height: 100,
  },
  itemContent: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitle: {
    ...ApplicationStyles.textBold,
    fontSize: 16,
    textAlign: 'center',
  },
  itemContentText: {
    ...ApplicationStyles.textMain,
    fontSize: 10,
  },
  textBorderTop: {
    fontWeight: 'bold',
    color: '#9e826a',
    position: 'absolute',
    top: -20,
    textAlign: 'center',
  },
  textBorderBottom: {
    fontWeight: 'bold',
    color: '#9e826a',
    position: 'absolute',
    bottom: -6,
    textAlign: 'center',
  },
});
