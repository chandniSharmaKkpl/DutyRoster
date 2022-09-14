import React, { useState, useCallback, useEffect } from "react";
import { View, FlatList,Text } from "react-native";
import { AppText } from "@/components/AppText";
import { appColor, fontConstant } from "@/constant";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Shift = (props) => {
  const { availabilityData } = props;

  console.log("availabilityData", availabilityData);
  var arrayDates = Object.keys(availabilityData);
  const renderItem = ({ item, index }) => {
    var arrayTimes = [];

    if (!Array.isArray(availabilityData[item])) {
      arrayTimes = availabilityData[item].times;
      // console.log("arrayTimes", arrayTimes);
      if (!arrayTimes) {
        return <></>;
      }
    } else {
      return <></>;
    }

    return (
      <View
        style={[
          styles.row,
          { borderBottomWidth: index === arrayDates.length - 1 ? 0 : 1 },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: wp("5%"),
          }}
        >
          {arrayTimes && arrayTimes.length > 0 ? (
            <AppText text={item} style={[styles.txtRow, styles.centerText]} />
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
  row: {
    borderColor: "#D2D2D2",
    borderBottomWidth: 1,
  },
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
    // borderWidth: 1,
    borderRadius: 10,
    shadowColor: "#0000001A",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 22,
    shadowRadius: 4.65,
    paddingBottom: "3%",
  },
  txtRed: {
    fontFamily: fontConstant.FONT_SEMI_BOLD,
    fontSize: fontConstant.TEXT_18_SIZE_REGULAR,
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
  centerText: {
    // backgroundColor: appColor.RED,
    display: "flex",
    alignItems: "center",
    alignSelf: "center",
  },
};
export default Shift;
