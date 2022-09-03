import { StyleSheet, Dimensions, PixelRatio } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { appColor, fontConstant } from "@/constant";

export default StyleSheet.create({
  timeCardContainer: {
    minHeight: hp("11%"),
    // borderWidth: 1,
    borderColor: appColor.WHITE,
    borderRadius: 10,
    backgroundColor: appColor.WHITE,
    marginTop: hp("1.5%"),
    padding: 0,
  },

  dateContainerTextCenter: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: appColor.DARK_SKY,
    paddingVertical: 12,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
  day_date_style: {
    alignSelf: "center",
    fontFamily: fontConstant.FONT_REGULAR,
    fontSize: fontConstant.TEXT_H3_SIZE_BOLD,
    fontWeight: fontConstant.WEIGHT_BOLD,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: appColor.DARK_SKY,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 8
  },
  titleText: {
    textAlign: "left",
    color: appColor.RED,
    textTransform: "uppercase",
    fontWeight: fontConstant.WEIGHT_SEMI_BOLD,
    paddingVertical: 10,
  },
  contentContainer: {
    paddingHorizontal: 10,
    paddingVertical: 12
  },
  contentTextContainer : {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 2
  },
  contentText: {
    textAlign: "left",
    fontWeight: fontConstant.WEIGHT_REGULAR,
    paddingVertical: 5,
  },
  emptyDataContainer: {
    backgroundColor: appColor.LIGHT_ORANGE,
    minHeight: hp("7.5%"),
    padding: 0,
    margin: 0,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyDataText : {
    fontSize : fontConstant.TEXT_15_SIZE_BOLD,
    fontWeight: fontConstant.WEIGHT_SEMI_BOLD
  }
});
