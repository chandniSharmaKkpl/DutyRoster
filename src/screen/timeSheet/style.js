import { StyleSheet, Dimensions } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { appColor, fontConstant } from "@/constant";

export default StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    // backgroundColor: appColor.BROWN_CUSTOM,
    paddingTop: hp("5%"),
  },
  viewTop: {
    flex: 0.36,
  },
  viewBottom: {
    flex: 0.35,
    alignItems: "center",
  },
 
  txtBtnGetStart: {
    color: appColor.RED,
    fontSize: fontConstant.TEXT_H2_SIZE_BOLD,
  },
  txtBtnHowWork: {
    color: appColor.RED,
    fontSize: fontConstant.TEXT_14_SIZE_REGULAR,
    fontFamily: fontConstant.FONT_SEMI_BOLD,
  },

  btnTransparant: {
    paddingTop: 50,
    backgroundColor: appColor.TRANSPARANT,
  },

  txtBtnTry: {
    color: appColor.RED,
    fontSize: fontConstant.TEXT_14_SIZE_BOLD,
    fontWeight: "600",
  },
});
