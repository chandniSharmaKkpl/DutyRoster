import { appColor } from "@/constant";
import React from "react";
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import fontConstant from "../constant/fontConstant";
import { AppText } from "./AppText";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const TextInputCustom = (props) => {
  const {
    value,
    label,
    error,
    onChangeText,
    rightIcon,
    style,
    inputViewStyle,
    placeholder,
    icon,
    onPressRight,
    iconStyle,
    secureTextEntry,
    keyboardType,
    rightIconStyle,
    multiline,
  } = props;
  return (
    <View style={[styles.view, inputViewStyle]}>
      <View style={styles.view1}>
        <Image
          source={icon} //Change your icon image here
          // style={iconStyle}
        />
        <TextInput
          style={[styles.txtInput, style]}
          value={value}
          label={label}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextSize={50}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
        />
      </View>
      <TouchableOpacity onPress={onPressRight}>
        <Image
          source={rightIcon} //Change your icon image here
          style={[styles.iconStyle, rightIconStyle]}
        />
      </TouchableOpacity>

      {error ? <AppText text={error} style={styles.txtError} /> : null}
    </View>
  );
};

export const styles = {
  view: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp("3%"),
    width: wp("90%"),
    height: hp("6%"),
    borderRadius: 6,
    borderColor: appColor.BORDER_BLACK,
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: appColor.SHADOW,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.8,
    shadowRadius: 2.22,
    // backgroundColor: "pink",
  },
  view1: {
    flexDirection: "row",
    alignItems: "center",
  },
  txtError: {
    color: appColor.RED,
    paddingBottom: hp("1%"),
  },
  somePlaceholderStyle: {
    fontSize: fontConstant.TEXT_16_SIZE_REGULAR,
    color: "red",
  },

  iconStyle: {
    height: 12,
  },
  eyeIconStyle: {
    height: 20,

    width: 17.55,
    resizeMode: "center",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  txtInput: {
    includeFontPadding: false,
    marginLeft: 10,
    width: "80%",
    padding: 0,
    fontSize: fontConstant.TEXT_17_SIZE_REGULAR,
    fontWeight: fontConstant.WEIGHT_LEIGHT,
  },
  txtError: {
    textAlign: "left",
    position: "absolute",
    color: appColor.RED,
    bottom: -20,
    fontSize: fontConstant.TEXT_H3_SIZE_REGULAR,
    fontFamily: fontConstant.FONT_REGULAR,
  },
};
