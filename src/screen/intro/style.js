import { StyleSheet, Dimensions } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import fontConstant from "../../constant/fontConstant";
import appColor from "../../constant/colorConstant";
export default StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: appColor.BROWN_CUSTOM,
    paddingTop:hp('5%')

  },
  viewTop: {
    flex: 0.95,
  },
  viewBottom: {
    flex: 0.35,
    alignItems: "center",
  },
  txtDesc: {
    color: appColor.BLACK,
    fontSize: fontConstant.TEXT_20_SIZE_BOLD,
    fontWeight: "500",
    padding: "5%",
    textAlign: "center",
  },
  txtBtnNext: {
    color: appColor.RED,
    fontSize: fontConstant.TEXT_20_SIZE_BOLD,
    fontWeight: "500",
  },
  viewText: {
    flex: 0.85,
  },
  viewNextBtn: {
    flex: 0.15,
  },
  viewCreateAccount:{
    flex: 0.35,
    alignItems:'center',
  },
  viewPage: {
    width: wp("100%"),
    height: hp("90%"),
    alignItems: "center",
    // backgroundColor:'pink'
  },

  pageControlView: {
    flex: 0.08,
    alignSelf: "center",
   // backgroundColor:'yellow'
  },
  viewRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: wp("100%"),
    flexWrap: "wrap",
    alignSelf: "center",
    paddingHorizontal: wp('4%'),
  },
  txtBtnTry: {
    color: appColor.RED,
    fontSize: fontConstant.TEXT_14_SIZE_BOLD,
    fontWeight: fontConstant.WEIGHT_SEMI_BOLD,
  },
  btnTransparant: {
    backgroundColor: appColor.TRANSPARANT,
    paddingTop:hp('2%')
  },

  btnGetStart: {
    backgroundColor: appColor.RED,
  },
  txtBtnGetStart: {
    color: appColor.WHITE,
    fontSize: fontConstant.TEXT_14_SIZE_REGULAR,
  },
  txtBtnHowWork: {
    color: appColor.RED,
    fontSize: fontConstant.TEXT_14_SIZE_REGULAR,
  },
  btnHowWork: {
    backgroundColor: appColor.WHITE,
  },
});
