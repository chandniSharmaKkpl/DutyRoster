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
import { appColor, appConstant, imageConstant, alertMsgConstant } from "../../constant";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { isEmailValid } from "../../helper/validations";
import { useNavigation } from "@react-navigation/core";
import styles from "./style";
import { CommonHeader } from "@/components/CommonHeader";
import { CustomButton } from "@/components/CustomButton";
import Loader from '@/components/Loader';
import { AppText } from "@/components/AppText";
import { TextInputCustom } from "@/components/TextInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { requestToForgotPassword } from "./redux/Forgot_Password.action";
import { connect, useSelector } from "react-redux";

const ForgotPassword = (props) => {
  
  const [error, setError] = React.useState({
    emailErr: ""
  });  
  
  const [email, setEmail] = useState("emp1@yopmail.com");
  const responseData = useSelector(state => state.Forgot_PasswordReducer)
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

   const validate = Validate(email);
   setError(
    validate !== "ok"
      ? validate
      : {
          emailErr: ""
                }
  );
  if (validate == "ok") {
    props.requestToForgotPasswordAction({email: email, navigation: props.navigation})
    props.navigation.navigate(appConstant.RESER_PWD);
  }
  };

  function Validate(email, password) {
    let emailErr = "";

    if (email.trim() === "") {
      emailErr = alertMsgConstant.EMAIL_NOT_EMPTY;
    } else if (!isEmailValid(email)) {
      emailErr = alertMsgConstant.EMAIL_NOT_VALID;
    }
    if (emailErr === "") {
      return "ok";
    } else {
      return {
        emailErr
            };
    }
  }

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
              error={error.emailErr}
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
      {responseData.isRequesting ? (
        <Loader loading={responseData.isRequesting} />
      ) : null}
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestToForgotPasswordAction: (params) =>
      dispatch(requestToForgotPassword(params)),
  };
};
export default connect(null, mapDispatchToProps)(ForgotPassword);
