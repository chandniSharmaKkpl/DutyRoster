import { StyleSheet, Dimensions } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { appColor, fontConstant } from "@/constant";

export default StyleSheet.create({
  container: {
    //    paddingTop:hp('5%'),
    width: "100%",
    height: "100%",
    backgroundColor: appColor.WHITE,
    paddingHorizontal: 20,
    paddingBottom:'20%'
  },
  scrollViewStyle : {
    // flex: 1,
    // backgroundColor: appColor.WHITE,
  },
  textNormal: {
    fontSize: fontConstant.TEXT_16_SIZE_REGULAR,
    color: appColor.WHITE,
    alignSelf: "center",
  },
  imageContainer: {
    alignItems: "center",
    paddingTop: hp("3%"),
  },
  titleTextContainer: {
    paddingTop: hp("8%"),
    paddingBottom: hp("3%"),
  },
  titleText: {
    color: appColor.RED,
    fontSize: fontConstant.TEXT_H2_SIZE_BOLD,
    fontFamily: fontConstant.FONT_BOLD,
  },
  btnSocialMedia: {
    backgroundColor: appColor.RED,
  },
  btnSocialMediaText: {
    color: appColor.WHITE,
    fontSize: fontConstant.TEXT_20_SIZE_REGULAR,
    fontFamily: fontConstant.FONT_SEMI_BOLD,
  },
});
