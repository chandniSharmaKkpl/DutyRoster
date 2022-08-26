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
import { useRoute, useNavigation } from "@react-navigation/core";
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
import { isEmailValid, isMobileNumberValid } from "@/helper/validations";
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

const EditProfile = (props) => {
  const { requestToUpdateProfileAction } = props;
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

  useEffect(() => {
    console.log("ImageSource?.length   ======>", ImageSource === "");
  }, [ImageSource]);

  const handleBackButtonClick = () => {
    moveBack();
    return true;
  };
  useEffect(() => {
    (async () => {
      let responsedata = await localDb.getUser().then((response) => {
        return response;
      });
      await props.requestToGetProfile({
        employee_id: responsedata.user.id,
        navigation: navigation,
      });
    })();

    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);

    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
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
      if (profileInformation.hasOwnProperty("image")) {
        setImageSource(profileInformation?.image);
      }
    }
  }, [profileResponse]);
  React.useEffect(() => {
    if (profileResponse.UpdateProfileReducer) {
      let profileInformation = profileResponse.UpdateProfileReducer;
      // console.log(
      //   "::::::: profileInformation ::::::: 657 =====>",
      //   profileInformation
      // );
      setTitle(profileInformation?.title);
      setName(profileInformation?.name);
      setEmail(profileInformation?.email);
      setPhone(profileInformation?.phone);
      setTFN(profileInformation?.tfn_number);
      setAddress(profileInformation?.address);
      setDob(profileInformation?.dob);
      if (profileInformation.hasOwnProperty("image")) {
        setImageSource(profileInformation?.image);
      }
    }
  }, [profileResponse.UpdateProfileReducer]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDob(moment(date).format("YYYY-MM-DD"));
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
    tfn
  ) {
    let titleErr = "";
    // let paymentErr = "";
    let nameErr = "";
    let emailErr = "";
    let phoneErr = "";
    let dobErr = "";
    let addressErr = "";
    let tfnErr = "";

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
      phoneErr = "Phone number must be atleast 10 numbers ";
    } else if (phone.length > 10) {
      phoneErr = "Phone number no not more than 10 char";
    }

    if (dob === "") {
      dobErr = "Date of Birth cannot be empty";
    }

    if (address.trim() === "") {
      addressErr = "Address cannot be empty";
    }

    if (tfn === "") {
      tfnErr = "TFN cannot be empty";
    }

    // if (password.trim() === "") {
    //   passwordErr = alertMsgConstant.PASSWORD_NOT_EMPTY;
    // }

    // if (cnfPassword.trim() === "") {
    //   cnfpasswordErr = alertMsgConstant.CONFIRM_PASSWORD_NOT_EMPTY;
    // } else if (password.trim() !== cnfPassword.trim()) {
    //   cnfpasswordErr = alertMsgConstant.PASSWORD_NOT_EQUAL;
    // }

    if (
      titleErr === "" &&
      nameErr === "" &&
      emailErr === "" &&
      phoneErr === "" &&
      dobErr === "" &&
      addressErr === "" &&
      tfnErr === ""
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

  const onSubmit = async () => {
    const validate = Validate(
      title,
      // payment,
      name,
      email,
      phone,
      dob,
      address,
      tfn
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
          }
    );
    if (validate == "ok") {
      const params = new FormData();
      params.append("title", "chandni");
      params.append("name", "sharma");
      params.append("dob", "1995-09-18");
      params.append("email", "emp1@yopmail.com");
      params.append("phone", "9090909090");
      params.append("address", "address");
      params.append("tfn_number", "123456");
      params.append("image", {
        name: Math.floor(new Date().getTime() / 1000) + ".png",
        type: "image/jpeg",
        uri: ImageSource ? ImageSource : "https://via.placeholder.com/150",
      });
      params.append("employee_id", "1");
      params.append("password", "password");
      requestToUpdateProfileAction({
        params,
        // navigation: navigation,
      });
      console.log("123456789 =======>", params);
    }
  };

  // const userData = await localDb.getUser().then((response)=> {
  //   return response});

  return (
    <>
      <CommonHeader onGoBack={onGoBack} screenName={route?.name} />
      <KeyboardAwareScrollView
        style={commonStyle.scrollViewStyle}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
      >
        <Pressable onPress={() => Keyboard.dismiss()}>
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
                alignSelf: "center",
                flexDirection: "row",
              }}
            >
              <Image
                source={
                  ImageSource === ""
                    ? imageConstant.IMAGE_AVTAR_ICON
                    : { uri: ImageSource }
                }
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
                label={"Title"}
                value={title}
                placeholder={"Enter Title"}
                onChangeText={onChangeTitle}
                error={error.titleErr}
                inputViewStyle={styles.inputViewStyle}
              />
              <Text style={styles.inputTextTitle}>Payment</Text>
              <TextInputCustom
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
                label={"Name"}
                value={name}
                onChangeText={onChangeName}
                placeholder={"Enter Name"}
                error={error.nameErr}
                inputViewStyle={styles.inputViewStyle}
              />
              <Text style={styles.inputTextTitle}>Email Address</Text>
              <TextInputCustom
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
                label={"Phone"}
                value={phone}
                onChangeText={onChangePhone}
                placeholder={"Enter Phone Number"}
                error={error.phoneErr}
                keyboardType="number-pad"
                inputViewStyle={styles.inputViewStyle}
              />
              <Text style={styles.inputTextTitle}>Date of Birth</Text>
              <TextInputCustom
                label={"Dob"}
                value={dob}
                onChangeText={onChangeDOB}
                placeholder={"Enter Date of Birth"}
                eyeIcon={require("../../assets/images/SignupScreen/calendar.png")}
                onPressRight={showDatePicker}
                error={error.dobErr}
                inputViewStyle={styles.inputViewStyle}
              />
              <Text style={styles.inputTextTitle}>Address</Text>
              <TextInputCustom
                label={"Address"}
                value={address}
                onChangeText={onChangeAddress}
                placeholder={"Enter Address"}
                error={error.addressErr}
                inputViewStyle={styles.inputViewStyle}
              />
              <Text style={styles.inputTextTitle}>TFN Number</Text>
              <TextInputCustom
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
                  secureTextEntry={true}
                  label={"Password"}
                  value={password}
                  onChangeText={onChangePassword}
                  // placeholder={"Password"}
                  error={error.passwordErr}
                  inputViewStyle={styles.inputViewStyle}
                />
              </View>
              <View>
                <Text style={styles.inputTextTitle}>Confirm Password</Text>
                <TextInputCustom
                  secureTextEntry={true}
                  label={"Confirm Password"}
                  value={cnfPassword}
                  onChangeText={onChangeConfirmPassword}
                  // placeholder={"Confirm Password"}
                  error={error.cnfpasswordErr}
                  inputViewStyle={styles.inputViewStyle}
                />
              </View>
              {/* </View> */}
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
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
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

const mapDispatchToProps = (dispatch) => {
  return {
    requestToGetProfile: (params) => {
      return dispatch(profileAction.requestToViewProfile(params));
    },

    requestToUpdateProfileAction: (params) => {
      return dispatch(profileAction.requestToUpdateProfile(params));
    },
  };
};
export default connect(null, mapDispatchToProps)(EditProfile);
