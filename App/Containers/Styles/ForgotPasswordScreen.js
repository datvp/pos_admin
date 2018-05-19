import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles, Fonts } from '../../Themes';

export default StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.bgContainer,
  },
  container: {
    minHeight: Metrics.screenHeight - Metrics.statusBarHeight - Metrics.navBarHeight,
    justifyContent: 'space-between',
    backgroundColor: Colors.bgContainer,
  },
  topImgContainer: {
    ...ApplicationStyles.topImgContainer,
  },
  bottomImgContainer: {
    ...ApplicationStyles.bottomImgContainer,
  },
  topImg: {
    height: Metrics.topImgHeight,
  },
  bottomImg: {
    height: Metrics.bottomImgHeight,
  },
  mainContent: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 20,
  },
  forgotPasswordText: {
    ...ApplicationStyles.textBold,
    fontSize: 15,
  },
  forgotPasswordButton: {
    ...ApplicationStyles.buttonMain,
    paddingVertical: 7,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  forgotPasswordButtonText: {
    ...ApplicationStyles.textLight,
    fontWeight: 'normal',
    fontSize: 14,
  },
  logo: {
    width: Metrics.logoWidth,
    marginBottom: 20,
  },
  inputContainer: {
    width: Metrics.screenWidth * 0.7,
    marginVertical: 7,
  }
});
