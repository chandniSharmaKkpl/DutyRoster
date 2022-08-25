import React, { useState, useCallback, useEffect } from "react";
import { View, BackHandler , Keyboard } from "react-native";
import stylesCommon from "../../common/commonStyle";
import styles from "./style";
import { AppText } from "@/components/AppText";
import { useRoute, useNavigation } from "@react-navigation/core";
import { CustomButton } from "@/components/CustomButton";
import { TouchableOpacity } from "react-native-gesture-handler";
import { appConstant, imageConstant } from "@/constant";
import { CommonHeader } from "@/components";
import { TextInputCustom } from "@/components/TextInput";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

const Unavailablity = (props) => {
  const navigation = useNavigation();
  const route = useRoute();


  const [unavailablityDate, setUnavailablityDate] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const onChangeUnavailablityDate = useCallback((text) => setUnavailablityDate(text), []);

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

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    // console.warn("A date has been picked: ", date);
    setUnavailablityDate(moment(date).format("YYYY-MM-DD"));
    hideDatePicker();
  };

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
            text={appConstant.UNAVAILABLE_DATE}
          />
              {/* <Pressable onPress={showDatePicker} style={{width: '100%'}}> */}
              <TextInputCustom
                label={"Choose Unavailable Date"}
                value={unavailablityDate}
                onChangeText={onChangeUnavailablityDate}
                // rightIcon={require("../../assets/images/SignupScreen/calendar.png")}
                placeholder={appConstant.CHOOSE_DATE}
                rightIcon={imageConstant.IMAGE_DATE_PICKER_IMAGE}
                rightIconStyle={{height:20}}
                onPressRight={showDatePicker}
                onPressIn={showDatePicker}
                onPressFocus={()=> Keyboard.dismiss()}
                
              />
          {/* <TextInputCustom
            placeholder={appConstant.CHOOSE_DATE}
            rightIcon={imageConstant.IMAGE_DATE_PICKER_IMAGE}
            rightIconStyle={styles.rightIconStyle}
          /> */}
        </View>
        <TouchableOpacity onPress={goToLogin} style={styles.btnTransparant}>
          <AppText style={styles.txtBtnTry} text={"Back To Login"} />
        </TouchableOpacity>
      </View>
      {isDatePickerVisible && (
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      )}
    </>
  );
};

export default Unavailablity;
