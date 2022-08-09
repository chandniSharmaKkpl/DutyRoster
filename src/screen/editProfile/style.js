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

  imageContainer: {
    marginVertical: hp("3%"),
    alignItems: "center",
  },
  cameraIconContainer: {
    position: "absolute",
    bottom : 1,
    right : wp('35%'),
    height: hp('3%'),
    width: wp('6%'),
    backgroundColor: appColor.RED,
    borderWidth: 1,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraIcon: {
    height: hp('3%'),
    width: wp('3%'),
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
  // ogoContainer: {
  //   marginBottom: 20,
  // },
  // back: {
  //   position: "absolute",
  //   top: 25,
  //   right: 10,
  // },
  // logo: {
  //   height: 100,
  //   width: "100%",
  //   marginTop: "10%",
  //   marginBottom: "8%",
  // },
  // scrollViewStyle: {
  //   flex: 1,
  // },
  // titleView: {
  //   margin: 20,
  // },
  // titleStyle: {
  //   color: "#FFF",
  //   textAlign: "center",
  //   fontSize: 30,
  // },
  // inputView: {
  //   flex: 1,
  //   paddingHorizontal: 20,
  // },
  // inputViewImage: {
  //   flex: 1,
  // },
  // imageIcon: {
  //   height: 200,
  //   width: "100%",
  //   position: "absolute",
  // },
  // loginButtonView: {
  //   alignItems: "center",
  //   paddingVertical: 30,
  // },
  // loginText: {
  //   fontSize: 18,
  //   marginTop: 10,
  // },
  // alreadyHaveAccount: {
  //   color: "#FFF",
  //   fontSize: 14,
  //   fontWeight: "300",
  // },
  // error: {
  //   marginVertical: 10,
  //   textAlign: "center",
  // },
  // containerDate: {
  //   borderColor: "lightgray",
  //   borderWidth: 1,
  //   flexDirection: "row",
  //   backgroundColor: "rgba(211,211,211,0.3)",
  //   borderRadius: 50,
  // },
  // textinputContainer: {
  //   marginBottom: 40,
  // },
  // iconContainer: {
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  // iconStyle: {
  //   height: 20,
  //   width: 20,
  //   position: "absolute",
  //   left: 16,
  // },
  // backgroundIcon: {
  //   width: 60,
  //   position: "absolute",
  //   left: 0,
  // },
  // textInputStyle: {
  //   width: "100%",
  //   justifyContent: "center",
  //   color: "#fff",
  //   textAlign: "center",

  //   height: 30,
  // },
  // errorDate: {
  //   paddingLeft: 10,
  //   position: "absolute",
  //   bottom: -30,
  // },
  // //////// media modal styles
  // modalmediaopen: {
  //   backgroundColor: "#fff",
  //   borderRadius: 3,
  //   overflow: "hidden",
  // },
  // titleviewstyle: {
  //   marginVertical: height * 0.01,
  // },
  // choosefilestyle: {
  //   fontSize: 18,

  //   color: "black",
  //   paddingTop: 18,
  //   paddingBottom: 18,
  //   marginStart: 20,
  // },
  // lineStyle: {
  //   height: height * 0.002,
  //   width: "100%",
  //   backgroundColor: "black",
  //   opacity: 0.6,
  // },
  // renderMimetypeImagemainView: {
  //   flex: 1,
  // },
  // viewPopupStyle: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   marginStart: 22,
  // },
  // textStylePopup: {
  //   color: "black",
  //   fontSize: 16,

  //   fontWeight: "400",
  //   padding: width * 0.03,
  // },
  // lineStyle1: {
  //   height: 1,
  //   width: "100%",
  //   backgroundColor: "black",
  //   opacity: 0.4,
  // },
  // imagePopupStyle: {
  //   height: width * 0.05,
  //   width: width * 0.05,
  //   resizeMode: "contain",
  // },
});
