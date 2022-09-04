import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  BackHandler,
  Keyboard,
  Text,
  FlatList,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";
import stylesCommon from "../../common/commonStyle";
import styles from "./style";
import { AppText } from "@/components/AppText";
import { useRoute, useNavigation } from "@react-navigation/core";
import { CustomButton } from "@/components/CustomButton";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  appConstant,
  imageConstant,
  alertMsgConstant,
  appColor,
} from "@/constant";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CommonHeader } from "@/components";
import { TextInputCustom } from "@/components/TextInput";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { Images } from "@/constant/svgImgConst";
import EmpTimeCard from "@/components/roasterEmpTimeCard";
import Calendars from "@/components/Calendars";
import {
  enumerateDaysBetweenDates,
  getCurrentWeek,
  getDatefromFullDate,
  getDayfromDate,
  getTimeStampfromDate,
} from "@/utils";
import { connect } from "react-redux";
import {
  requestToGetRoasterDateRange,
  setMarkeDates,
  setSelectedDateAction,
  setCityAndTimeArray,
  requestToGetAvailability, 
  requestToSaveAvailability,
  setSelectedDistricts
} from "../availability/redux/Availability.action";
import { dayDateReturn } from "@/common/timeFormate";
import { useSelector } from "react-redux";
import Shift from "./Shift";

const Availability = (props) => {
  const navigation = useNavigation();
  const route = useRoute();

  const {
    setMarkeDatesAction,
    markedDates,
    requestToGetAvailabilityAction,
    selectedWeek,
    startDay,
    endDay,
    arraySelectedDate,
    arrayDistricts,
    setSelectedDistrictsAction,
    selectedDistrict,
    availabilityData
    // arrayCityAndTime,
  } = props;

  const [selectedItem, setSelectedItem] = useState(3);
  const [isCalendarShow, setIsCalendarShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [isAlertShow, setIsAlertShow] = useState(false);

  const [unavailablityDate, setUnavailablityDate] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [inTime, setInTime] = useState(null);
  const [outTime, setOutTime] = useState(null);
  const [isTimeInPickerVisible, setTimeInPickerVisibility] = useState(false);
  const [isTimeOutPickerVisible, setTimeOutPickerVisibility] = useState(false);
  const [timeData, setTimeData] = useState([]);
  const [isShowDistrictList, setIsShowDistrictList] = useState(false);
  const onChangeUnavailablityDate = useCallback(
    (text) => setUnavailablityDate(text),
    []
  );

  React.useEffect(() => {
    var endDate = "";
    var startDate = new Date();
    endDate = moment(startDate).add(7, "d");
    setSelectedWeek(startDate);
    setSelectedDate(startDate);
    // setCityAndTimeArray(["1", "2"]);
    // action to api call format date
    const fromDate = moment(startDate).format("YYYY-MM-DD");
    const toDate = moment(endDate).format("YYYY-MM-DD");
    const params = {
      week_start: "2022-09-05",
      week_end: "2022-09-11",
    };
    requestToGetAvailabilityAction(params);
    console.log("array dist", arrayDistricts);

    if (arrayDistricts.length>0) {
      setSelectedDistrictsAction(arrayDistricts[0])
    }

  }, []);

  React.useEffect(()=>{

  })

  const getSelectedDayEvents = (date) => {
    setSelectedWeek(date);
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    // console.warn("A date has been picked: ", date);
    setUnavailablityDate(moment(date).format("YYYY-MM-DD"));
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

  const onSetInTime = (text, key) => {
    // setInTime(text)
    console.log(text, key);
  };
  const onPressAddIcon = () => {
    if (timeData.length > 0) {
      setTimeData([...timeData, { inTime: "", outTime: "" }]);
    } else {
      setTimeData([{ inTime: "", outTime: "" }]);
    }

    console.log(timeData, "time");
  };
  const setSelectedWeek = React.useCallback((date) => {
    const _dateList = {};
    const _dateFlatList = [];

    const { days: _dateRange, weekStart, weekEnd } = getCurrentWeek(date);

    _dateRange.map((item, index) => {
      _dateList[item] = {
        startingDay: index === 0 ? true : false,
        endingDay: index === _dateRange.length - 1 ? true : false,
        selected: false,
        color: !(index === 0 || index === _dateRange.length - 1)
          ? appColor.LIGHT_ORANGE
          : appColor.RED,
        textColor: appColor.WHITE,
      };
      _dateFlatList.push({
        id: getTimeStampfromDate(item),
        date: getDatefromFullDate(item),
        day: getDayfromDate(item),
      });
    });

    setMarkeDatesAction({
      markedDates: _dateList,
      selectedWeek: _dateFlatList,
      weekStart: weekStart,
      weekEnd: weekEnd,
    });
  }, []);

  console.log(startDay, endDay);

  const onClickDate = (id) => {
    console.log(" arraySelectedDate ---", arraySelectedDate);

    if (arraySelectedDate.includes(id)) {
      const index = arraySelectedDate.indexOf(id);
      if (index > -1) {
        // only splice array when item is found
        let arrayTemp = arraySelectedDate.splice(index, 1); // 2nd parameter means remove one item only
        setSelectedDateAction(arrayTemp);
      }

      console.log(
        "in delete specific item arraySelectedDate ---",
        arraySelectedDate
      );
    } else {
      arraySelectedDate.push(id);
      setSelectedDateAction(arraySelectedDate);
    }
    setSelectedItem(id);
  };

  const Item = ({ day, date, id }) => (
    <Pressable
      // style={{ backgroundColor: "pink" }}
      onPress={() => onClickDate(id)}
    >
      <View
        style={
          arraySelectedDate.includes(id)
            ? styles.dateTextBoxSelect
            : styles.dateTextunSelectBox
        }
      >
        <Text
          style={
            arraySelectedDate.includes(id)
              ? styles.dayTextStyle
              : styles.unSelectDayTextStyle
          }
        >
          {day}
        </Text>
        <Text
          style={
            arraySelectedDate.includes(id)
              ? styles.dateTextStyle
              : styles.unSelectBoxDateTextStyle
          }
        >
          {date}
        </Text>
      </View>
    </Pressable>
  );

  const renderItem = ({ item }) => (
    <Item id={item.id} day={item.day} date={item.date} />
  );

  const onClickCalendar = () => {
    setIsCalendarShow(!isCalendarShow);
  };

  const onGoBack = () => {
    navigation.navigate(appConstant.ROASTER);
  };

  const renderCityAndTime = ({ item }) => {
    return (
      <View>
        <View style={styles.districts}>
          <AppText text="Districts" style={styles.rowTitle} />
          <View style={styles.districts}>
            <View style={styles.plusView}> </View>
            <View style={styles.minusView}> </View>
          </View>
        </View>
      </View>
    );
  };

  const renderDistrictList = ({ item }) => {
    return (
      <View>
        <Pressable
        onPress={() => {
          setSelectedDistrictsAction(item);
          setIsShowDistrictList(false)
        }}>
          <Text style={styles.textRow}>{item.district_name}</Text>
        </Pressable>
        <View style={styles.singleLine} />
      </View>
    );
  };

  return (
    <>
      <CommonHeader screenName={route?.name} onGoBack={onGoBack} />

      {/*  Top calendar and bottom date section */}
      <View style={[styles.container]}>
        <View style={styles.topContain}>
          <View style={styles.weekDateTextContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <AppText
                style={styles.weekDateTextStyle}
                text={dayDateReturn(startDay, false)}
              />
              <Text> - </Text>
              <AppText
                style={styles.weekDateTextStyle}
                text={dayDateReturn(endDay, true)}
              />
            </View>
            <Pressable
              style={styles.caledarContainer}
              onPress={onClickCalendar}
            >
              <Images.IMAGE_CALENDAE_SVG style={styles.caledarStyles} />
            </Pressable>
          </View>
          <View style={styles.dateLabelContainer}>
            <FlatList
              horizontal={true}
              removeClippedSubviews
              data={selectedWeek}
              extraData={arraySelectedDate}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{
                flex: 1,
                overflow: "hidden",
                backgroundColor: "white",
                alignItems: "center",
                width: Dimensions.get("window").width,
                borderWidth: 0,
              }}
            />
          </View>
        </View>
        <View style={styles.empTimeCardDetails}>{/* <EmpTimeCard /> */}</View>
        {isCalendarShow && (
          <View
            style={
              Platform.OS === "android"
                ? styles.calendarStyleAndroid
                : styles.calendarStyleIOS
            }
          >
            <Calendars
              markedDates={markedDates}
              onDayPress={getSelectedDayEvents}
            />
          </View>
        )}
        {/*  Need to add scroll view here  */}
        <View style={styles.scrollView}>
          {/* City and Time list */}

          {/* Shift Availability Detail  */}
          <View style={styles.viewTopTitle}>
            <AppText
              text={"Shift Availability Detail"}
              style={styles.txtUnavailablity}
            />
           <View>
<Shift availabilityData ={availabilityData}/>
            </View> 
          </View>

          <View style={styles.viewTopTitle}>
            <View style={styles.districts}>
              <AppText
                style={styles.txtUnavailablity}
                text={appConstant.DISCTRICTS}
              />
              <View style={[styles.districts, { width: wp("15%") }]}>
                <View style={styles.plusView}>
                  <Images.IMAGE_PLUS style={styles.plusImage} />
                </View>

                <View style={styles.minusView}>
                  <AppText style={styles.plusTxt} text={"-"} />
                </View>
              </View>
            </View>

            <View style={styles.buttonReason}>
              <TouchableOpacity
                onPress={() => {
                  setIsShowDistrictList(!isShowDistrictList);
                }}
              >
                <View style={[styles.buttonInsideReason]}>
                  <Text multiline="true" style={styles.reasonText}>
                    {selectedDistrict?.district_name}
                  </Text>
                  {isShowDistrictList ? (
                    <View style={styles.viewArrow}>
                      <Image
                        source={imageConstant.IMAGE_UP_ICON}
                        style={styles.image}
                        resizeMode={"contain"}
                      />
                    </View>
                  ) : (
                    <View style={styles.viewArrow}>
                      <Image
                        source={imageConstant.IMAGE_UP_ICON}
                        style={styles.image}
                        resizeMode={"contain"}
                      />
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Time */}
          <View style={styles.viewTopTitle}>
            <AppText style={styles.txtUnavailablity} text={appConstant.TIME} />
         
            <View
              style={{ flexDirection: "row",  width:'20%' }}
            >
              {/* <TextInputCustom
                value={inTime}
                placeholder={appConstant.IN_TIME}
                inputViewStyle={{
                  width: "40%",
                  backgroundColor: "white",
                  borderColor: "white",
                }}
                rightIcon={imageConstant.IMAGE_TIME_ICON}
                rightIconStyle={styles.timeIconStyle}
                onChangeText={(text) => {
                  setInTime(text);
                }}
                onPressRight={showInTimePicker}
                onPressIn={showInTimePicker}
              /> */}
              {/* <TextInputCustom
                value={outTime}
                placeholder={appConstant.OUT_TIME}
                inputViewStyle={{
                  width: "40%",
                  backgroundColor: "white",
                  borderColor: "white",
                }}
                rightIcon={imageConstant.IMAGE_TIME_ICON}
                rightIconStyle={styles.timeIconStyle}
                onChangeText={(text) => {
                  setOutTime(text);
                }}
                onPressRight={showOutTimePicker}
                onPressIn={showOutTimePicker}
              /> */}
              {/* <TouchableOpacity onPress={onPressAddIcon}>
                <View style={styles.addTimeIconContainer}>
                  <Text style={styles.iconText}>+</Text>
                </View>
              </TouchableOpacity> */}
            </View>
          </View>
          <TouchableOpacity style={styles.btnBlack}>
            <AppText style={styles.saveButton} text={"Add"} />
          </TouchableOpacity>

          {/* Shift Availability Detail  */}
          <View style={styles.viewTopTitle}>
            <AppText
              text={"Shift Availability Detail"}
              style={styles.txtUnavailablity}
            />
          </View>

          {/* Save and Copy button  */}
          <View style={styles.viewSaveCopy}>
            <TouchableOpacity style={styles.btnSave}>
              <AppText style={styles.saveButton} text={"Save"} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnCopy}>
              <AppText style={styles.saveButton} text={"Copy"} />
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
          {isShowDistrictList ? (
            <View style={[styles.viewFlatList]}>
              <FlatList
                data={arrayDistricts ? arrayDistricts : []}
                renderItem={renderDistrictList}
                scrollEnabled={false}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          ) : null}
          {/* Shift Availability List */}
        </View>
      </View>
    </>
  );
};

const mapStateToProps = (state) => (
  // console.log(" availbility state ", state),
  {
    selectedDistrict: state.AvailabilityReducer.selectedDistrict,
  markedDates: state.AvailabilityReducer.markedDates,
  selectedWeek: state.AvailabilityReducer.selectedWeek.data,
  startDay: state.AvailabilityReducer.selectedWeek.weekStart,
  endDay: state.AvailabilityReducer.selectedWeek.weekEnd,
  arraySelectedDate: state.AvailabilityReducer.arraySelectedDate,
  // arrayCityAndTime: state.AvailabilityReducer.arrayCityAndTime,
  availabilityData: state.AvailabilityReducer.availabilityData,
  arrayDistricts: state.LoginReducer.districts,

});

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedDistrictsAction:(params) => dispatch(setSelectedDistricts(params)),
    setMarkeDatesAction: (params) => dispatch(setMarkeDates(params)),
    requestToGetRoasterDateRangeAction: (params) =>
      dispatch(requestToGetRoasterDateRange(params)),
    setSelectedDateAction: (params) => dispatch(setSelectedDateAction(params)),
    setCityAndTimeArrayAction: (params) =>
      dispatch(setCityAndTimeArray(params)),
   requestToGetAvailabilityAction:(params) => dispatch(requestToGetAvailability(params)),
   requestToSaveAvailabilityAction:(params) => dispatch(requestToSaveAvailability(params))

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Availability);
