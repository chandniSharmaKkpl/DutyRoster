import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  Image,
  BackHandler,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import stylesCommon from "../../common/commonStyle";
import { appConstant, imageConstant, alertMsgConstant } from "../../constant";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import UploadImage from "@/components/uploadImage";
import styles from "./style";
import { CustomButton } from "@/components/CustomButton";
import { AppText } from "@/components/AppText";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation, useFocusEffect } from "@react-navigation/core";
import Modal from "react-native-modal";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import {
  isEmailValid,
  isMobileNumberValid,
  isValidPassword,
} from "../../helper/validations";
import { requestToSignup } from "./redux/Signup.action";
import { connect, useSelector } from "react-redux";
import Loader from "@/components/Loader";
import DeviceInfo from "react-native-device-info";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { TextInputCustom } from "@/components/TextInput";
import { USER_DATE_FORMAT } from "@/utils";

const Signup = (props) => {
  const [error, setError] = React.useState({
    titleErr: "",
    // paymentErr: "",
    nameErr: "",
    emailErr: "",
    phoneErr: "",
    dobErr: "",
    addressErr: "",
    tfnErr: "",
    passwordErr: "",
    cnfpasswordErr: "",
    // imgErr: "",
  });

  const navigation = useNavigation();
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [isClickEye, setIsClickEye] = useState(false);
  const [isClickEyeConfirm, setIsClickEyeConfirm] = useState(false);

  const [title, setTitle] = useState("");
  // const [payment, setPayment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [tfn, setTFN] = useState("");
  const [password, setPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
  const [onOpenMediaPicker, setOnOpenMediaPicker] = useState(false);
  const [profilePath, setProfiilePath] = useState(null);
  const [ImageSource, setImageSource] = useState("");
  const signupResponse = useSelector((state) => state.SignupReducer);

  const onChangeTitle = useCallback((text) => setTitle(text), []);
  // const onChangePayment = useCallback((text) => setPayment(text), []);
  const onChangeName = useCallback((text) => setName(text), []);
  const onChangeEmail = useCallback((text) => setEmail(text), []);
  const onChangePhone = useCallback((text) => setPhone(text), []);
  const onChangeDOB = useCallback((text) => setDob(text), []);
  const onChangeAddress = useCallback((text) => setAddress(text), []);
  const onChangeTFN = useCallback((text) => setTFN(text), []);
  const onChangePassword = useCallback((text) => setPassword(text), []);
  const onChangeConfirmPassword = useCallback(
    (text) => setCnfPassword(text),
    []
  );
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [DeviceName, setDeviceName] = useState(false);
  const [DeviceToken, setDeviceToken] = useState();
  const [DeviceUuid, setDeviceUuid] = useState();

  let isCalander;

  useFocusEffect(
    React.useCallback(() => {
      DeviceInfo.getDeviceName().then((device_name) => {
        setDeviceName(device_name);
      });

      DeviceInfo.getDeviceToken().then((device_token) => {
        setDeviceToken(device_token);
      });

      let type = DeviceInfo.getDeviceType();
      // console.log(type);

      DeviceInfo.syncUniqueId().then((uniqueId) => {
        setDeviceUuid(uniqueId);
      });
      // console.log("setDeviceUuid", DeviceUuid);
      return () => {};
    }, [])
  );

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  useEffect(() => {}, [isDatePickerVisible]);

  const handleConfirm = (date) => {
    // console.warn("A date has been picked: ", date);
    setDob(moment(date).format("DD-MM-YYYY"));
    hideDatePicker();
  };

  const onPressRight = () => {
    setIsClickEye(!isClickEye);
  };

  const onPressRightConfirm = () => {
    setIsClickEyeConfirm(!isClickEyeConfirm);
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
  const moveBack = () => {
    props.navigation.goBack();
  };
  const openMediaPicker = () => {
    setOnOpenMediaPicker(true);
  };
  function Validate(
    title,
    // payment,
    name,
    email,
    phone,
    dob,
    address,
    tfn,
    password,
    cnfPassword,
    ImageSource
  ) {
    let titleErr = "";
    // let paymentErr = "";
    let nameErr = "";
    let emailErr = "";
    let phoneErr = "";
    let dobErr = "";
    let addressErr = "";
    let tfnErr = "";
    let passwordErr = "";
    let cnfpasswordErr = "";
    // let imgErr = "";

    // console.log(" img source ----", ImageSource);

    // if (ImageSource == "") {
    //   imgErr = alertMsgConstant.IMAGE_REQUIRED;
    // }

    if (title.trim() === "") {
      titleErr = "Title cannot be empty";
    }

    // if (payment.trim() === "") {
    //   paymentErr = "Payment cannot be empty";
    // }

    if (name.trim() === "") {
      nameErr = "Name cannot be empty";
    }

    if (email.trim() === "") {
      emailErr = alertMsgConstant.EMAIL_NOT_EMPTY;
    } else if (!isEmailValid(email)) {
      emailErr = alertMsgConstant.EMAIL_NOT_VALID;
    }

    if (phone === "") {
      phoneErr = "Phone cannot be empty";
    } else if (phone.length < 10) {
      phoneErr = alertMsgConstant.MINIMUM_10_DIGIT;
    } else if (phone.length > 12) {
      phoneErr = alertMsgConstant.MAXIMUM_12_DIGIT;
    } else if (phone.length == 11) {
      phoneErr = alertMsgConstant.PHONE_NUMBER_NOT_VALID;
    }

    if (dob === "") {
      dobErr = "Date of Birth cannot be empty";
    }

    if (address.trim() === "") {
      addressErr = "Address cannot be empty";
    }

    if (tfn === "") {
      tfnErr = "TFN cannot be empty";
    } else if (tfn.length < 9 || tfn.length > 9) {
      tfnErr = alertMsgConstant.TFN_CHAR_LIMIT;
    }

    if (password.trim() === "") {
      passwordErr = alertMsgConstant.PASSWORD_NOT_EMPTY;
    } else if (!isValidPassword(password)) {
      passwordErr = alertMsgConstant.MSG_STRONG_PWD;
    }

    if (cnfPassword.trim() === "") {
      cnfpasswordErr = alertMsgConstant.CONFIRM_PASSWORD_NOT_EMPTY;
    } else if (password.trim() !== cnfPassword.trim()) {
      cnfpasswordErr = alertMsgConstant.PASSWORD_NOT_EQUAL;
    }

    if (
      titleErr === "" &&
      // paymentErr === "" &&
      nameErr === "" &&
      emailErr === "" &&
      phoneErr === "" &&
      dobErr === "" &&
      addressErr === "" &&
      tfnErr === "" &&
      passwordErr === "" &&
      cnfpasswordErr === ""
      // imgErr == ""
    ) {
      return "ok";
    } else {
      return {
        titleErr,
        // paymentErr,
        nameErr,
        emailErr,
        phoneErr,
        dobErr,
        addressErr,
        tfnErr,
        passwordErr,
        cnfpasswordErr,
        // imgErr,
      };
    }
  }

  const onClickSignup = async () => {
    const validate = Validate(
      title,
      // payment,
      name,
      email,
      phone,
      dob,
      address,
      tfn,
      password,
      cnfPassword,
      ImageSource
    );
    setError(
      validate !== "ok"
        ? validate
        : {
            titleErr: "",
            // paymentErr: "",
            nameErr: "",
            emailErr: "",
            phoneErr: "",
            dobErr: "",
            addressErr: "",
            tfnErr: "",
            passwordErr: "",
            cnfpasswordErr: "",
            // imgErr: "",
          }
    );

    if (validate == "ok") {
      const params = new FormData();
      params.append("title", title);
      params.append("name", name);
      params.append("dob", dob);
      params.append("email", email);
      params.append("phone", phone);
      params.append("address", address);
      params.append("tfn_number", tfn);
      if (ImageSource) {
        params.append("image", {
          name: Math.floor(new Date().getTime() / 1000) + ".png",
          type: "image/jpeg",
          uri: ImageSource ? ImageSource : "https://via.placeholder.com/150",
        });
      }
      password.length > 0 ? params.append("password", password) : null;
      params.append("device_token", 3143); //need to do in dynamic
      params.append("uuid", 24314); //need to do in dynamic
      params.append("device_type", 2132); //need to do in dynamic
      params.append("device_name", DeviceName); //need to do in dynamic
      props.requestToRegister({ params, navigation: navigation });
      // let infor = await props.requestToRegister({
      //   title,
      //   // payment,
      //   name,
      //   email,
      //   phone,
      //   dob,
      //   address,
      //   tfn_number: tfn,
      //   password,
      //   device_token: 3143, //need to do in dynamic
      //   uuid: 24314, //need to do in dynamic
      //   device_type: 2132, //need to do in dynamic
      //   device_name: DeviceName,
      //   navigation: navigation,
      //   image: imageArray,
      // });
    }
  };

  goToLogin = () => {
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
          <Pressable onPress={() => Keyboard.dismiss()}>
            <UploadImage
              onOpenMediaPicker={onOpenMediaPicker}
              setOnOpenMediaPicker={setOnOpenMediaPicker}
              setProfiilePath={setProfiilePath}
              setImageSource={setImageSource}
            />
            <View style={stylesCommon.imageContainer}>
              <Image
                resizeMode={"contain"}
                source={imageConstant.IMAGE_SINGUP_TOP}
                // style={styles.image}
              />
            </View>
            <View style={{ height: hp("8%") }} />
            <View style={styles.loginTextContainer}>
              <Text style={stylesCommon.titleText}>Signup</Text>
            </View>
            <View style={{ height: hp("2.8%") }} />
            <>
              <View
                style={{
                  alignSelf: "center",
                  flexDirection: "row",
                }}
              >
                <Image
                  source={
                    ImageSource.length == ""
                      ? require("../../assets/images/SignupScreen/avatar-placeholder.png")
                      : { uri: ImageSource }
                  }
                  style={styles.img}
                />
                <TouchableOpacity
                  onPress={() => openMediaPicker()}
                  style={styles.touch}
                >
                  <Image
                    source={require("../../assets/images/SignupScreen/camera.png")}
                    style={styles.editImg}
                  />
                </TouchableOpacity>
              </View>
              {/* {error.imgErr ? (
                <AppText text={error.imgErr} style={styles.txtError} />
              ) : null} */}
            </>
            <View style={styles.viewTxtInput}>
              {/* <View style={{ height: hp("2.8%") }} /> */}
              <TextInputCustom
                viewName={appConstant.SIGNUP}
                label={"Title"}
                value={title}
                onChangeText={onChangeTitle}
                placeholder={"Enter Title"}
                icon={require("../../assets/images/SignupScreen/title.png")}
                iconStyle={styles.IconStyle}
                error={error.titleErr}
                keyboardType="default"
                //onPressFocus={()=> Keyboard.addListener()}
              />

              {/* <View style={{ height: hp("2.8%") }} /> */}
              <TextInputCustom
                viewName={appConstant.SIGNUP}
                label={"Name"}
                value={name}
                onChangeText={onChangeName}
                placeholder={"Enter Name"}
                icon={require("../../assets/images/SignupScreen/user-avatar.png")}
                iconStyle={styles.IconStyle}
                error={error.nameErr}
                keyboardType="default"
                //onPressFocus={()=> Keyboard.addListener()}
              />
              <TextInputCustom
                viewName={appConstant.SIGNUP}
                label={"Email"}
                value={email}
                onChangeText={onChangeEmail}
                placeholder={"Enter Email Address"}
                icon={require("../../assets/images/LoginScreen/email-line.png")}
                iconStyle={styles.IconStyle}
                error={error.emailErr}
                keyboardType="email-address"
                //onPressFocus={()=> Keyboard.addListener()}
              />
              {/* <View style={{ height: hp("2.8%") }} /> */}

              <TextInputCustom
                viewName={appConstant.SIGNUP}
                label={"Phone"}
                value={phone}
                onChangeText={onChangePhone}
                placeholder={"Enter Phone Number"}
                icon={require("../../assets/images/SignupScreen/phone.png")}
                iconStyle={styles.IconStyle}
                error={error.phoneErr}
                keyboardType="number-pad"
                //onPressFocus={()=> Keyboard.addListener()}
              />
              {/* <View style={{ height: hp("2.8%") }} /> */}
              <View
                style={{
                  width: wp("90%"),
                  position: "relative",
                }}
              >
                <TextInputCustom
                  viewName={appConstant.SIGNUP}
                  label={"Dob"}
                  value={
                    dob && moment(dob, "DD-MM-YYYY").format(USER_DATE_FORMAT)
                  }
                  onChangeText={onChangeDOB}
                  placeholder={"Enter Date of Birth"}
                  icon={require("../../assets/images/SignupScreen/calendar.png")}
                  onPressRight={showDatePicker}
                  error={error.dobErr}
                  inputViewStyle={styles.inputViewStyle}
                />
                <Pressable
                  onPress={showDatePicker}
                  style={{
                    width: "100%",
                    height: "100%",
                    flex: 1,
                    position: "absolute",
                  }}
                ></Pressable>
              </View>

              {/* <View style={{ height: hp("2.8%") }} /> */}

              <TextInputCustom
                viewName={appConstant.SIGNUP}
                label={"Address"}
                value={address}
                onChangeText={onChangeAddress}
                placeholder={"Enter Address"}
                icon={require("../../assets/images/SignupScreen/mapss.png")}
                iconStyle={styles.IconStyle}
                error={error.addressErr}
                keyboardType="default"
                //onPressFocus={()=> Keyboard.addListener()}
              />
              {/* <View style={{ height: hp("2.8%") }} /> */}

              <TextInputCustom
                viewName={appConstant.SIGNUP}
                label={"Tfn"}
                value={tfn}
                onChangeText={onChangeTFN}
                placeholder={"Enter TFN Number"}
                icon={require("../../assets/images/SignupScreen/tfn.png")}
                iconStyle={styles.IconStyle}
                error={error.tfnErr}
                keyboardType="number-pad"
                //onPressFocus={()=> Keyboard.addListener()}
              />
              {/* <View style={{ height: hp("2.8%") }} /> */}

              <TextInputCustom
                viewName={appConstant.SIGNUP}
                secureTextEntry={isClickEye ? false : true}
                label={"Password"}
                value={password}
                onChangeText={onChangePassword}
                placeholder={"Enter Password"}
                icon={require("../../assets/images/SignupScreen/password.png")}
                rightIcon={
                  isClickEye
                    ? require("../../assets/images/ResetPasswordScreen/eyeSlash.png")
                    : require("../../assets/images/LoginScreen/privacyEye.png")
                }
                onPressRight={onPressRight}
                iconStyle={styles.IconStyle}
                error={error.passwordErr}
                ////onPressFocus={()=> Keyboard.addListener()}
              />

              {/* <View style={{ height: hp("2.8%") }} /> */}

              <TextInputCustom
                viewName={appConstant.SIGNUP}
                secureTextEntry={isClickEyeConfirm ? false : true}
                label={"Confirm-Password"}
                value={cnfPassword}
                onChangeText={onChangeConfirmPassword}
                placeholder={"Enter Confirm Password"}
                icon={require("../../assets/images/LoginScreen/password.png")}
                rightIcon={
                  isClickEyeConfirm
                    ? require("../../assets/images/ResetPasswordScreen/eyeSlash.png")
                    : require("../../assets/images/LoginScreen/privacyEye.png")
                }
                onPressRight={onPressRightConfirm}
                iconStyle={styles.IconStyle}
                error={error.cnfpasswordErr}
                //onPressFocus={()=> Keyboard.addListener()}
              />

              {/* <View style={{ height: hp("2.8%") }} /> */}
            </View>

            <View style={styles.viewSocialMediaBtn}>
              <CustomButton
                title="Sign Up"
                onPress={onClickSignup}
                styleBtn={stylesCommon.btnSocialMedia}
                styleTxt={stylesCommon.btnSocialMediaText}
              />
            </View>

            <View
              style={{
                ...styles.viewLogin,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <AppText
                text={"Already have an account?"}
                style={styles.txtSignup}
              />
              <TouchableOpacity onPress={goToLogin}>
                <AppText
                  text={" Login"}
                  style={{ ...styles.txtLogin, color: "#BD2529" }}
                />
              </TouchableOpacity>
            </View>
          </Pressable>
        </View>
      </KeyboardAwareScrollView>
      {/* <Modal isVisible={showCameraModal}>
        <View style={styles.cameraModal}>
          <TouchableOpacity
            onPress={() => setShowCameraModal(false)}
            style={styles.closeTouch}
          >
            <Text style={{color: appColor.WHITE, fontSize:15, fontWeight:'800'}}>X</Text>
          </TouchableOpacity>

          <Text style={styles.cameraTitle}>Select or Capture Image</Text>
          <View style={[styles.viewCamera]}>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={launchCamera}
            >
              <Text style={[styles.txtCamera]}>
                {"Capture Image from Camera"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.viewCamera]}>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={selectFromGallery}
            >
              <Text style={[styles.txtCamera]}>
                {"Choose Image from Gallery"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}
      {isDatePickerVisible && (
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          maximumDate={new Date()}
          dateFormat="dayofweek day month"
        />
      )}

      {signupResponse.isRequesting ? (
        <Loader loading={signupResponse.isRequesting} />
      ) : null}
      {/* <View style={stylesCommon.container}>
        <CommonHeader leftTitle={"Create account"} rightTitle={"Next"} />

        <AppText text={"Signin with email"} style={styles.textSignin} />

        <View style={styles.viewTxtInput}>
          <TextInputRegister
            label={"Email"}
            value={email}
            onChangeText={onChangeEmail}
            placeholder={"Email"}
          />
          <View style={{ height: hp("1%") }} />
          <TextInputRegister
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

       
      </View> */}
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestToRegister: (params) => dispatch(requestToSignup(params)),
  };
};
export default connect(null, mapDispatchToProps)(Signup);
