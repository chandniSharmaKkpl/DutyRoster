import { fontConstant } from "@/constant";
import { StyleSheet, Dimensions } from "react-native";
const { height, width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  //////// media modal styles
  modalmediaopen: {
    backgroundColor: "#fff",
    borderRadius: 3,
    overflow: "hidden",
  },
  titleviewstyle: {
    marginVertical: height * 0.01,
  },
  choosefilestyle: {
    fontSize: 18,
    fontFamily: fontConstant.FONT_SEMI_BOLD,
    color: "black",
    paddingTop: 18,
    paddingBottom: 18,
    marginStart: 20,
  },
  lineStyle: {
    height: height * 0.002,
    width: "100%",
    backgroundColor: "black",
    opacity: 0.6,
  },
  renderMimetypeImagemainView: {
    flex: 1,
  },
  viewPopupStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginStart: 22,
  },
  textStylePopup: {
    color: "black",
    fontSize: 16,
    fontFamily: fontConstant.FONT_SEMI_BOLD,
    fontWeight: "400",
    padding: width * 0.03,
  },
  lineStyle1: {
    height: 1,
    width: "100%",
    backgroundColor: "black",
    opacity: 0.4,
  },
  imagePopupStyle: {
    height: width * 0.05,
    width: width * 0.05,
    resizeMode: "contain",
  },
});

export default styles;
