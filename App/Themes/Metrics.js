import { Dimensions, StatusBar } from 'react-native';

import { isIOS } from '../Helpers/';

const { width, height } = Dimensions.get('window');
const screenWidth = width < height ? width : height;
const screenHeight = width < height ? height : width;

// Used via Metrics.baseMargin
const metrics = {
  screenWidth: screenWidth,
  screenHeight: screenHeight,

  statusBarHeight: isIOS() ? 20 : StatusBar.currentHeight,
  navBarHeight: 40,
  topBarHeight: 40,
  bottomBarHeight: 54,

  sectionMargin: 15,
  sectionPaddingHor: 15,
  sectionPaddingVer: 15,

  buttonRadius: 100,
  inputRadius: 100,
  logoWidth: 200,
  topImgHeight: 180,
  bottomImgHeight:  130,
  spinner: 40,
};

export default metrics;
