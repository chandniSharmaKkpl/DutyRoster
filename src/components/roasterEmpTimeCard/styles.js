import { StyleSheet, Dimensions } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { appColor, fontConstant } from "@/constant";

export default StyleSheet.create({
  timeCardContainer: {
    height: hp("11%"),
    borderWidth: 1,
    borderColor: appColor.WHITE,
    borderRadius: 10,
    backgroundColor: appColor.WHITE,
    flexDirection: "row",
    paddingHorizontal: 20,
    marginTop: hp("1.5%"),
  },
  dateContainer: {
    // minWidth: wp("8%"),
    // backgroundColor: appColor.DARK_SKY,
    justifyContent: "center",
    alignItems: "center",
  },
  dateContainerTextCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  dateText: {
    fontSize: fontConstant.TEXT_20_SIZE_BOLD,
    fontWeight: fontConstant.WEIGHT_SEMI_BOLD,
  },
  monthText: {
    fontSize: fontConstant.TEXT_12_SIZE_BOLD,
    fontWeight: fontConstant.WEIGHT_SEMI_BOLD,
    textTransform: "uppercase",
  },
});
