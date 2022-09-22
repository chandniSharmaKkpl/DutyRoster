import React, { useState, useCallback, useEffect } from "react";
import { View, BackHandler , Keyboard, Text , FlatList} from "react-native";
import stylesCommon from "../../common/commonStyle";
import styles from "./style";
import { AppText } from "@/components/AppText";
import { useRoute, useNavigation } from "@react-navigation/core";
import { CustomButton } from "@/components/CustomButton";
import { TouchableOpacity } from "react-native-gesture-handler";
import { appConstant, imageConstant } from "@/constant";
import { CommonHeader } from "@/components";
import { TextInputCustom } from "@/components/TextInput";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

const Unavailablity = (props) => {
  const navigation = useNavigation();
  const route = useRoute();


  const [unavailablityDate, setUnavailablityDate] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [inTime, setInTime] = useState(null);
  const [outTime, setOutTime] = useState(null);
  const [isTimeInPickerVisible, setTimeInPickerVisibility] = useState(false);
  const [isTimeOutPickerVisible, setTimeOutPickerVisibility] = useState(false);
  const [timeData, setTimeData] = useState([])
  

  const onChangeUnavailablityDate = useCallback((text) => setUnavailablityDate(text), []);
  // const onChangeTimeIn = useCallback((text) => setInTime(text), []);
  // const onChangeTimeOut = useCallback((text) => setOutTime(text), []);
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

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    // console.warn("A date has been picked: ", date);
    setUnavailablityDate(moment(date).format("DD/MM/YYYY"));
    hideDatePicker();
  };

  const showInTimePicker = (index) => {
    setTimeInPickerVisibility(true);
  };

  const hideInTimePicker = () => {
    setTimeInPickerVisibility(false);
  };

  const handleInTimeConfirm = (date) => {
    // console.warn("A date has been picked: ", date);
    setInTime(moment(date).format("hh:mm A"));
    hideInTimePicker();
  };

  const showOutTimePicker = () => {
    setTimeOutPickerVisibility(true);
  };

  const hideOutTimePicker = () => {
    setTimeOutPickerVisibility(false);
  };

  const handleOutTimeConfirm = (date) => {
    // console.warn("A date has been picked: ", date);
    setOutTime(moment(date).format("hh:mm A"));
    hideOutTimePicker();
  };


  const onSetInTime = (text , key) => {
    // setInTime(text)
    console.log(text, key)
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

  const onPressAddIcon = () => {
    if (timeData.length > 0) {
      setTimeData([...timeData, { inTime: "", outTime: "" }]);  
    } else {
      setTimeData([{ inTime: "", outTime: "" }]);
    }

    console.log(timeData , 'time')
  };

  return (
    
    <>
      <CommonHeader screenName={route?.name} onGoBack={onGoBack} />
      <View style={[styles.container]}>
        <View style={styles.viewTopTitle}>
          <AppText
            style={styles.txtUnavailablity}
            text={appConstant.AVAILABLE_DATE}
          />
          {/* <Pressable onPress={showDatePicker} style={{width: '100%'}}> */}
          <TextInputCustom
            inputViewStyle={{...styles.textInput }}
                // style={{padding:'1%'}}
                label={"Choose Unavailable Date"}
                value={unavailablityDate}
                onChangeText={onChangeUnavailablityDate}
                // rightIcon={require("../../assets/images/SignupScreen/calendar.png")}
                placeholder={appConstant.CHOOSE_DATE}
                rightIcon={imageConstant.IMAGE_DATE_PICKER_IMAGE}
                rightIconStyle={{height:20}}
                onPressRight={showDatePicker}
                onPressIn={showDatePicker}
                
          />
            <Pressable onPress={showDatePicker} style={{width: '100%', height: '7%', padding:'8%' ,  marginTop: '-14%' }}/> 
          {/* <TextInputCustom
            placeholder={appConstant.CHOOSE_DATE}
            rightIcon={imageConstant.IMAGE_DATE_PICKER_IMAGE}
            rightIconStyle={styles.rightIconStyle}
          /> */}
        </View>
           <View style={styles.viewTopTitle}>
          <AppText
            style={styles.txtUnavailablity}
            text={appConstant.DISTRICTS}
          />
          <TextInputCustom
               inputViewStyle={{...styles.textInput }}
                // style={{padding:'1%'}}
                label={"Choose Unavailable Date"}
                value={unavailablityDate}
                onChangeText={onChangeUnavailablityDate}
                // rightIcon={require("../../assets/images/SignupScreen/calendar.png")}
                placeholder={appConstant.CHOOSE_DATE}
                rightIcon={imageConstant.IMAGE_DATE_PICKER_IMAGE}
                rightIconStyle={{height:20}}
                onPressRight={showDatePicker}
                onPressIn={showDatePicker}
                
          />
        
        </View>
        <View style={styles.viewTopTitle}>
          <AppText
            style={styles.txtUnavailablity}
            text={appConstant.TIME}
          />
            {timeData.length > 0 && timeData.map((item , key) => {
                return <View key={key} style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom:'5%'}}>
                  <TextInputCustom
                    value={item.inTime}
                    placeholder={appConstant.IN_TIME}
                    inputViewStyle={{width : '40%', backgroundColor : 'white', borderColor : 'white'}}
                    rightIcon={imageConstant.IMAGE_TIME_ICON}
                    rightIconStyle={styles.timeIconStyle}
                    onChangeText={(text) => { onSetInTime(text, key)}}
                    onPressRight={(key) => {
                      showInTimePicker(key)
                    }}
                    onPressIn={(key) => {
                      showInTimePicker(key)
                    }}
                    />
                  <TextInputCustom
                    value={item.outTime}
                    placeholder={appConstant.OUT_TIME}
                    inputViewStyle={{width : '40%', backgroundColor : 'white', borderColor : 'white' }}
                    rightIcon={imageConstant.IMAGE_TIME_ICON}
                    rightIconStyle={styles.timeIconStyle}
                    onChangeText={(text) => { setOutTime(text) }}
                    onPressRight={showOutTimePicker}
                    onPressIn={showOutTimePicker}
                    />
                  <TouchableOpacity onPress={onPressAddIcon}>
                    <View style={styles.addTimeIconContainer}>
                        <Text style={styles.iconText}>+</Text>
                    </View>
                  </TouchableOpacity>
              </View>
             })}
             <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TextInputCustom
                  value={inTime}
                  placeholder={appConstant.IN_TIME}
                  inputViewStyle={{width : '40%', backgroundColor : 'white', borderColor : 'white'}}
                  rightIcon={imageConstant.IMAGE_TIME_ICON}
                  rightIconStyle={styles.timeIconStyle}
                  onChangeText={(text) => { setInTime(text) }}
                  onPressRight={showInTimePicker}
                  onPressIn={showInTimePicker}
                  />
                <TextInputCustom
                  value={outTime}
                  placeholder={appConstant.OUT_TIME}
                  inputViewStyle={{width : '40%', backgroundColor : 'white', borderColor : 'white' }}
                  rightIcon={imageConstant.IMAGE_TIME_ICON}
                  rightIconStyle={styles.timeIconStyle}
                  onChangeText={(text) => { setOutTime(text) }}
                  onPressRight={showOutTimePicker}
                  onPressIn={showOutTimePicker}
                  />
                  <TouchableOpacity onPress={onPressAddIcon}>
                    <View style={styles.addTimeIconContainer}>
                        <Text style={styles.iconText}>+</Text>
                    </View>
                  </TouchableOpacity>
              </View>
           
          
        </View>
         <TouchableOpacity style={styles.btnBlack}>
          <AppText style={styles.saveButton} text={"Save"} />
          </TouchableOpacity>
      </View>
      {isDatePickerVisible && (
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      )}

      {isTimeInPickerVisible && (
        <DateTimePickerModal
          isVisible={isTimeInPickerVisible}
          mode="time"
          onConfirm={handleInTimeConfirm}
          onCancel={hideInTimePicker}
        />
      )}

      {isTimeOutPickerVisible && (
        <DateTimePickerModal
          isVisible={isTimeOutPickerVisible}
          mode="time"
          onConfirm={handleOutTimeConfirm}
          onCancel={hideOutTimePicker}
        />
      )}
    </>
  );
};

export default Unavailablity;
