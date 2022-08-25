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
      height: hp('4%'),
      width : wp('4%')
  },
    txtBtnTry: {
    color: appColor.RED,
    fontSize: fontConstant.TEXT_14_SIZE_BOLD,
    fontWeight: "600",
  },
  addTimeIconContainer : {
    height: hp('6%'),
    width: wp('13%'),
    backgroundColor : appColor.WHITE,
    borderWidth: 1,
    borderColor: appColor.WHITE,
    borderRadius: 10,
    shadowColor: appColor.SHADOW,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.8,
    shadowRadius: 2.22,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconText : {
    fontSize: 30
    // fontFamily : fontConstant.FONT_REGULAR
  },
});
