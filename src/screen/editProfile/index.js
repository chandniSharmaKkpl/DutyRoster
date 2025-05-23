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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import styles from "./style";
import { AppText } from "@/components/AppText";
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/core";
import { CustomButton } from "@/components/CustomButton";
import {
  actionConstant,
  alertMsgConstant,
  appConstant,
  imageConstant,
} from "@/constant";
import { CommonHeader } from "@/components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import commonStyle from "../../common/commonStyle";
import { TextInputCustom } from "@/components/TextInput";
import {
  isEmailValid,
  isMobileNumberValid,
  isValidPassword,
} from "@/helper/validations";
import { navigationRef } from "@/navigators/utils";
import UploadImage from "@/components/uploadImage";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import AuthContext from "@/context/AuthContext";
import localDb from "@/database/localDb";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import * as profileAction from "./redux/Profile.action";
import { connect, useSelector } from "react-redux";
import Loader from "@/components/Loader";
import ProgressiveImage from "@/components/ProgressiveImage";
import { USER_DATE_FORMAT } from "@/utils";
import { CheckConnectivity, unsubscribe } from "@/utils/CheckConnectivity";
import NetInfo from "@react-native-community/netinfo";

const EditProfile = (props) => {
  const { requestToUpdateProfileAction, requestToUpdateProfileInHeaderAction } =
    props;
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = React.useContext(AuthContext);
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

  const profileResponse = useSelector((state) => state.ProfileReducer);

  const [profilePath, setProfiilePath] = useState(null);
  const [ImageSource, setImageSource] = useState("");
  const [title, setTitle] = useState("");
  const [payment, setPayment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [tfn, setTFN] = useState("");
  const [password, setPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
  const [isRequesting, setRequesting] = useState(true);
  const [onOpenMediaPicker, setOnOpenMediaPicker] = useState(false);
  const [employee_id, setEmployee_id] = useState("");
  const [isClickEye, setIsClickEye] = useState(false);
  const [isClickEyeConfirm, setIsClickEyeConfirm] = useState(false);

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

  const handleBackButtonClick = () => {
    moveBack();
    return true;
  };
  const fetchUserDetails = React.useCallback(async () => {
    let responsedata = await localDb.getUser().then((response) => {
      return response;
    });
    setEmployee_id(responsedata.user.id);
    await props.requestToGetProfile({
      employee_id: responsedata.user.id,
      navigation: navigation,
    });
    setError({
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
  }, []);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
      const offline = !(state.isConnected && state.isInternetReachable);
      if (!offline) {
        fetchUserDetails();
      }
    });
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
      removeNetInfoSubscription();
    };
  }, []);

  useEffect(() => {
    if (profileResponse?.ViewProfileReducer) {
      let profileInformation = profileResponse.ViewProfileReducer.data;

      setTitle(profileInformation?.title);
      setName(profileInformation?.name);
      setEmail(profileInformation?.email);
      setPhone(profileInformation?.phone);
      setTFN(profileInformation?.tfn_number);
      setAddress(profileInformation?.address);
      setDob(profileInformation?.dob);
      setPayment(profileInformation?.payment_type);
      setImageSource(profileInformation?.image);
      localDb.setProfileImage(profileInformation?.image);
    }
  }, [profileResponse]);

  React.useEffect(() => {
    if (profileResponse.UpdateProfileReducer) {
      requestToUpdateProfileInHeaderAction(
        profileResponse.UpdateProfileReducer
      );
      let profileInformation = profileResponse.UpdateProfileReducer.data;
      if (profileInformation) {
        // requestToUpdateProfileInHeaderAction(profileResponse.UpdateProfileReducer);
      }
      setTitle(profileInformation?.title);
      setName(profileInformation?.name);
      setEmail(profileInformation?.email);
      setPhone(profileInformation?.phone);
      setTFN(profileInformation?.tfn_number);
      setAddress(profileInformation?.address);
      setDob(profileInformation?.dob);
      if (profileInformation.hasOwnProperty("image")) {
        setImageSource(profileInformation?.image);
        localDb.setProfileImage(profileInformation?.image);
      }
    }
  }, [profileResponse.UpdateProfileReducer]);

  const onPressRight = () => {
    setIsClickEye(!isClickEye);
  };

  const onPressRightConfirm = () => {
    setIsClickEyeConfirm(!isClickEyeConfirm);
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDob(moment(date).format("DD-MM-YYYY"));
    // setDob(date)
    hideDatePicker();
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
      phoneErr = alertMsgConstant.MSG_PHONE_NOT_EMPTY;
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

    // If password there then only confirm password validation will be checked
    if (password && password.length > 0) {
      if (!isValidPassword(password)) {
        passwordErr = alertMsgConstant.MSG_STRONG_PWD;
      }

      if (cnfPassword.trim() === "") {
        cnfpasswordErr = alertMsgConstant.CONFIRM_PASSWORD_NOT_EMPTY;
      } else if (password.trim() !== cnfPassword.trim()) {
        cnfpasswordErr = alertMsgConstant.PASSWORD_NOT_EQUAL;
      }
    }

    // If confirm password there then only password validation will be checked
    if (cnfPassword && cnfPassword.length > 0) {
      if (!isValidPassword(cnfPassword)) {
        cnfpasswordErr = alertMsgConstant.MSG_STRONG_PWD;
      }

      if (password.trim() === "") {
        passwordErr = alertMsgConstant.PASSWORD_NOT_EMPTY;
      } else if (password.trim() !== cnfPassword.trim()) {
        passwordErr = alertMsgConstant.PASSWORD_NOT_EQUAL;
      }
    }

    if (
      titleErr === "" &&
      nameErr === "" &&
      emailErr === "" &&
      phoneErr === "" &&
      dobErr === "" &&
      addressErr === "" &&
      tfnErr === "" &&
      passwordErr == "" &&
      cnfpasswordErr == ""
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

  const moveBack = () => {
    // props.navigation.goBack();
    navigation.goBack();
  };

  const onGoBack = () => {
    navigation.navigate(appConstant.PROFILE_SETTINGS);
  };

  const openMediaPicker = () => {
    setOnOpenMediaPicker(true);
  };

  const onSubmit = async () => {
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
      const data = {
        title: title,
        name: name,
        dob: moment(dob, "DD-MM-YYYY").format("YYYY-MM-DD"),
        email,
        phone,
        address,
        tfn_number: tfn,

        employee_id: employee_id,
      };
      if (profilePath) {
        data["image"] = {
          name: Math.floor(new Date().getTime() / 1000) + ".png",
          type: "image/jpeg",
          uri: ImageSource ? ImageSource : "https://via.placeholder.com/150",
        };
      }
      if (password) {
        data["password"] = password;
      }
      localDb.setProfileImage(ImageSource);
      requestToUpdateProfileAction(data);
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
        <Pressable
          style={styles.viewPressable}
          onPress={() => Keyboard.dismiss()}
        >
          <UploadImage
            onOpenMediaPicker={onOpenMediaPicker}
            setOnOpenMediaPicker={setOnOpenMediaPicker}
            setProfiilePath={setProfiilePath}
            setImageSource={setImageSource}
          />

          <View style={[styles.container]}>
            <View style={styles.viewTopTitle}>
              <AppText
                style={styles.txtEditProfile}
                text={appConstant.EDIT_PROFILE}
              ></AppText>
            </View>
            <View style={{ height: hp("2.8%") }} />
            <View
              style={{
                // alignSelf: "center",
                // flexDirection: "row",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* <Image
                source={
                  ImageSource === ""
                    ? imageConstant.IMAGE_AVTAR_ICON
                    : { uri: ImageSource }
                }
                style={
                  ImageSource && ImageSource?.length == ""
                    ? styles.imgEmpty
                    : styles.img
                }
              /> */}
              {/* <Image source={imageConstant.IMAGE_EDIT_PROFILE_ICON} style={styles.img}/> */}
              <ProgressiveImage
                thumbnailSource={imageConstant.IMAGE_AVTAR_ICON}
                source={{ uri: ImageSource }}
                style={styles.img}
              />

              <TouchableOpacity
                onPress={() => openMediaPicker()}
                style={styles.touch}
              >
                <Image
                  source={imageConstant.IMAGE_CAMERA_ICON}
                  style={styles.editImg}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.textInputContainer}>
              <Text style={styles.inputTextTitle}>Title </Text>
              <TextInputCustom
                viewName={appConstant.PROFILE}
                label={"Title"}
                value={title}
                placeholder={"Enter Title"}
                onChangeText={onChangeTitle}
                error={error.titleErr}
                inputViewStyle={styles.inputViewStyle}
              />
              <Text style={styles.inputTextTitle}>Payment Type</Text>
              <TextInputCustom
                viewName={appConstant.PROFILE}
                label={"Payment"}
                value={payment}
                // onChangeText={onChangePayment}
                placeholder={"Enter Payment Type"}
                // error={error.paymentErr}
                editable={false}
                inputViewStyle={styles.inputViewStyle}
              />

              <Text style={styles.inputTextTitle}>Name</Text>
              <TextInputCustom
                viewName={appConstant.PROFILE}
                label={"Name"}
                value={name}
                onChangeText={onChangeName}
                placeholder={"Enter Name"}
                error={error.nameErr}
                inputViewStyle={styles.inputViewStyle}
              />
              <Text style={styles.inputTextTitle}>Email Address</Text>
              <TextInputCustom
                viewName={appConstant.PROFILE}
                label={"Email Address"}
                value={email}
                onChangeText={onChangeEmail}
                placeholder={"Enter Email Address"}
                error={error.emailErr}
                caretHidden={false}
                inputViewStyle={styles.inputViewStyle}
              />
              <Text style={styles.inputTextTitle}>Phone</Text>
              <TextInputCustom
                viewName={appConstant.PROFILE}
                label={"Phone"}
                value={phone}
                onChangeText={onChangePhone}
                placeholder={"Enter Phone Number"}
                error={error.phoneErr}
                keyboardType="number-pad"
                inputViewStyle={styles.inputViewStyle}
              />
              <Text style={styles.inputTextTitle}>Date of Birth</Text>
              <View
                style={{
                  width: wp("90%"),
                  height: hp("6%"),
                  position: "relative",
                }}
              >
                <TextInputCustom
                  viewName={appConstant.PROFILE}
                  label={"Dob"}
                  value={
                    dob && moment(dob, "DD-MM-YYYY").format(USER_DATE_FORMAT)
                  }
                  onChangeText={onChangeDOB}
                  placeholder={"Enter Date of Birth"}
                  eyeIcon={require("../../assets/images/SignupScreen/calendar.png")}
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
              <Text style={styles.inputTextTitle}>Address</Text>
              <TextInputCustom
                viewName={appConstant.PROFILE}
                label={"Address"}
                value={address}
                onChangeText={onChangeAddress}
                placeholder={"Enter Address"}
                error={error.addressErr}
                inputViewStyle={styles.inputViewStyle}
              />
              <Text style={styles.inputTextTitle}>TFN Number</Text>
              <TextInputCustom
                viewName={appConstant.PROFILE}
                label={"Tfn"}
                value={tfn}
                onChangeText={onChangeTFN}
                placeholder={"Enter TFN Number"}
                error={error.tfnErr}
                keyboardType="number-pad"
                inputViewStyle={styles.inputViewStyle}
              />
              {/* <View style={styles.passwordContainer}> */}
              <View>
                <Text style={styles.inputTextTitle}>Password</Text>
                <TextInputCustom
                  viewName={appConstant.PROFILE}
                  secureTextEntry={isClickEye ? false : true}
                  label={"Password"}
                  value={password}
                  onChangeText={onChangePassword}
                  placeholder={"Password"}
                  error={error.passwordErr}
                  inputViewStyle={styles.inputViewStyle}
                  rightIcon={
                    isClickEye
                      ? require("../../assets/images/ResetPasswordScreen/eyeSlash.png")
                      : require("../../assets/images/LoginScreen/privacyEye.png")
                  }
                  onPressRight={onPressRight}
                />
              </View>
              <View>
                <Text style={styles.inputTextTitle}>Confirm Password</Text>
                <TextInputCustom
                  viewName={appConstant.PROFILE}
                  secureTextEntry={isClickEyeConfirm ? false : true}
                  label={"Confirm Password"}
                  value={cnfPassword}
                  onChangeText={onChangeConfirmPassword}
                  placeholder={"Confirm Password"}
                  error={error.cnfpasswordErr}
                  inputViewStyle={styles.inputViewStyle}
                  rightIcon={
                    isClickEyeConfirm
                      ? require("../../assets/images/ResetPasswordScreen/eyeSlash.png")
                      : require("../../assets/images/LoginScreen/privacyEye.png")
                  }
                  onPressRight={onPressRightConfirm}
                />
              </View>
              {/* </View> */}
              <View style={styles.btnContainer}>
                <CustomButton
                  title="Save"
                  onPress={() => {
                    if (props.isNetworkConnected) {
                      onSubmit();
                    }
                  }}
                  styleBtn={styles.savaBtn}
                  styleTxt={styles.btnSaveText}
                />
              </View>
            </View>
          </View>
        </Pressable>
      </KeyboardAwareScrollView>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        maximumDate={new Date()}
      />

      {profileResponse?.ViewProfileReducer?.isRequesting ? (
        <Loader loading={profileResponse?.ViewProfileReducer?.isRequesting} />
      ) : null}
      {profileResponse.UpdateProfileReducer.isRequesting ? (
        <Loader loading={profileResponse.UpdateProfileReducer.isRequesting} />
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => ({
  isNetworkConnected: state.GlobalReducer.isNetworkConnected,
});

const mapDispatchToProps = (dispatch) => {
  return {
    requestToGetProfile: (params) =>
      dispatch(profileAction.requestToViewProfile(params)),

    requestToUpdateProfileAction: (params) =>
      dispatch(profileAction.requestToUpdateProfile(params)),

    requestToUpdateProfileInHeaderAction: (params) =>
      dispatch(profileAction.requestUpdateProfileHeader(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
