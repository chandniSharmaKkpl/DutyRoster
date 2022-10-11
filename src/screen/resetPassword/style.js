import { StyleSheet, Dimensions } from "react-native";
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
    // paddingTop: 20,
    backgroundColor: appColor.WHITE,
  },
  loginText: {
    color: appColor.RED,
    fontSize: fontConstant.TEXT_H2_SIZE_BOLD,
    fontFamily: fontConstant.FONT_BOLD,
  },
  pinCodeIconStyle: {
    margin: 10,
    marginRight: 16,
    height: 18,
    width: 18,
    resizeMode: "cover",
  },
  passwordStyle: {
    margin: 10,
    height: 16.48,
    marginRight: 16,
    width: 16.45,
    resizeMode: "cover",
  },
  viewTxtInput: {
    alignItems: "center",
    paddingTop: hp("1%"),
  },
  viewForgotPass: {
    alignSelf: "flex-end",
    paddingTop: hp("1%"),
    paddingBottom: hp("2%"),
  },
  txtForgotPass: {
    color: appColor.BLACK,
    fontFamily: fontConstant.FONT_REGULAR,
    fontSize: fontConstant.TEXT_H2_SIZE_REGULAR,
  },
  viewSocialMediaBtn: {
    alignItems: "center",
  },
  baseText: {
    textAlign: "center",
    paddingTop: 30,
    color: appColor.BLACK,
  },
  innerText: {
    color: appColor.RED,
    fontFamily: fontConstant.FONT_BOLD,
    fontSize: fontConstant.TEXT_15_SIZE_BOLD,
  },
});
