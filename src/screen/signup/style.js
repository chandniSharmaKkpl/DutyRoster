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
    backgroundColor: appColor.LIGH_BLUE,
  },
  textSignin: {
    fontFamily: fontConstant.FONT_REGULAR,
    fontSize: fontConstant.TEXT_14_SIZE_REGULAR,
    color: appColor.GRAY,
    alignSelf: "center",
    paddingTop: hp("2%"),
  },
  viewTxtInput: {
    alignItems:'center', 
    paddingTop:hp('2%')
  },
  viewForgotPass:{
    alignSelf:'center',
    paddingTop: hp('2%')
  },
  txtForgotPass: {
    color: appColor.RED,
    fontFamily: fontConstant.FONT_BOLD,
    fontSize: fontConstant.TEXT_14_SIZE_REGULAR,
  },
  viewSocialMediaBtn: {
      alignItems:'center'
    // backgroundColor: appColor.WHITE,
  },
  btnSocialMedia:{
    backgroundColor:appColor.WHITE
  }
});
