import { StyleSheet } from 'react-native';
import { Metrics, ApplicationStyles, Colors } from '../../Themes/';

export default StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.bgContainer,
  },
  container: {
    minHeight: Metrics.screenHeight - Metrics.statusBarHeight - Metrics.navBarHeight,
  },
  logo: {
    width: Metrics.logoWidth,
    marginBottom: 20,
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
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    paddingHorizontal: 30,
  },
  signinText: {
    ...ApplicationStyles.textBold,
    fontSize: 15,
  },
  inputContainer: {
    width: Metrics.screenWidth * 0.7,
    marginVertical: 7,
  },
  forgotPwButton: {
    alignSelf: 'flex-end',
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  forgotPwTextWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.textMain
  },
  forgotPwText: {
    ...ApplicationStyles.textMain,
    letterSpacing: 0.03,
    fontSize: 12,
  },
  loginButton: {
    ...ApplicationStyles.buttonMain,
    paddingVertical: 7,
    paddingHorizontal: 30,
    marginVertical: 8,
  },
  divider: {
    marginHorizontal: 5,
    width: 60,
    height: 2,
    backgroundColor: Colors.divider,
  },
  loginButtonText: {
    ...ApplicationStyles.textLight,
    fontWeight: 'normal',
    fontSize: 14,
  },
  signupButton: {
    ...ApplicationStyles.buttonMain,
    paddingVertical: 7,
    paddingHorizontal: 40,
    marginVertical: 8,
  },
  signupButtonText: {
    ...ApplicationStyles.textLight,
    fontWeight: 'normal',
    fontSize: 14,
  },
  verticalDivider: {
    textAlign: 'center',
    fontSize: 14,
    color: Colors.divider,
  },
  socialView: {
    flexDirection: 'row',
  },
  socialIcon: {
    width: 30,
    height: 30,
    marginVertical: 5,
    marginHorizontal: 15,
  },
  connectWith: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    marginVertical: 10,
  },
  connectText: {
    color: Colors.textGray,
  }
});
