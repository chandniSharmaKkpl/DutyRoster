import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  BackHandler,
  TouchableOpacity,
  Pressable,
} from "react-native";
import stylesCommon from "../../common/commonStyle";
import { Avatar } from "react-native-elements";
import { appColor, appConstant, imageConstant } from "../../constant";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/core";
import styles from "./style";
import { CommonHeader } from "@/components/CommonHeader";
import { CustomButton } from "@/components/CustomButton";
import { AppText } from "@/components/AppText";
import { TextInputCustom } from "@/components/TextInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ForgotPassword = (props) => {
  const initalErrorState = {
    email: null,
  };

  const [error, setError] = useState(initalErrorState);
  const [email, setEmail] = useState("");

  const navigation = useNavigation();
  const onChangeEmail = useCallback((text) => setEmail(text), []);

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

  const continueForgot = () => {
    navigation.navigate("ResetPassword");
  };

  const backToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <>
      <KeyboardAwareScrollView
        style={styles.scrollViewStyle}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
      >
        <View style={stylesCommon.container}>
          <View style={stylesCommon.imageContainer}>
            <Image
              resizeMode={"contain"}
              source={imageConstant.IMAGE_FORGOT_PWD_TOP}
            />
          </View>

          <View style={styles.forgotTextContainer}>
            <Text style={stylesCommon.titleText}>Forgot Password</Text>
          </View>
          <View style={styles.viewTxtInput}>
            <TextInputCustom
              label={"Email"}
              value={email}
              onChangeText={onChangeEmail}
              placeholder={"Enter Email Address"}
              icon={require("../../assets/images/LoginScreen/email-line.png")}
              iconStyle={styles.emailIconStyle}
              keyboardType="email-address"
            />
            <View style={{ height: hp("1%") }} />
          </View>
          <View style={styles.viewSocialMediaBtn}>
            <CustomButton
              onPress={continueForgot}
              title="Continue"
              styleBtn={stylesCommon.btnSocialMedia}
              styleTxt={stylesCommon.btnSocialMediaText}
            />
          </View>

          <TouchableOpacity onPress={backToLogin}>
            <Text style={styles.baseText}>
              Back to
              <Text style={styles.innerText}> Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

export default ForgotPassword;
