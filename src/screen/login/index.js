import React, { useState, useCallback, useEffect } from "react";
import { View, Text, Image, BackHandler, TouchableOpacity } from "react-native";
import stylesCommon from "../../common/commonStyle";
import { StackActions } from "@react-navigation/native";

import { imageConstant, alertMsgConstant, appConstant } from "../../constant";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/core";
import { isEmailValid, isValidPassword } from "../../helper/validations";
import styles from "./style";
import { CustomButton } from "@/components/CustomButton";
import { AppText } from "@/components/AppText";
import Loader from "@/components/Loader";
import { TextInputCustom } from "@/components/TextInput";
import { connect, useSelector } from "react-redux";
import { requestToGetAccessToken } from "./redux/Login.action";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Login = (props) => {
  const { accessToken } = props;
  const [error, setError] = React.useState({
    emailErr: "",
    passwordErr: "",
  });
  // console.log('state.LoginReducer',props.LoginReducer);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

//windodee1@yopmail.com
//Test@123
  const [isClickEye, setIsClickEye] = useState(false);
  const loginResponse = useSelector((state) => state.LoginReducer);
  const navigation = useNavigation();
  const onChangeEmail = (text) => {
    setEmail(text);
  };
  const onChangePassword = (text) => {
    setPassword(text);
  };

  const handleBackButtonClick = () => {
    // moveBack();
    BackHandler.exitApp();
    return true;
  };
  useEffect(() => {
    if (accessToken) {
      const resetAction = StackActions.replace(appConstant.HOME);
      navigation.dispatch(resetAction);
    }
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);

    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);

  function Validate(email, password) {
    let emailErr = "";
    let passwordErr = "";

    if (email.trim() === "") {
      emailErr = alertMsgConstant.EMAIL_NOT_EMPTY;
    } else if (!isEmailValid(email)) {
      emailErr = alertMsgConstant.EMAIL_NOT_VALID;
    }

    if (password.trim() === "") {
      passwordErr = alertMsgConstant.PASSWORD_NOT_EMPTY;
    }

    if (emailErr === "" && passwordErr === "") {
      return "ok";
    } else {
      return {
        emailErr,
        passwordErr,
      };
    }
  }

  useEffect(() => {}, [isClickEye]);

  const onPressRight = () => {
    setIsClickEye(!isClickEye);
  };

  const moveBack = () => {
    props.navigation.goBack();
  };

  const onClickSignIn = () => {
    const validate = Validate(email, password);
    setError(
      validate !== "ok"
        ? validate
        : {
            emailErr: "",
            passwordErr: "",
          }
    );

    if (validate == "ok") {
      props.requestToGetAccessTokenAction({
        email: email,
        password: password,
        navigation: navigation,
      });
    }
  };

  const goToForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  const goToSignup = () => {
    navigation.navigate("Signup");
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
              source={imageConstant.IMAGE_LOGIN_TOP}
              // style={styles.image}
            />
          </View>

          <View style={styles.loginTextContainer}>
            <Text style={stylesCommon.titleText}>Login!</Text>
          </View>

          <View style={styles.viewTxtInput}>
            <TextInputCustom
              label={"Email"}
              value={email}
              onChangeText={onChangeEmail}
              placeholder={"Enter Email Address"}
              icon={require("../../assets/images/LoginScreen/email-line.png")}
              iconStyle={styles.emailIconStyle}
              error={error.emailErr}
              keyboardType="email-address"
              caretHidden={false}
            />
            <View style={{ height: hp("2.8%") }} />

            <TextInputCustom
              secureTextEntry={isClickEye ? false : true}
              label={"Password"}
              value={password}
              onChangeText={onChangePassword}
              placeholder={"Enter Password"}
              icon={require("../../assets/images/LoginScreen/password.png")}
              rightIcon={
                isClickEye
                  ? require("../../assets/images/ResetPasswordScreen/eyeSlash.png")
                  : require("../../assets/images/LoginScreen/privacyEye.png")
              }
              onPressRight={onPressRight}
              iconStyle={styles.passwordStyle}
              error={error.passwordErr}
            />
          </View>

          <View style={styles.viewForgotPass}>
            <TouchableOpacity onPress={goToForgotPassword}>
              <AppText
                text={"Forgot my password?"}
                style={styles.txtForgotPass}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.viewSocialMediaBtn}>
            <CustomButton
              title="Sign In"
              onPress={onClickSignIn}
              styleBtn={stylesCommon.btnSocialMedia}
              styleTxt={stylesCommon.btnSocialMediaText}
            />
          </View>

          <View style={{ ...styles.viewSignUp, flexDirection: "row" }}>
            <AppText text={"Don't have an Account?"} style={styles.txtSignup} />
            <TouchableOpacity onPress={goToSignup}>
              <AppText
                text={" Signup"}
                style={{ ...styles.txtSignup, color: "#BD2529" }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.versionContainer}>
            <AppText
              text={" App Vesrion 2.1"}
              style={{ ...styles.appVersion }}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
      {loginResponse.isRequestingLoader ? (
        <Loader loading={loginResponse.isRequestingLoader} />
      ) : null}
    </>
  );
};
const mapStateToProps = (state) => ({
  accessToken: state.LoginReducer.accessToken,
  // LoginReducer: state.LoginReducer

});
const mapDispatchToProps = (dispatch) => {
  return {
    requestToGetAccessTokenAction: (params) =>
      dispatch(requestToGetAccessToken(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
