import React, { useState, useCallback, useEffect } from "react";
import { View, FlatList } from "react-native";
import { AppText } from "@/components/AppText";
import { appColor, fontConstant } from "@/constant";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Shift = (props) => {
  const { availabilityData } = props;

  var arrayDates = Object.keys(availabilityData);
  const renderItem = ({ item }) => {
    var arrayTimes = [];

    if (!Array.isArray(availabilityData[item])) {
      arrayTimes = availabilityData[item].times;
    }

    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: wp("5%"),
          }}
        >
          {arrayTimes && arrayTimes.length > 0 ? (
            <AppText text={item} style={styles.txtRow} />
          ) : null}

          {/* Districts  */}
          {arrayTimes && arrayTimes.length > 0 ? (
            <View style={styles.viewColumn}>
              {arrayTimes.map((dataObj) => {
                return (
                  <AppText text={dataObj.district_name} style={styles.txtRow} />
                );
              })}
            </View>
          ) : null}

          {/* InTime  */}
          {arrayTimes && arrayTimes.length > 0 ? (
            <View style={styles.viewColumn}>
              {arrayTimes.map((dataObj) => {
                return (
                  <AppText text={dataObj.start_time} style={styles.txtRow} />
                );
              })}
            </View>
          ) : null}

          {/* OutTime */}
          {arrayTimes && arrayTimes.length > 0 ? (
            <View style={styles.viewColumn}>
              {arrayTimes.map((dataObj) => {
                return (
                  <AppText text={dataObj.end_time} style={styles.txtRow} />
                );
              })}
            </View>
          ) : null}
        </View>
        <View style={styles.singleLine} />
      </View>
    );
  };
  return (
    <View style={styles.viewOuter}>
      <View style={{ paddingHorizontal: wp("5%") }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <AppText text={"DATE"} style={styles.txtRed} />
          <AppText text={"DISTRICTS"} style={styles.txtRed} />
          <AppText text={"IN"} style={styles.txtRed} />
          <AppText text={"OUT"} style={styles.txtRed} />
        </View>
      </View>
      <View style={styles.singleLine} />
      <View style={{}}>
        <FlatList
          data={arrayDates}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export const styles = {
  singleLine: {
    marginVertical: "1%",
    backgroundColor: appColor.GRAY,
    width: "100%",
    height: "0.1%",
  },
  viewColumn: {
    // padding: "2%",
    //  width: wp('40%'),
    // backgroundColor: appColor.LIGH_ORANGE,
  },
  viewOuter: {
    backgroundColor: appColor.WHITE,
    borderWidth: 1,
    borderColor: "#D2D2D2",
    borderRadius: 10,
    shadowColor: "#0000001A",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 22,
    shadowRadius: 4.65,
  },
  txtRed: {
    fontFamily: fontConstant.FONT_SEMI_BOLD,
    fontSize: fontConstant.TEXT_17_SIZE_REGULAR,
    color: appColor.RED,
    paddingVertical: hp("1%"),
    // paddingHorizontal:wp("1%")
  },
  txtRow: {
    fontFamily: fontConstant.FONT_SEMI_BOLD,
    fontSize: fontConstant.TEXT_11_SIZE_REGULAR,
    color: appColor.GRAY,
    paddingVertical: hp("1%"),
    // paddingHorizontal:wp("1%")
  },
};
export default Shift;
