import Fonts from './Fonts';
import Metrics from './Metrics';
import Colors from './Colors';

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
  textMain: {
    fontFamily: Fonts.type.base,
    letterSpacing: 0.03,
    color: Colors.textMain,
  },
  textLink: {
    fontFamily: Fonts.type.base,
    letterSpacing: 0.03,
    color: Colors.textLink,
  },
  textLinkOrange: {
    fontFamily: Fonts.type.base,
    letterSpacing: 0.03,
    color: Colors.textLinkOrange,
  },
  textLight: {
    fontFamily: Fonts.type.base,
    letterSpacing: 0.03,
    color: Colors.textLight,
  },
  textGray: {
    fontFamily: Fonts.type.base,
    letterSpacing: 0.03,
    color: Colors.textGray,
  },
  textBold: {
    fontFamily: Fonts.type.bold,
    letterSpacing: 0.03,
    color: Colors.textMain,
  },
  textEmphasis: {
    fontFamily: Fonts.type.base,
    letterSpacing: 0.03,
    color: Colors.textEmphasis,
  },
  textHeader: {
    fontFamily: Fonts.type.base,
    letterSpacing: 0.03,
    color: Colors.textLight,
    fontSize: 14,
    fontWeight: 'normal',
  },
  textInput: {
    fontFamily: Fonts.type.base,
    letterSpacing: 0.03,
    color: Colors.textMain,
    fontSize: 16,
  },
  textAction: {
    fontFamily: Fonts.type.base,
    letterSpacing: 0.03,
    color: Colors.textLight,
    fontSize: 14,
    fontWeight: 'normal',
  },
  textSub: {
    fontFamily: Fonts.type.base,
    letterSpacing: 0.03,
    color: Colors.textSub,
  },

  iconHeader: {
    color: Colors.textLight,
    fontSize: 16,
  },
  buttonMain: {
    backgroundColor: Colors.bgButton,
    borderRadius: Metrics.buttonRadius,
    elevation: 0,
  },
  buttonAction: {
    backgroundColor: Colors.bgButton,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  inputContainerRounded: {
    backgroundColor: Colors.bgTextInput,
    borderColor: 'transparent',
    borderRadius: Metrics.inputRadius,
  },

  topImgContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  bottomImgContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
};

export default ApplicationStyles;
