import React, { useState, useCallback, useEffect } from "react";
import { View, BackHandler, Pressable, Image, Text, Keyboard, TouchableOpacity, Dimensions, FlatList, TouchableWithoutFeedback } from "react-native";
import stylesCommon from "../../common/commonStyle";
import styles from "./style";
import ImagePicker from "react-native-image-crop-picker";
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
import Modal from "react-native-modal";

const { height, width } = Dimensions.get("screen");
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
  const [onopenmediaPicker, setonopenmediaPicker] = useState(false);
  const [options, setoptions] = React.useState([
    {
    //   image: require("../../assets/Swipe.png"),
      title: alertMsgConstant.CAPTURE_IMAGE,
      id: 0,
    },
    {
    //   image: require("../../assets/Swipe.png"),
      title: alertMsgConstant.SELECT_PHOTO_FROM_LIBRARY,
      id: 1,
    },
  ]);

  const onChangeFirstName = useCallback((text) => setFirstName(text), []);
  const onChangeLastName = useCallback((text) => setLasttName(text), []);
  const onChangeEmail = useCallback((text) => setEmail(text), []);
  const onChangePassword = useCallback((text) => setPassword(text), []);
  const onChangeConfirmPassword = useCallback(
    (text) => setConfirmPassword(text),
    []
  );

  const closemediaPicker = () => {
    setonopenmediaPicker(false);
  };

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



  const ONopenmediaPicker = () => { 
    return onopenmediaPicker == true ? (
      <Modal
        backdropColor="rgba(52, 52, 52, 0.8)"
        backdropOpacity={1}
        animationType="slide"
        transparent={true}
        isVisible={onopenmediaPicker}
        onRequestClose={() => {
          closemediaPicker(false);
        }}
        onBackdropPress={() => {
          closemediaPicker(false);
        }}
      >
        <View style={styles.modalmediaopen}>
          <View style={styles.titleviewstyle}>
            <Text style={[styles.choosefilestyle, { fontWeight: "bold" }]}>
              {alertMsgConstant.CHOOSE_FILE_TO_UPLOAD}
            </Text>
            <View style={styles.lineStyle}></View>
            <View
              style={{
                height: width * 0.25,
              }}
            >
              <FlatList
                style={[styles.renderMimetypeImagemainView]}
                data={options}
                renderItem={({ item, index }) => renderOptionsview(item, index)}
                bounces={false}
                showsVerticalScrollIndicator={false}
                listKey={(item, index) => "D" + index.toString()}
                keyExtractor={(item, index) => "D" + index.toString()}
              />
            </View>
          </View>
        </View>
      </Modal>
    ) : null;
  }

  const renderOptionsview = (item, index) => {
    return (
      <View style={{ marginTop: height * 0.002 }}>
        <TouchableWithoutFeedback onPress={() => onselectOptions(item)}>
          <View style={styles.viewPopupStyle}>
            {item.title == 'Take Photo' ? (
              <Image
                resizeMethod="resize"
                style={styles.imagePopupStyle}
                // source={require("../../assets/camera.png")}
              ></Image>
            ) : (
              <Image
                resizeMethod="resize"
                style={styles.imagePopupStyle}
                // source={require("../../assets/gallery.png")}
              ></Image>
            )}

            <Text style={styles.textStylePopup}>{item.title}</Text>
          </View>
        </TouchableWithoutFeedback>
        {index < 1 ? <View style={styles.lineStyle1}></View> : null}
      </View>
    );
  };

  const captureImage = () => {

  }

  const chooseMedia = () => {
    ImagePicker.openPicker({
      cropping: true,
      mediaType: "photo",
      width: 500,
      height: 500,
      forceJpg: true,
      cropperCircleOverlay: true,
      compressImageMaxWidth: 640,
      compressImageMaxHeight: 480,
      freeStyleCropEnabled: true,
    })
  }

  const onselectOptions = (item) => {
    closemediaPicker(false);
    setTimeout(() => {
      if (item.title == 'Take Photo') {
        captureImage();
      } else if (
        item.title == alertMsgConstant.SELECT_PHOTO_FROM_LIBRARY
      ) {
        chooseMedia();
      }
    }, 1000);
  };

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

  const openmediaPicker = () => {
    setonopenmediaPicker(true);
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
      // props.navigation.navigate(appConstant.TIMESHEETS);
      navigationRef.navigate(appConstant.ROASTER)
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
        {ONopenmediaPicker()}

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

            <View style={styles.cameraIconContainer}>
              <Image resizeMode={'contain'}
              source={imageConstant.IMAGE_CAMERA_ICON} 
              style={styles.cameraIcon}
              />
            </View>
            <TouchableOpacity
                    style={{
                      height: width * 0.075,
                      width: width * 0.075,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: (width * 0.1) / 2,
                      left: 33,
                      marginTop: -height * 0.038,
                      backgroundColor: "white",
                    }}
                    onPress={() => openmediaPicker()}
                  >
                   
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
