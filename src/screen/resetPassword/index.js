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
import {
  appColor,
  appConstant,
  imageConstant,
  alertMsgConstant,
} from "../../constant";
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
import { connect, useSelector } from "react-redux";
import { requestToResetPassword } from "./redux/Reset_Password.action";
import { requestToForgotPassword } from "../forgotPassword/redux/Forgot_Password.action";
import Loader from "@/components/Loader";

const ResetPassword = (props) => {
  const [error, setError] = React.useState({
    refCodeErr: "",
    newPasswordErr: "",
    confirmPasswordErr: "",
  });
  const [refCode, setRefCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const responseData = useSelector((state) => state.Reset_PasswordReducer);
  const responseDataResendCode = useSelector(state => state.Forgot_PasswordReducer)

  const [isClickEyeNewPassword, setIsClickEyeNewPassword] = useState(false);
  const [isClickEyeForConfirmPassword, setIsClickEyeForConfirmPassword] =
    useState(false);
  const onChangeRefCode = useCallback((text) => setRefCode(text), []);
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

  const resendCode = () => {
    props.requestToForgotPasswordAction({email: props.route.params.email, navigation: props.navigation, comeFrom: appConstant.RESER_PWD})

  };

  const onReset = () => {
    const validate = Validate(refCode, newPassword, confirmPassword);
    setError(
      validate !== "ok"
        ? validate
        : {
            refCodeErr: "",
            newPasswordErr: "",
            confirmPasswordErr: "",
          }
    );
    if (validate == "ok") {
      let email = props.route.params.email;
      props.requestToResetPasswordAction({
        refCode,
        email,
        newPassword,
        confirmPassword,
        navigation
      });

     // props.navigation.navigate(appConstant.RESER_PWD);
    }
  };
  function Validate(refCode, newPassword, confirmPassword) {
    let refCodeErr = "";
    let newPasswordErr = "";
    let confirmPasswordErr = "";

    if (refCode.trim() === "") {
      refCodeErr = alertMsgConstant.REF_CODE_NOT_EMPTY;
    }
    if (newPassword.trim() === "") {
      newPasswordErr = alertMsgConstant.PASSWORD_NOT_EMPTY;
    }
    if (confirmPassword.trim() === "") {
      confirmPasswordErr = alertMsgConstant.CONFIRM_PASSWORD_NOT_EMPTY;
    }

    if (refCodeErr == "" && newPasswordErr == "" && confirmPasswordErr == "") {
      if (newPassword != confirmPassword) {
        alert(alertMsgConstant.PASSWORD_NOT_EQUAL)
        return "no";
      }
      return "ok";
    } else {
      return {
        refCodeErr,
        newPasswordErr, 
        confirmPasswordErr
      };
    }
  }
  const onPressRight = () => {
    setIsClickEyeNewPassword(!isClickEyeNewPassword);
  };

  const onPressRightConfirm = () => {
    setIsClickEyeForConfirmPassword(!isClickEyeForConfirmPassword);
  };

  const backToLogin = () => {
    navigation.navigate(appConstant.LOGIN);
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
              label={"2FA Code"}
              value={refCode}
              onChangeText={onChangeRefCode}
              placeholder={"Enter 2FA Code"}
              icon={require("../../assets/images/ResetPasswordScreen/pincode.png")}
              iconStyle={styles.pinCodeIconStyle}
              error={error.refCodeErr}
              // keyboardType="numeric"
            />

            <View style={styles.viewForgotPass}>
              <TouchableOpacity onPress={resendCode}>
                <AppText text={"Resend Code"} style={styles.txtForgotPass} />
              </TouchableOpacity>
            </View>

            {/* {isClickEyeNewPassword ? ( */}
            <TextInputCustom
              secureTextEntry={isClickEyeNewPassword ? false : true}
              label={"newPassword"}
              value={newPassword}
              onChangeText={onChangeNewPassword}
              placeholder={"New Password"}
              icon={require("../../assets/images/LoginScreen/password.png")}
              eyeIcon={
                isClickEyeNewPassword
                  ? require("../../assets/images/LoginScreen/privacyEye.png")
                  : require("../../assets/images/ResetPasswordScreen/eyeSlash.png")
              }
              onPressRight={onPressRight}
              iconStyle={styles.passwordStyle}
              error={error.newPasswordErr}
            />

            <View style={{ height: hp("2.5%") }} />
            <TextInputCustom
              secureTextEntry={isClickEyeForConfirmPassword ? false : true}
              label={"confirmPassword"}
              value={confirmPassword}
              onChangeText={onChangeConfirmPassword}
              placeholder={"Confirm Password"}
              icon={require("../../assets/images/LoginScreen/password.png")}
              eyeIcon={
                isClickEyeForConfirmPassword
                  ? require("../../assets/images/LoginScreen/privacyEye.png")
                  : require("../../assets/images/ResetPasswordScreen/eyeSlash.png")
              }
              onPressRight={onPressRightConfirm}
              iconStyle={styles.passwordStyle}
              error={error.confirmPasswordErr}
            />
          </View>
          <View style={{ height: hp("3%") }} />

          <View style={styles.viewSocialMediaBtn}>
            <CustomButton
              title="Reset"
              onPress={onReset}
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
      {responseData.isRequesting || responseDataResendCode.isRequesting ? (
        <Loader loading={responseData.isRequesting || responseDataResendCode.isRequesting} />
      ) : null}
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {

    requestToForgotPasswordAction: (params) =>
    dispatch(requestToForgotPassword(params)),

    requestToResetPasswordAction: (params) =>
      dispatch(requestToResetPassword(params)),
  };
};

export default connect(null, mapDispatchToProps)(ResetPassword);
