import React, { useState, useCallback, useEffect } from "react";
import { View, BackHandler, Text } from "react-native";
import stylesCommon from "../../common/commonStyle";
import styles from "./style";
import { AppText } from "@/components/AppText";
import { useRoute, useNavigation } from "@react-navigation/core";
import { CustomButton } from "@/components/CustomButton";
import { TouchableOpacity } from "react-native-gesture-handler";
import { appConstant, imageConstant } from "@/constant";
import { CommonHeader } from "@/components";
import { TextInputCustom } from "@/components/TextInput";

const Unavailablity = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
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
      <View style={[styles.container]}>
        <View style={styles.viewTopTitle}>
          <AppText
            style={styles.txtUnavailablity}
            text={appConstant.AVAILABLE_DATE}
          />
          <TextInputCustom
            placeholder={appConstant.CHOOSE_DATE}
            rightIcon={imageConstant.IMAGE_DATE_PICKER_IMAGE}
            rightIconStyle={styles.rightIconStyle}
            inputViewStyle={{backgroundColor : 'white', borderColor : 'white'}}
          />
        </View>

        <View style={styles.viewTopTitle}>
          <AppText
            style={styles.txtUnavailablity}
            text={appConstant.TIME}
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TextInputCustom
            placeholder={appConstant.IN_TIME}
            inputViewStyle={{width : '40%', backgroundColor : 'white', borderColor : 'white'}}
            // rightIcon={imageConstant.IMAGE_DATE_PICKER_IMAGE}
            // rightIconStyle={styles.rightIconStyle}
            />
          <TextInputCustom
            placeholder={appConstant.OUT_TIME}
            inputViewStyle={{width : '40%', backgroundColor : 'white', borderColor : 'white' }}
            // rightIcon={imageConstant.IMAGE_DATE_PICKER_IMAGE}
            // rightIconStyle={styles.rightIconStyle}
          />
          <View style={styles.addTimeIconContainer}>
            <Text style={styles.iconText}>+</Text>
          </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default Unavailablity;
