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
    paddingHorizontal : 20
  },
  viewTopTitle: { 
    paddingTop: hp("1.5%"),
  },
  txtUnavailablity : {
    fontFamily: fontConstant.FONT_SEMI_BOLD,
    fontSize: fontConstant.TEXT_H1_SIZE_REGULAR,
    color: appColor.BLACK,
    paddingBottom: hp("1%"),
    paddingTop: hp("2%"),
  },
  rightIconStyle : {
      height: hp('6%'),
      width : wp('6%')
  },
    txtBtnTry: {
    color: appColor.RED,
    fontSize: fontConstant.TEXT_14_SIZE_BOLD,
    fontWeight: "600",
  },
});
