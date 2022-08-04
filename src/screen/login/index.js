import React, { useState, useCallback, useEffect } from "react";
import { View, Text, Image, BackHandler, TouchableOpacity } from "react-native";
import stylesCommon from "../../common/commonStyle";
import { imageConstant, alertMsgConstant } from "../../constant";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/core";
import { isEmailValid } from "../../helper/validations";
import styles from "./style";
import { CustomButton } from "@/components/CustomButton";
import { AppText } from "@/components/AppText";
import { TextInputCustom } from "@/components/TextInput";
import { connect } from "react-redux";
import { requestToGetAccessToken } from "./redux/Login.action";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Login = (props) => {
  const [userTemp, setUserTemp] = React.useState({
    email: "",
    password: "",
  });
  const [error, setError] = React.useState({
    emailErr: "",
    passwordErr: "",
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isClickEye, setIsClickEye] = useState(false);
  const [loading, setLoading] = React.useState(true);
  const [formErr, setFormError] = React.useState("");
  const navigation = useNavigation();
  const onChangeEmail = useCallback((text) => setEmail(text), []);
  const onChangePassword = useCallback((text) => setPassword(text), []);

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

  React.useEffect(() => {
    let isUserAvailable = false;
    const unsubscribe = props.navigation.addListener("focus", () => {
      setError({ emailErr: "", passwordErr: "" });
      if (!isUserAvailable) {
        setUserTemp({ email: "", password: "" });
      }
      setFormError("");
    });

    return unsubscribe;
  }, [error]);

  function Validate({ email, password }) {
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
      console.log("emailErr ==>", emailErr);
      console.log("passwordErr ==>", passwordErr);
      return {
        emailErr,
        passwordErr,
      };
    }
  }

  useEffect(() => {
    console.log("isClickEye =>", isClickEye);
  }, [isClickEye]);

  const onPressRight = () => {
    setIsClickEye(!isClickEye);
  };

  const moveBack = () => {
    props.navigation.goBack();
  };

  const googleSignin = () => {
    const validate = Validate(userTemp);

    setError(
      validate !== "ok"
        ? validate
        : {
            emailErr: "",
            passwordErr: "",
          }
    );

    props.requestToGetAccessTokenAction({ email, password });
    navigation.navigate("Start");
  };

  const goToForgotPassword = () => {
    navigation.navigate("ForgotPassword");
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
            />
            <View style={{ height: hp("2.5%") }} />

            {isClickEye ? (
              <TextInputCustom
                secureTextEntry={false}
                label={"Password"}
                value={password}
                onChangeText={onChangePassword}
                placeholder={"Enter Password"}
                icon={require("../../assets/images/LoginScreen/password.png")}
                eyeIcon={require("../../assets/images/LoginScreen/privacyEye.png")}
                onPressRight={onPressRight}
                iconStyle={styles.passwordStyle}
                error={error.passwordErr}
              />
            ) : (
              <TextInputCustom
                secureTextEntry={true}
                label={"Password"}
                value={password}
                onChangeText={onChangePassword}
                placeholder={"Enter Password"}
                icon={require("../../assets/images/LoginScreen/password.png")}
                eyeIcon={require("../../assets/images/ResetPasswordScreen/eyeSlash.png")}
                onPressRight={onPressRight}
                iconStyle={styles.passwordStyle}
                error={error.passwordErr}
              />
            )}
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
              onPress={googleSignin}
              styleBtn={stylesCommon.btnSocialMedia}
              styleTxt={stylesCommon.btnSocialMediaText}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};



const mapDispatchToProps = (dispatch) => {
  return {
    requestToGetAccessTokenAction: (params) =>
      dispatch(requestToGetAccessToken(params)),
  };
};
export default connect(null, mapDispatchToProps)(Login);
