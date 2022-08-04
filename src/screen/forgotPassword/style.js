import { StyleSheet, Dimensions } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { appColor, fontConstant } from "../../constant";

export default StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: appColor.LIGH_BLUE,
  },
  forgotTextContainer: {
    paddingTop: hp("6%"),
    paddingBottom: hp("2%"),
  },
  scrollViewStyle: {
    flex: 1,
    backgroundColor : appColor.WHITE
  },
  viewTxtInput: {
    alignItems: "center",
    paddingTop: hp("2%"),
  },
  emailIconStyle : {
    margin: 10,
    marginRight: 16,
    height: 13,
    width: 18,
    resizeMode: "cover",
  },
  viewForgotPass: {
    alignSelf: "center",
    paddingTop: hp("2%"),
  },
  txtForgotPass: {
    color: appColor.RED,
    fontFamily: fontConstant.FONT_BOLD,
    fontSize: fontConstant.TEXT_14_SIZE_REGULAR,
  },
  viewSocialMediaBtn: {
    alignItems: "center",
    paddingTop: hp("2%"),
  },
  baseText: {
    textAlign: "center",
    paddingTop: 30,
  },
  innerText: {
    color: appColor.RED,
  },
});
