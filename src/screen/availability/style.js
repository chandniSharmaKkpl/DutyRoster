import { StyleSheet, Dimensions } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { appColor, fontConstant } from "@/constant";

export default StyleSheet.create({
  // modalView: {
  //   position: "absolute",
  //   backgroundColor: "rgba(0,0,0,0.6)",
  //   width: wp("100%"),
  //   height: hp("100%"),
  //   top: 0,
  //   bottom: 0,
  // },
  reasonText: {
    fontFamily: fontConstant.BARLOW_REGULAR,
    fontSize: fontConstant.TEXT_H1_SIZE_REGULAR,
    color: appColor.BLACK,
    paddingLeft: "2%",
    paddingRight: "2%",
    paddingTop: "2%",
    paddingBottom: "2%",
    width: "80%",
    // backgroundColor: appColor.GRAY,
    // height:hp('4%')
  },

  viewFlatList: {
    // height: hp('30%'),
    // backgroundColor: 'pink',
    backgroundColor: appColor.DARK_SKY,
    position: "absolute",
    // width: getOrientation() === 'portrait' ? '90%' : '94%',
    // width: '90%',
    top: hp("14%"),
    alignSelf: "center",
    borderRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: Platform.OS === "android" ? appColor.BORDER : appColor.GRAY,
    shadowColor: appColor.SHADOW,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    width: wp("88%"),
    shadowOpacity: Platform.OS === "android" ? 0.2 : 0.62,
    shadowRadius: Platform.OS === "android" ? 1.2 : 2.22,
    elevation: 5,
    zIndex: 2,
    maxHeight: 120,
  },
  singleLine: {
    width: "100%",
    height: hp("0.05%"),
    backgroundColor: appColor.GRAY_LIGHT,
  },
  textRow: {
    fontSize: fontConstant.TEXT_14_SIZE_BOLD,
    color: appColor.BLACK,
    paddingLeft: wp("5%"),
    paddingRight: "2%",
    paddingTop: "5%",
    paddingBottom: "5%",
  },
  viewArrow: {
    width: wp("4%"),
    height: hp("2%"),
  },
  buttonInsideReason: {
    flexDirection: "row",
    justifyContent: "space-between",
    // width: getOrientation() === 'landscap' ? '90%' : '100%',
    alignItems: "center",
    width: "93%",
  },
  buttonReason: {
    paddingLeft: wp("5%"),
    paddingRight: wp("5%"),
    borderRadius: 14,
    borderColor: Platform.OS === "android" ? appColor.BORDER : appColor.GRAY,
    shadowColor: appColor.SHADOW,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: Platform.OS === "android" ? 0.2 : 0.62,
    shadowRadius: Platform.OS === "android" ? 1.2 : 2.22,
    elevation: 5,
    height: hp("6%"),
    backgroundColor: appColor.WHITE,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 1,
  },

  availabilityContainer: {
    position: "relative",
    zIndex: 1,
    // backgroundColor: appColor.GRAY,
    // borderColor: appColor.RED,
    // borderWidth: 1,
    // padding:
  },
  viewTopTitle: {
    paddingTop: hp("1.5%"),
    paddingHorizontal: wp("5%"),
  },
  inOutTimeContainer: {
    width: "100%",
    // backgroundColor: "pink",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    position: "relative",
    zIndex: -1,
  },
  inputTimeText: {
    flex: 1,
    // marginHorizontal: 10,
    // marginRight: 10,
  },
  textInput: {
    backgroundColor: "#fff",
    borderWidth: 0,
  },
  txtUnavailablity: {
    fontFamily: fontConstant.FONT_SEMI_BOLD,
    fontSize: fontConstant.TEXT_H1_SIZE_REGULAR,
    color: appColor.BLACK,
    paddingBottom: hp("1%"),
    paddingTop: hp("2%"),
  },
  plusTxt: {
    fontFamily: fontConstant.FONT_SEMI_BOLD,
    fontSize: fontConstant.TEXT_H1_SIZE_BOLD,
    color: appColor.WHITE,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  rightIconStyle: {
    height: hp("4%"),
    width: wp("4%"),
  },
  districts: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconContainer: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addDelete: {
    flexDirection: "row",
  },
  rowTitle: {
    color: appColor.BLACK,
    fontSize: fontConstant.TEXT_20_SIZE_BOLD,
  },
  rowValue: {
    color: appColor.BLACK,
    fontSize: fontConstant.TEXT_18_SIZE_REGULAR,
  },
  plusView: {
    backgroundColor: appColor.BLACK,
    width: wp("7%"),
    height: hp("4%"),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    // flex: 1,
  },
  scrollView: {
    // backgroundColor:'pink',
    // width: wp("9=100%"),
    height: hp("60%"),
  },
  minusView: {
    backgroundColor: appColor.RED,
    width: wp("7%"),
    height: hp("4%"),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },

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
  plusImage: {
    width: wp("4%"),
    height: hp("2%"),
    fill: appColor.WHITE,
  },
  dateTextunSelectBox: {
    height: hp("7%"),
    width: wp("10.5%"),
    justifyContent: "center",
    alignItems: "center",
    marginRight: wp("2.5%"),
    paddingVertical: 10,

    backgroundColor: appColor.DARK_SKY,
  },
  dateTextBoxSelect: {
    height: hp("7%"),
    width: wp("10.5%"),
    backgroundColor: appColor.RED,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    borderColor: appColor.RED,
    marginRight: wp("2.5%"),
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
  dateLabelContainer: {
    // backgroundColor:"grey",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    paddingVertical: hp("1%"),
    position: "relative",
  },
  empTimeCardDetails: {
    marginTop: hp("2%"),
    paddingHorizontal: 20,
  },
  calendarStyleAndroid: {
    position: "absolute",
    left: wp("34%"),
    top: hp("7.5%"),
    height: "auto",
    width: wp("60%"),
    borderWidth: 1,
    borderColor: "#D2D2D2",
    borderRadius: 8,
    shadowColor: "#0000001A",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 22,
    shadowRadius: 4.65,
    elevation: 5,
  },
  calendarStyleIOS: {
    position: "absolute",
    left: wp("35%"),
    top: hp("8%"),
    height: "auto",
    width: wp("60%"),
    borderWidth: 1,
    borderColor: "#D2D2D2",
    borderRadius: 8,
    shadowColor: "#0000001A",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 22,
    shadowRadius: 4.65,
    elevation: 5,
  },

  txtBtnTry: {
    color: appColor.RED,
    fontSize: fontConstant.TEXT_14_SIZE_BOLD,
    fontWeight: "600",
  },
  addTimeIconContainer: {
    height: hp("6%"),
    width: wp("13%"),
    backgroundColor: appColor.WHITE,
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
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    fontSize: 30,
    // fontFamily : fontConstant.FONT_REGULAR
  },
  textInput: {
    backgroundColor: "#fff",
    borderWidth: 0,
  },
  timeIconStyle: {
    marginRight: 10,
    height: 20,
    width: 20,
    // paddingTop:'4%'
  },
  btnBlack: {
    marginTop: "8%",
    backgroundColor: appColor.BLACK,
    borderRadius: hp("5%"),
    // height:'10%'
    padding: hp("1%"),
    width: wp("35%"),
    alignItems: "center",
    alignSelf: "center",
    position: "relative",
    zIndex: -1,
  },
  viewSaveCopy: {
    flexDirection: "row",
    // backgroundColor: 'orange',
    marginVertical: hp("5%"),
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: hp("5.6%"),
  },

  btnSave: {
    backgroundColor: appColor.BLACK,
    borderRadius: hp("5%"),
    // height:'10%'
    padding: hp("1%"),
    width: wp("35%"),
    alignItems: "center",
  },
  btnCopy: {
    backgroundColor: appColor.RED,
    borderRadius: hp("5%"),
    // height:'10%'
    padding: hp("1%"),
    width: wp("35%"),
    alignItems: "center",
  },
  saveButton: {
    color: appColor.WHITE,
    fontSize: fontConstant.TEXT_20_SIZE_REGULAR,
    fontWeight: fontConstant.WEIGHT_SEMI_BOLD,
  },
});
