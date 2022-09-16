import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  Image,
  BackHandler,
  TouchableOpacity,
  Platform,
} from "react-native";
import stylesCommon from "../../common/commonStyle";
import { StackActions } from "@react-navigation/native";

import { imageConstant, alertMsgConstant, appConstant } from "../../constant";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation, useFocusEffect } from "@react-navigation/core";
import { isEmailValid, isValidPassword } from "../../helper/validations";
import styles from "./style";
import { CustomButton } from "@/components/CustomButton";
import { AppText } from "@/components/AppText";
import Loader from "@/components/Loader";
import { TextInputCustom } from "@/components/TextInput";
import { connect, useSelector } from "react-redux";
import { requestToGetAccessToken } from "./redux/Login.action";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DeviceInfo from "react-native-device-info";

const hasError = (_err) => {
  return (
    Object.values(_err).filter((err) => err.toString().length > 0).length > 0
  );
};

const Login = (props) => {
  const { accessToken } = props;
  const [error, setError] = React.useState({
    emailErr: "",
    passwordErr: "",
  });
  // console.log('state.LoginReducer',props.LoginReducer);
  const [email, setEmail] = useState(
    process.env.NODE_ENV !== "production" ? "testemail@yopmail.com" : ""
  );
  const [password, setPassword] = useState(
    process.env.NODE_ENV !== "production" ? "Letmein12@" : ""
  );
  const [isClickEye, setIsClickEye] = useState(false);
  const loginResponse = useSelector((state) => state.LoginReducer);
  const navigation = useNavigation();

  const [DeviceToken, setDeviceToken] = useState();

  const [DeviceUuid, setDeviceUuid] = useState();
  const [DeviceName, setDeviceName] = useState();
  const [AppVersion, setAppVersion] = useState();

  useEffect(() => {
    DeviceInfo.getDeviceToken().then((deviceToken) => {
      setDeviceToken(deviceToken);
    });

    DeviceInfo.getDeviceName().then((device_name) => {
      setDeviceName(device_name);
    });

    DeviceInfo.syncUniqueId().then((uniqueId) => {
      setDeviceUuid(uniqueId);
    });

    let version = DeviceInfo.getVersion();
    setAppVersion(version);
  }, []);

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
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);

    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      if (accessToken) {
        const resetAction = StackActions.replace(appConstant.HOME);
        navigation.dispatch(resetAction);
      }
      return () => {};
    }, [])
  );

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

  console.log("accessToken =>", accessToken);

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
        device_token: 1234,
        device_type: Platform.OS === "android" ? 1 : 2,
        device_uuid: DeviceUuid,
        device_name: DeviceName,
        app_version: AppVersion,
        os_version: Platform.Version,
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
            {!hasError(error) && (
              <>
                <View style={{ height: hp("2.8%") }} />
              </>
            )}

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
              text={" App Vesrion 2.6"}
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
