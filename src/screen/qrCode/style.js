import { StyleSheet, Dimensions } from "react-native";
import appColor from "../../constant/colorConstant";
import { heightPercentageToDP as hp , widthPercentageToDP as wp } from "react-native-responsive-screen";
import { fontConstant } from "@/constant";
const SCREEN_WIDTH = Dimensions.get("window").width;

const overlayColor = "rgba(0,0,0,0.5)"; // this gives us a black color with a 50% transparency

const rectDimensions = SCREEN_WIDTH * 0.45; // this is equivalent to 255 from a 393 device width
const rectBorderWidth = SCREEN_WIDTH * 0.005; // this is equivalent to 2 from a 393 device width
const rectBorderColor = "white";

const scanBarWidth = SCREEN_WIDTH * 0.46; // this is equivalent to 180 from a 393 device width
const scanBarHeight = SCREEN_WIDTH * 0.0025; //this is equivalent to 1 from a 393 device width
const scanBarColor = "#22ff00";

export default StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    position: "relative"
    // backgroundColor: appColor.LIGH_BLUE,
  },

  rectangleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'transparent',
  },

  rectangle: {
    height: rectDimensions,
    width: rectDimensions,
    borderWidth: rectBorderWidth,
    borderColor: rectBorderColor,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "pink",
    borderRadius: 20,
  },

  topOverlay: {
    flex: 1,
    // height: SCREEN_WIDTH,
    // width: SCREEN_WIDTH,
    // backgroundColor: 'white',
    justifyContent: "center",
    alignItems: "center",
  },

  bottomOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: 'overlayColor',
    paddingBottom: SCREEN_WIDTH * 0.60,
  },

  leftAndRightOverlay: {
    height: SCREEN_WIDTH * 0.65,
    width: SCREEN_WIDTH,
    // backgroundColor: 'white',
  },

  scanBar: {
    width: scanBarWidth,
    height: scanBarHeight,
    backgroundColor: scanBarColor,
  },
  scanText: {
    fontSize: fontConstant.TEXT_H1_SIZE_BOLD,
    fontFamily : fontConstant.FONT_BOLD,
    color: appColor.BLACK,
    // marginTop: ,
  },
  circleContainer : {
    width : wp('70%'),
    height : hp('33%'),
    borderWidth : 1,
    borderRadius : 150,
    backgroundColor : 'transparent',
    borderColor : '#ffe6e7',
    display : 'flex',
    justifyContent : 'center',
    alignItems : 'center'
  }
});
