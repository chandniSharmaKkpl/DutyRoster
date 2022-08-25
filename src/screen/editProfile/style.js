import { StyleSheet, Dimensions } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { appColor, fontConstant } from "@/constant";
const { height, width } = Dimensions.get("screen");
export default StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: appColor.GRAY_DARK,
    // paddingHorizontal: hp("2%"),
    paddingHorizontal: 20,
  },

  viewTopTitle: {
    paddingTop: hp("3%"),
  },

  txtEditProfile: {
    color: appColor.BLACK,
    fontSize: fontConstant.TEXT_18_SIZE_REGULAR,
    fontFamily: fontConstant.FONT_BOLD,
  },
  img: {
    padding: hp("8%"),
    height: 98,
    width: 98,
    borderRadius: hp("10%"),
  },
  imgEmpty:{
    padding: hp("8%"),
    height: 98,
    width: 98,
    borderRadius: hp("10%"),
    tintColor:appColor.WHITE
  },
  touch: {
    position: "absolute",
    right: 10,
    bottom: 0,
    height: 30,
    width: 30,
    borderRadius: hp(40),
    backgroundColor: "#BD2529",
    padding: hp("1%"),
  },
  editImg: {
    alignContent: "center",
    alignSelf: "center",
    alignItems: "center",
    height: 15,
    width: 15,
  },
  inputTextTitle: {
    fontFamily: fontConstant.FONT_SEMI_BOLD,
    fontSize: fontConstant.TEXT_H1_SIZE_REGULAR,
    color: appColor.BLACK,
    paddingBottom: hp("1%"),
    paddingTop: hp("2%"),
  },
  passwordContainer: {
    flexDirection: "row",
  },
  passwordInput: {
    width: wp("45%"),
    marginRight: 10,
  },
  btnContainer: {
    paddingTop: 20,
    alignItems: "center",
  },
  savaBtn: {
    width: wp("35%"),
    backgroundColor: appColor.BLACK,
    borderColor: appColor.BLACK,
  },
  btnSaveText: {
    color: appColor.WHITE,
    fontFamily: fontConstant.FONT_SEMI_BOLD,
    fontSize: fontConstant.TEXT_15_SIZE_BOLD,
  },
});
