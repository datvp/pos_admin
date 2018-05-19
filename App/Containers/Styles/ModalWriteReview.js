import { StyleSheet } from 'react-native';
import { Colors, Metrics, ApplicationStyles } from '../../Themes';

export default StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.bgModal,
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
  },
  container: {
    backgroundColor: Colors.bgContainer,
    alignItems: 'flex-start',
    width: Metrics.screenWidth * 0.9,
    paddingHorizontal: Metrics.sectionPaddingHor,
    paddingVertical: Metrics.sectionPaddingVer,
    paddingBottom: 70,
  },
  closeIcon: {
    fontSize: 25,
    position: 'absolute',
    top: 0,
    right: 5,
    color: 'black',
    zIndex: 1000,
  },
  textName: {
    ...ApplicationStyles.textMain,
  },
  textDes: {
    ...ApplicationStyles.textMain,
    borderColor: 'black',
    borderWidth: 1,
    width: Metrics.screenWidth * 0.9 - Metrics.sectionPaddingHor * 2,
    textAlignVertical: 'top',
    maxHeight: 100,
    marginTop: 10,
  },
  itemContainArtistInfo: {
    flexDirection: 'row',
  },
  itemContainDescription: {
    paddingTop: Metrics.sectionPaddingHor,
  },
  itemContainRating: {
    paddingTop: Metrics.sectionPaddingHor,
    flexDirection: 'row',
  },
  containerButton: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    justifyContent: 'space-between',
  },
  buttonMain: {
    ...ApplicationStyles.buttonAction,
    borderRadius: 0,
    flex: 1,
  },
  buttonCancel: {
    ...ApplicationStyles.buttonAction,
    backgroundColor: Colors.textGray,
    borderRadius: 0,
    flex: 1,
  },
  buttonTitle: {
    ...ApplicationStyles.textAction,
    textAlign: 'center',
  },
  starStyle: {
    marginTop: -3,
    fontSize: 25,
    alignItems: 'center',
    color: Colors.starReview,
  },
  errorText: {
    ...ApplicationStyles.textEmphasis,
  },
});
