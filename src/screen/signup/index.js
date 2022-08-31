import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  BackHandler,
  TouchableOpacity,
  PermissionsAndroid,
  Keyboard,
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
import UploadImage from "@/components/uploadImage";
import styles from "./style";
import { CommonHeader } from "@/components/CommonHeader";
import { CustomButton } from "@/components/CustomButton";
import { AppText } from "@/components/AppText";
import { TextInputCustom } from "@/components/TextInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/core";
import Modal from "react-native-modal";
import * as ImagePicker from "react-native-image-picker";
import IconAnt from "react-native-vector-icons/AntDesign";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { isEmailValid, isMobileNumberValid,isValidPassword } from "../../helper/validations";
import Textarea from "react-native-textarea";
import { requestToSignup } from "./redux/Signup.action";
import { connect, useSelector } from "react-redux";
import Loader from "@/components/Loader";
import DeviceInfo from "react-native-device-info";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";


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
  let isCalander;
  DeviceInfo.getDeviceName().then((device_name) => {
    setDeviceName(device_name);
  });
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  useEffect(() => {
  }, [isDatePickerVisible]);

  const handleConfirm = (date) => {
    // console.warn("A date has been picked: ", date);
    setDob(moment(date).format("YYYY-MM-DD"));
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
    cnfPassword
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
    } else if (phone.length<10) {
      phoneErr = "Phone number must be atleast 10 numbers ";
    } else if  (phone.length>10) {
      phoneErr = "Phone number no not more than 10 char"
    }

    if (dob === "") {
      dobErr = "Date of Birth cannot be empty";
    }

    if (address.trim() === "") {
      addressErr = "Address cannot be empty";
    }

    if (tfn === "") {
      tfnErr = "TFN cannot be empty";
    } else if (tfn.length < 8) {
      tfnErr = alertMsgConstant.TFN_CHAR_LIMIT;
    }

    if (password.trim() === "") {
      passwordErr = alertMsgConstant.PASSWORD_NOT_EMPTY;
    }else if (!isValidPassword(password)) {
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
      cnfPassword
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
       params.append("image", {
         name: Math.floor(new Date().getTime() / 1000) + ".png",
         type: "image/jpeg",
         uri: ImageSource ? ImageSource : "https://via.placeholder.com/150",
       });
       password.length > 0 ? params.append("password", password) : null;
       params.append("device_token", 3143);//need to do in dynamic
       params.append("uuid", 24314);//need to do in dynamic
       params.append("device_type", 2132);//need to do in dynamic
       params.append("device_name", DeviceName);//need to do in dynamic
       props.requestToRegister({params ,   navigation: navigation});
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
            <View style={styles.viewTxtInput}>
              <View style={{ height: hp("2.8%") }} />
              <TextInputCustom
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
              <View style={{ height: hp("2.8%") }} />
              {/* <TextInputCustom
                label={"Payment"}
                value={payment}
                onChangeText={onChangePayment}
                placeholder={"Enter Payment Type"}
                icon={require("../../assets/images/SignupScreen/payment.png")}
                iconStyle={styles.IconStyle}
                error={error.paymentErr}
                keyboardType="default"
              /> */}
              {/* <View style={{ height: hp("2.8%") }} /> */}
              <TextInputCustom
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
              <View style={{ height: hp("2.8%") }} />
              <TextInputCustom
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
              <View style={{ height: hp("2.8%") }} />

              <TextInputCustom
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
              <View style={{ height: hp("2.8%") }} />
             
              <TextInputCustom
                label={"Dob"}
                value={dob}
                onChangeText={onChangeDOB}
                placeholder={"Enter Date of Birth"}
                icon={require("../../assets/images/SignupScreen/dob.png")}
                rightIcon={require("../../assets/images/SignupScreen/calendar.png")}
                onPressRight={showDatePicker}
                rightIconStyle={{height:20, width: 20}}
                iconStyle={styles.IconStyle}
                error={error.dobErr}
                onPressIn={showDatePicker}
                //onPressFocus={()=> Keyboard.dismiss()}
              />
               <Pressable onPress={showDatePicker} style={{width: '100%', height: '7%', marginTop: '-14%'}}> 
               </Pressable> 
              <View style={{ height: hp("2.8%") }} />

              <TextInputCustom
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
              <View style={{ height: hp("2.8%") }} />

              <TextInputCustom
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
              <View style={{ height: hp("2.8%") }} />

              <TextInputCustom
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

              <View style={{ height: hp("2.8%") }} />

              <TextInputCustom
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

              <View style={{ height: hp("2.8%") }} />
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
        />
      )}

      {signupResponse.isRequesting ? (
        <Loader loading={signupResponse.isRequesting} />
      ) : null}
      {/* <View style={stylesCommon.container}>
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
