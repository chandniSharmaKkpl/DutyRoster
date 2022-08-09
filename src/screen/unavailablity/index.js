import React, { useState, useCallback, useEffect } from "react";
import { View, BackHandler } from "react-native";
import stylesCommon from "../../common/commonStyle";
import styles from './style'
import { AppText } from "@/components/AppText";
import { useRoute, useNavigation } from "@react-navigation/core";
import { CustomButton } from "@/components/CustomButton";
import { TouchableOpacity } from "react-native-gesture-handler";
import { appConstant } from "@/constant";
import { CommonHeader } from "@/components";

const Unavailablity = (props) => {
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

  const onGoBack = () => {
    navigation.navigate(appConstant.ROASTER);
  };

  const goToRegistration = () => {};

  return (
    <>
      <CommonHeader screenName={route?.name} onGoBack={onGoBack} />
      <View style={[stylesCommon.container, styles.container]}>
        <View style={styles.viewTop} />

        <View style={styles.viewBottom}>
          <AppText
            style={styles.txtBtnGetStart}
            text={"Coming Soon UNAVAILABILITY"}
          ></AppText>

          <TouchableOpacity onPress={goToLogin} style={styles.btnTransparant}>
            <AppText style={styles.txtBtnTry} text={"Back To Login"} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Unavailablity;
