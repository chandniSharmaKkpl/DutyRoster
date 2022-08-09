import React, { useState, useCallback, useEffect, useRef } from "react";
import { View, BackHandler, FlatList, Dimensions } from "react-native";
import stylesCommon from "../../common/commonStyle";
import styles from "./style";
import { AppText } from "@/components/AppText";
import { useRoute, useNavigation } from "@react-navigation/core";
import { CustomButton } from "@/components/CustomButton";
import { TouchableOpacity } from "react-native-gesture-handler";
import { PageControlAleppo } from "react-native-chi-page-control";
import { appColor, appConstant } from "@/constant";
import { CommonHeader } from "@/components";

const width = Dimensions.get("screen").width;

const TimeSheetScreen = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  console.log("'route ==>", route.name);

  const handleBackButtonClick = () => {
    moveBack();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);

    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);
  const moveBack = () => {
    props.navigation.goBack();
  };


  const goToLogin = () => {
    props.navigation.navigate(appConstant.LOGIN);
  };

  return (
    <>
    <CommonHeader screenName={route?.name} />
      <View style={[stylesCommon.container, styles.container]}>
        {/* <ImageBackground style={styles.container}> */}
        <View style={styles.viewTop} />

        <View style={styles.viewBottom}>
          <AppText
            style={styles.txtBtnGetStart}
            text={"Coming Soon Timesheet"}
          ></AppText>

          <TouchableOpacity onPress={goToLogin} style={styles.btnTransparant}>
            <AppText style={styles.txtBtnTry} text={"Back To Login"} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default TimeSheetScreen;
