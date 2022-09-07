import { StyleSheet, Dimensions, PixelRatio } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { appColor, fontConstant } from "@/constant";

export default StyleSheet.create({
  cardContainer: {
    // height: 'auto',
    borderColor: appColor.WHITE,
    borderRadius: 10,
    backgroundColor: appColor.WHITE,
    paddingHorizontal: "5%",
    marginTop: "6%",
  },
  cardConatinerDetails: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: appColor.BORDER_GRAY_DARK,
  },
  mainTitle: {
    fontSize: fontConstant.TEXT_20_SIZE_BOLD,
    fontWeight: fontConstant.WEIGHT_SEMI_BOLD,
    color: appColor.RED,
    marginBottom: "1.5%",
  },
  row: {
    flexDirection: "row",
    // borderBottomWidth: 1,
    // borderBottomColor: appColor.GRAY_DARK,
    paddingVertical: 4,
    display: "flex",
  },
  titleColumn: {
    flex: 1,
    textAlign: "left",
  },
  textTitleColumn: {
    fontWeight: fontConstant.WEIGHT_SEMI_BOLD,
    color: appColor.BLACK,
  },
  valueColumn: {
    flex: 1,
    textAlign: "left",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  valueLableContainer: {
    backgroundColor: appColor.RED,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: appColor.RED,
    borderRadius: 5,
    marginLeft: 5,
  },
  textValueLable: {
    color: appColor.WHITE,
  },
});
