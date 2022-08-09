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
    backgroundColor: appColor.GRAY_DARK,
    // paddingTop: hp("2%"),
    paddingHorizontal: 20,
  },
  row: {
    backgroundColor: appColor.WHITE,
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  activeRow : {
    backgroundColor: appColor.LIGHT_ORANGE,
    color : appColor.LIGHT_ORANGE,
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconTextContaioner: {
    flexDirection: "row",
    alignItems: "center",
  },
  userIcon : {
    // height : 13,
    // width : 9.7,
    // backgroundColor : 'pink',
    marginRight : wp('4%')
  },  
  textRed : {
    color : appColor.RED,
    fill : appColor.RED
  },
  textBlack : {
    color : appColor.BLACK,
    fill : appColor.BLACK
  },
  title : {
    fontFamily : fontConstant.FONT_SEMI_BOLD,
    fontSize : fontConstant.TEXT_16_SIZE_REGULAR,
    color : appColor.BLACK

  },
  viewTopTitle: {
    paddingTop: hp("2.5%"),
    paddingBottom: hp("1%"),
  },

  txtProfileSetting: {
    color: appColor.BLACK,
    fontSize: fontConstant.TEXT_18_SIZE_REGULAR,
    fontFamily: fontConstant.FONT_BOLD,
  },
});
