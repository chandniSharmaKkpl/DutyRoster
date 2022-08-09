import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  BackHandler,
  Pressable,
  Image,
  Text,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import styles from "./style";
import { AppText } from "@/components/AppText";
import { useRoute, useNavigation } from "@react-navigation/core";
import { CustomButton } from "@/components/CustomButton";
import { alertMsgConstant, appConstant, imageConstant } from "@/constant";
import { CommonHeader } from "@/components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import commonStyle from "../../common/commonStyle";
import { TextInputCustom } from "@/components/TextInput";
import { isEmailValid } from "@/helper/validations";
import { navigationRef } from "@/navigators/utils";
import UploadImage from "@/components/uploadImage";

const EditProfile = (props) => {
  const navigation = useNavigation();
  const route = useRoute();

  const [error, setError] = React.useState({
    firstName: "",
    lasttName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [firstName, setFirstName] = useState("Kevin");
  const [lasttName, setLasttName] = useState("Devid");
  const [email, setEmail] = useState("email@gmail.com");
  const [password, setPassword] = useState("12345678");
  const [confirmPassword, setConfirmPassword] = useState("12345678");
  const [onOpenMediaPicker, setOnOpenMediaPicker] = useState(false);
  const onChangeFirstName = useCallback((text) => setFirstName(text), []);
  const onChangeLastName = useCallback((text) => setLasttName(text), []);
  const onChangeEmail = useCallback((text) => setEmail(text), []);
  const onChangePassword = useCallback((text) => setPassword(text), []);
  const onChangeConfirmPassword = useCallback(
    (text) => setConfirmPassword(text),
    []
  );

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

  function Validate(firstName, lasttName, email, password, confirmPassword) {
    let firstNameErr = "";
    let lasttNameErr = "";
    let emailErr = "";
    let passwordErr = "";
    let confirmPasswordErr = "";

    if (firstName.trim() === "") {
      firstNameErr = alertMsgConstant.FIRST_NAME_EMPTY;
    }
    if (lasttName.trim() === "") {
      lasttNameErr = alertMsgConstant.LAST_NAME_EMPTY;
    }
    if (email.trim() === "") {
      emailErr = alertMsgConstant.EMAIL_NOT_EMPTY;
    } else if (!isEmailValid(email)) {
      emailErr = alertMsgConstant.EMAIL_NOT_VALID;
    }
    if (password.trim() === "") {
      passwordErr = alertMsgConstant.PASSWORD_NOT_EMPTY;
    }
    if (confirmPassword.trim() === "") {
      confirmPasswordErr === alertMsgConstant.CONFIRM_PASSWORD_NOT_EMPTY;
    }

    if (
      firstNameErr == "" &&
      lasttNameErr == "" &&
      emailErr == "" &&
      passwordErr == "" &&
      confirmPasswordErr == ""
    ) {
      if (password != confirmPassword) {
        alert(alertMsgConstant.PASSWORD_NOT_EQUAL);
        return "no";
      }
      return "ok";
    } else {
      return {
        firstNameErr,
        lasttNameErr,
        emailErr,
        passwordErr,
        confirmPasswordErr,
      };
    }
  }

  const moveBack = () => {
    props.navigation.goBack();
  };

  const goToLogin = () => {
    props.navigation.navigate(appConstant.LOGIN);
  };

  const onGoBack = () => {
    navigation.navigate(appConstant.ROASTER);
  };

  const openMediaPicker = () => {
    setOnOpenMediaPicker(true);
  };

  const onSubmit = () => {
    const validate = Validate(
      firstName,
      lasttName,
      email,
      password,
      confirmPassword
    );
    setError(
      validate !== "ok"
        ? validate
        : {
            firstNameErr: "",
            lasttNameErr: "",
            emailErr: "",
            passwordErr: "",
            confirmPasswordErr: "",
          }
    );
    if (validate == "ok") {
      navigationRef.navigate(appConstant.ROASTER);
    }
  };

  return (
    <>
      <CommonHeader onGoBack={onGoBack} screenName={route?.name} />
      <KeyboardAwareScrollView
        style={commonStyle.scrollViewStyle}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
      >
        <Pressable onPress={() => Keyboard.dismiss()}>
          {onOpenMediaPicker ? (
            <UploadImage
              onOpenMediaPicker={onOpenMediaPicker}
              setOnOpenMediaPicker={setOnOpenMediaPicker}
            />
          ) : null}
          <View style={[styles.container]}>
            <View style={styles.viewTopTitle}>
              <AppText
                style={styles.txtEditProfile}
                text={appConstant.EDIT_PROFILE}
              ></AppText>
            </View>
            <Pressable style={styles.imageContainer}>
              <Image
                resizeMode={"contain"}
                source={imageConstant.IMAGE_EDIT_PROFILE_ICON}
                style={styles.editImage}
              />
              <TouchableOpacity
                style={styles.cameraIconContainer}
                onPress={() => openMediaPicker()}
              >
                <Image
                  resizeMode={"contain"}
                  source={imageConstant.IMAGE_CAMERA_ICON}
                  style={styles.cameraIcon}
                />
              </TouchableOpacity>
            </Pressable>
            <View style={styles.textInputContainer}>
              <Text style={styles.inputTextTitle}>First Name</Text>
              <TextInputCustom
                label={"First Name"}
                value={firstName}
                onChangeText={onChangeFirstName}
                // placeholder={"First Name"}
                error={error.firstNameErr}
              />
              <Text style={styles.inputTextTitle}>Last Name</Text>
              <TextInputCustom
                label={"Last Name"}
                value={lasttName}
                onChangeText={onChangeLastName}
                // placeholder={"Last Name"}
                error={error.lasttNameErr}
              />
              <Text style={styles.inputTextTitle}>Email Address</Text>
              <TextInputCustom
                label={"Email Address"}
                value={email}
                onChangeText={onChangeEmail}
                // placeholder={"Email Address"}
                error={error.emailErr}
              />
              <View style={styles.passwordContainer}>
                <View>
                  <Text style={styles.inputTextTitle}>Password</Text>
                  <TextInputCustom
                    secureTextEntry={true}
                    label={"Password"}
                    value={password}
                    onChangeText={onChangePassword}
                    // placeholder={"Password"}
                    error={error.passwordErr}
                    inputViewStyle={styles.passwordInput}
                  />
                </View>
                <View>
                  <Text style={styles.inputTextTitle}>Confirm Password</Text>
                  <TextInputCustom
                    secureTextEntry={true}
                    label={"Confirm Password"}
                    value={confirmPassword}
                    onChangeText={onChangeConfirmPassword}
                    // placeholder={"Confirm Password"}
                    error={error.confirmPasswordErr}
                    inputViewStyle={styles.passwordInput}
                  />
                </View>
              </View>
              <View style={styles.btnContainer}>
                <CustomButton
                  title="Save"
                  onPress={onSubmit}
                  styleBtn={styles.savaBtn}
                  styleTxt={styles.btnSaveText}
                />
              </View>
            </View>
          </View>
        </Pressable>
      </KeyboardAwareScrollView>
    </>
  );
};

export default EditProfile;
