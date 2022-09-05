import { StyleSheet, Dimensions } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import fontConstant from "../../constant/fontConstant";
import appColor from "../../constant/colorConstant";
const { height, width } = Dimensions.get("screen");

export default StyleSheet.create({
  inputTextTitle: {
    fontFamily: fontConstant.FONT_SEMI_BOLD,
    fontSize: fontConstant.TEXT_H1_SIZE_REGULAR,
    color: appColor.BLACK,
    paddingBottom: hp("1%"),
    paddingTop: hp("1%"),
  },
  scrollViewStyle: {
    flex: 1,
    // paddingTop: 20,
    backgroundColor : appColor.WHITE
  },
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: appColor.LIGH_BLUE,
  },
  imagePopupStyle: {
    height: width * 0.05,
    width: width * 0.05,
    resizeMode: "contain",
  },
  textSignin: {
    fontFamily: fontConstant.FONT_REGULAR,
    fontSize: fontConstant.TEXT_14_SIZE_REGULAR,
    color: appColor.GRAY,
    alignSelf: "center",
    paddingTop: hp("2%"),
  },
  viewTxtInput: {
   // alignItems:'center', 
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
  },
  IconStyle: {
    margin: 10,
    marginRight: 16,
    height: 20,
    width: 18,
    resizeMode: "cover",
  },
  viewLogin: {
    alignSelf: "center",
    paddingTop: hp("3%"),
    paddingBottom: hp("3%"),
  },
  txtLogin: {
    color: appColor.BLACK,
    fontFamily: fontConstant.FONT_REGULAR,
    fontSize: fontConstant.TEXT_H2_SIZE_REGULAR,
  },
  img: {
    padding:hp("8%"),
    height:98,
    width:98,
    borderRadius:hp("10%")
  },
  touch: {
    position: "absolute", 
    right: 10, 
    bottom: 0, 
    height: 30, 
    width: 30, 
    borderRadius: hp(40), 
    backgroundColor: "#BD2529",
    padding:hp("1%"), 
  },
  editImg: {
    alignContent:'center',
    alignSelf:'center',
    alignItems:'center',
    height: 15, 
    width: 15,
  },
  cameraModal:{
    height: hp('30%'),
    width: "100%",
    borderRadius: hp(2),
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    paddingTop: hp("3%"),
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
  },
  btnCamera: {
    width:"80%",
    backgroundColor: appColor.RED,
  },
  cameraButton: {
   
    color: appColor.WHITE,
    fontSize: fontConstant.TEXT_17_SIZE_REGULAR,
    fontFamily: fontConstant.FONT_SEMI_BOLD,
  },
  closeTouch:
  {
      position: "absolute",
      right: hp(-1),
      top: hp(-2),
      backgroundColor: "red",
      height: 32,
      width: 37,
      borderRadius: hp(35),
      justifyContent: 'center',
      alignItems: 'center'
  },
  closeIcon:{
      color: "#fff",
  },
  cameraTitle:
  {
    fontFamily: fontConstant.FONT_REGULAR,
    fontSize: fontConstant.TEXT_20_SIZE_BOLD,
  },
  camera:
  {
      textAlign: "left",
      color: "#fff",
      paddingRight:10
  },
 
  layer:
  {
      height: hp(25),
      width: hp(25),
  },

  viewCamera:{
    width: wp('80%'), 
    height: hp('6.2%'), 
    justifyContent:'center', 
    borderRadius: 30, 
    alignItems:'center', 
    margin:'2%', 
    borderColor: appColor.GRAY_LIGHT, 
    borderWidth:1,
    backgroundColor:'red'
  }, 
  txtCamera:{
    color:'#fff',
    fontSize: fontConstant.TEXT_14_SIZE_REGULAR, 
    fontFamily: fontConstant.FONT_REGULAR, 
    fontWeight:fontConstant.WEIGHT_SEMI_BOLD
  }, 
  btnCamera:{
     // backgroundColor:'pink',
      width:'100%', 
      height:'100%',
      justifyContent:'center', 
      alignItems:'center'
  },
  txtError: {
    alignSelf:'center',
    color: appColor.RED,
    paddingLeft:wp('1%'),
     paddingTop: hp("1%"),
    fontSize: fontConstant.TEXT_H3_SIZE_REGULAR,
    fontFamily: fontConstant.FONT_REGULAR,
  },
 
});
