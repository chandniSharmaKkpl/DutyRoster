import { StyleSheet, Dimensions, Platform } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { appColor, fontConstant } from "../../constant";

export default StyleSheet.create({
  imageContainer: {
    alignItems: "center",
    paddingTop: hp("3%"),
  },
  loginTextContainer: {
    paddingTop: hp("6%"),
    paddingBottom: hp("3%"),
  },
  scrollViewStyle: {
    flex: 1,
    backgroundColor: appColor.WHITE,
  },
  emailIconStyle: {
    margin: 10,
    marginRight: 16,
    height: 13,
    width: 18,
    resizeMode: "cover",
  },
  passwordStyle: {
    margin: 10,
    marginRight: 16,
    height: 16.48,
    width: 16.45,
    resizeMode: "cover",
  },
  loginText: {
    color: appColor.RED,
    fontSize: fontConstant.TEXT_H2_SIZE_BOLD,
    fontFamily: fontConstant.FONT_BOLD,
  },
  textSignin: {
    fontFamily: fontConstant.FONT_REGULAR,
    fontSize: fontConstant.TEXT_14_SIZE_REGULAR,
    color: appColor.GRAY,
    alignSelf: "center",
    paddingTop: hp("1.3%"),
  },

  txtSignupNormal: {
    color: appColor.BLACK,
    fontFamily: fontConstant.FONT_REGULAR,
    fontSize: fontConstant.TEXT_H2_SIZE_REGULAR,
  },

  viewTxtInput: {
    alignItems: "center",
    paddingTop: hp("2%"),
  },
  viewForgotPass: {
    alignSelf: "flex-end",
    paddingTop: hp("4%"),
    paddingBottom: hp("3%"),
  },
  viewSignUp: {
    alignSelf: "center",
    paddingTop: hp("3%"),
    paddingBottom: hp("1%"),
  },
  txtForgotPass: {
    color: appColor.BLACK,
    fontFamily: fontConstant.FONT_REGULAR,
    fontSize: fontConstant.TEXT_H2_SIZE_REGULAR,
  },
  txtSignup: {
    color: appColor.BLACK,
    fontFamily: fontConstant.FONT_BOLD,
    fontSize: fontConstant.TEXT_H2_SIZE_REGULAR,
  },
  versionContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: Platform.OS === "android" ? hp("8%") : hp("5%"),
  },
  appVersion: {
    // textAlign: 'center',
    justifyContent: "center",
    alignItems: "center",
    color: appColor.BLACK,
    fontFamily: fontConstant.FONT_REGULAR,
    fontSize: fontConstant.TEXT_H2_SIZE_REGULAR,
  },
  viewSocialMediaBtn: {
    alignItems: "center",
  },
});
