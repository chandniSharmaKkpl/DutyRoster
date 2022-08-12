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
  },
  topContain: {
    paddingHorizontal: 20,
    backgroundColor: appColor.WHITE,
  },
  weekDateTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: hp("2%"),
  },
  weekDateTextStyle: {
    fontFamily: fontConstant.FONT_BOLD,
    fontSize: fontConstant.TEXT_18_SIZE_REGULAR,
    color: appColor.RED,
  },
  caledarContainer: {
    height: 36,
    width: 36,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: appColor.BLACK,
    justifyContent: "center",
    alignItems: "center",
  },
  caledarStyles: {
    width: 18,
    height: 18,
    fill: appColor.WHITE,
  },
  dateTextunSelectBox: {
    height: hp('7%'),
    width: wp('10.5%'),
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    paddingVertical: 10,
    marginBottom: hp('2%')

  },
  dateTextBoxSelect: {
    height: hp('7%'),
    width: wp('10.5%'),
    backgroundColor: appColor.RED,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    borderColor: appColor.RED,
    marginRight: wp('2.5%'),
    marginBottom: hp('2%')

  },
  dayTextStyle: {
    fontSize: fontConstant.TEXT_H3_SIZE_REGULAR,
    color: appColor.WHITE,
  },
  unSelectDayTextStyle: {
    fontSize: fontConstant.TEXT_H3_SIZE_REGULAR,
    color: appColor.BLACK,
  },
  dateTextStyle: {
    fontSize: fontConstant.TEXT_H2_5_SIZE_BOLD,
    color: appColor.WHITE,
  },
  unSelectBoxDateTextStyle: {
    fontSize: fontConstant.TEXT_H2_5_SIZE_BOLD,
    color: appColor.BLACK,
  },
  txtBtnGetStart: {
    color: appColor.RED,
    fontSize: fontConstant.TEXT_H1_SIZE_BOLD,
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
