import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  BackHandler,
  TouchableOpacity,
} from "react-native";
import stylesCommon from "../../common/commonStyle";
import { Avatar } from "react-native-elements";
import { appColor, appConstant, imageConstant } from "../../constant";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import styles from "./style";
import { CommonHeader } from "@/components/CommonHeader";
import { CustomButton } from "@/components/CustomButton";
import { AppText } from "@/components/AppText";
import { TextInputCustom } from "@/components/TextInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/core";

const ResetPassword = (props) => {
  const initalErrorState = {
    email: null,
    password: null,
  };
  const [error, setError] = useState(initalErrorState);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isClickEyeNewPassword, setIsClickEyeNewPassword] = useState(false);
  const [isClickEyeForConfirmPassword, setIsClickEyeForConfirmPassword] =
    useState(false);
  const onChangeEmail = useCallback((text) => setEmail(text), []);
  const onChangeNewPassword = useCallback((text) => setNewPassword(text), []);
  const onChangeConfirmPassword = useCallback(
    (text) => setConfirmPassword(text),
    []
  );
  const navigation = useNavigation();
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

  const googleSignin = () => {};

  const fbSignin = () => {};

  const resendCode = () => {};

  const goToSignup = () => {};

  const onPressRight = () => {
    setIsClickEyeNewPassword(!isClickEyeNewPassword);
  };

  const onPressRightConfirm = () => {
    setIsClickEyeForConfirmPassword(!isClickEyeForConfirmPassword);
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
              source={imageConstant.IMAGE_RESER_PWD_TOP}
            />
          </View>

          <View style={styles.loginTextContainer}>
            <Text style={stylesCommon.titleText}>Reset Password</Text>
          </View>

          <View style={styles.viewTxtInput}>
            <TextInputCustom
              label={"Email"}
              value={email}
              onChangeText={onChangeEmail}
              placeholder={"Enter 2FA Code"}
              icon={require("../../assets/images/ResetPasswordScreen/pincode.png")}
              iconStyle={styles.pinCodeIconStyle}
            />

            <View style={styles.viewForgotPass}>
              <TouchableOpacity onPress={resendCode}>
                <AppText text={"Resend Code"} style={styles.txtForgotPass} />
              </TouchableOpacity>
            </View>

            {isClickEyeNewPassword ? (
              <TextInputCustom
                secureTextEntry={false}
                label={"newPassword"}
                value={newPassword}
                onChangeText={onChangeNewPassword}
                placeholder={"New Password"}
                icon={require("../../assets/images/LoginScreen/password.png")}
                eyeIcon={require("../../assets/images/LoginScreen/privacyEye.png")}
                onPressRight={onPressRight}
                iconStyle={styles.passwordStyle}
              />
            ) : (
              <TextInputCustom
                secureTextEntry={true}
                label={"newPassword"}
                value={newPassword}
                onChangeText={onChangeNewPassword}
                placeholder={"New Password"}
                icon={require("../../assets/images/LoginScreen/password.png")}
                eyeIcon={require("../../assets/images/ResetPasswordScreen/eyeSlash.png")}
                onPressRight={onPressRight}
                iconStyle={styles.passwordStyle}
              />
            )}

            <View style={{ height: hp("2.5%") }} />

            {isClickEyeForConfirmPassword ? (
              <TextInputCustom
                secureTextEntry={false}
                label={"confirmPassword"}
                value={confirmPassword}
                onChangeText={onChangeConfirmPassword}
                placeholder={"Confirm Password"}
                icon={require("../../assets/images/LoginScreen/password.png")}
                eyeIcon={require("../../assets/images/LoginScreen/privacyEye.png")}
                onPressRight={onPressRightConfirm}
                iconStyle={styles.passwordStyle}
              />
            ) : (
              <TextInputCustom
                secureTextEntry={true}
                label={"confirmPassword"}
                value={confirmPassword}
                onChangeText={onChangeConfirmPassword}
                placeholder={"Confirm Password"}
                icon={require("../../assets/images/LoginScreen/password.png")}
                eyeIcon={require("../../assets/images/ResetPasswordScreen/eyeSlash.png")}
                onPressRight={onPressRightConfirm}
                iconStyle={styles.passwordStyle}
              />
            )}
          </View>
          <View style={{ height: hp("3%") }} />

          <View style={styles.viewSocialMediaBtn}>
            <CustomButton
              title="Reset"
              onPress={googleSignin}
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

export default ResetPassword;
