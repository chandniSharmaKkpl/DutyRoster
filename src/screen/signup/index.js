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

const Signup = (props) => {
  const initalErrorState = {
    email: null,
    password: null,
  };
  const [isShowPwd, setIsShowPwd] = useState(false);
  const [error, setError] = useState(initalErrorState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
  const moveBack = () => {
    props.navigation.goBack();
  };

  const googleSignin = () => {};

  const fbSignin = () => {};

  const goToForgotPassword = () => {};

  const goToSignup = () => {};

  return (
    <>
      <View style={stylesCommon.container}>
        <CommonHeader leftTitle={"Create account"} rightTitle={"Next"} />

        <AppText text={"Signin with email"} style={styles.textSignin} />

        <View style={styles.viewTxtInput}>
          <TextInputCustom
            label={"Email"}
            value={email}
            onChangeText={onChangeEmail}
            placeholder={"Email"}
          />
          <View style={{ height: hp("1%") }} />
          <TextInputCustom
            label={"Password"}
            value={password}
            onChangeText={onChangePassword}
            placeholder={"Password"}
          />
        </View>

        
        <AppText text={"or"} style={styles.textSignin} />
        <View style={styles.viewSocialMediaBtn}>
          <CustomButton
            title="Continue with google"
            onPress={googleSignin}
            styleBtn={styles.btnSocialMedia}
          />
          <CustomButton
            title="Continue with facebook"
            onPress={fbSignin}
            styleBtn={styles.btnSocialMedia}
          />
        </View>

       
      </View>
    </>
  );
};

export default Signup;
