import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  ScrollView,
  Alert,
} from "react-native";
import styles from "./style";
import { AppText } from "@/components/AppText";
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/core";
import { TouchableOpacity } from "react-native-gesture-handler";
import { appConstant, appColor, alertMsgConstant } from "@/constant";
import { CommonHeader } from "@/components";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { Images } from "@/constant/svgImgConst";
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
  setSelectedDistricts,
  setArraySelectedDate,
  removeSelectedDateAction,
  removeAvailability,
  addNewAvailability,
  setDataItemOfAvailability,
  resetAvailabilityData,
  requestToAddAvailability,
  updateDataItemOfAvailability,
  deleteDataItemOfAvailability,
} from "../availability/redux/Availability.action";
import { dayDateReturn } from "@/common/timeFormate";
import Shift from "./Shift";
import AvailabilityItem from "@/screen/availability/AvailabilityItem";
import Loader from "@/components/Loader";
import ModelBox from "@/components/PopUpmodel";

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
    setSelectedDateAction,
    removeSelectedDateAction,
    availabilityData,
    selectedAvailabilityData,
    isSelectedAvailabilityDataSaved,
    addNewAvailabilityAction,
    removeAvailabilityAction,
    setDataItemofAvailabilityAction,
    updateDataItemofAvailabilityAction,
    deleteDataItemofAvailabilityAction,
    requestToSaveAvailabilityAction,
    resetAvailabilityDataAction,
    requestToAddAvailabilityAction,
  } = props;

  console.log("startDay --->", startDay);

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

  const onChangeUnavailablityDate = useCallback(
    (text) => setUnavailablityDate(text),
    []
  );

  useFocusEffect(
    React.useCallback(() => {
      var endDate = "";
      var startDate = moment().add(1, "weeks").startOf("isoWeek").toDate();
      endDate = moment(startDate).add(7, "d");
      setSelectedWeek(startDate);
      setSelectedDate(startDate);
      setIsCalendarShow(false);
      return () => {
        resetAvailabilityDataAction();
      };
    }, [])
  );

  const getSelectedDayEvents = (date) => {
    if (!isSelectedAvailabilityDataSaved) {
      Alert.alert(
        alertMsgConstant.WARNING,
        alertMsgConstant.AVAILABILITY_ALERT_MSG,
        [
          {
            text: alertMsgConstant.CANCEL,

            onPress: () => {
              console.log("Cancel Pressed");
              onClickCalendar();
            },
            style: "cancel",
          },
          {
            text: alertMsgConstant.OK,
            onPress: () => {
              setSelectedWeek(date);
              onClickCalendar();
            },
          },
        ]
      );
    } else {
      setSelectedWeek(date);
      onClickCalendar();
    }
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

  const onPressAddIcon = () => {
    if (timeData.length > 0) {
      setTimeData([...timeData, { inTime: "", outTime: "" }]);
    } else {
      setTimeData([{ inTime: "", outTime: "" }]);
    }
  };

  const setSelectedWeek = React.useCallback((date, copied = false) => {
    const _dateList = {};
    const _dateFlatList = [];

    const { days: _dateRange, weekStart, weekEnd } = getCurrentWeek(date);
    const _selectedDates = [];
    _dateRange.map((item, index) => {
      _dateList[item] = {
        startingDay: index === 0 ? true : false,
        endingDay: index === _dateRange.length - 1 ? true : false,
        selected: false,
        color: !(index === 0 || index === _dateRange.length - 1)
          ? appColor.RED
          : appColor.RED,
        textColor: appColor.WHITE,
      };
      _dateFlatList.push({
        id: getTimeStampfromDate(item),
        date: getDatefromFullDate(item),
        day: getDayfromDate(item),
      });
      _selectedDates.push(getTimeStampfromDate(item));
    });

    const fromDate = moment(weekStart).format("YYYY-MM-DD");
    const toDate = moment(weekEnd).format("YYYY-MM-DD");
    const params = {
      week_start: fromDate,
      week_end: toDate,
    };
    setMarkeDatesAction({
      markedDates: _dateList,
      selectedWeek: _dateFlatList,
      weekStart: weekStart,
      weekEnd: weekEnd,
      availabilitySelectedDate: _selectedDates,
    });
    requestToGetAvailabilityAction({ params, copied });
  }, []);

  const onClickDate = (id) => {
    if (arraySelectedDate.includes(id)) {
      const index = arraySelectedDate.indexOf(id);
      if (index > -1) {
        // only splice array when item is found
        // let arrayTemp = arraySelectedDate.splice(index, 1); // 2nd parameter means remove one item only
        removeSelectedDateAction(id);
      }
    } else {
      setSelectedDateAction(id);
    }
  };

  const Item = ({ day, date, id }) => (
    <Pressable
      // style={{ backgroundColor: "pink" }}
      onPress={() => onClickDate(id)}
    >
      <View
        style={
          arraySelectedDate && arraySelectedDate.includes(id)
            ? styles.dateTextBoxSelect
            : styles.dateTextunSelectBox
        }
      >
        <Text
          style={
            arraySelectedDate && arraySelectedDate.includes(id)
              ? styles.dayTextStyle
              : styles.unSelectDayTextStyle
          }
        >
          {day}
        </Text>
        <Text
          style={
            arraySelectedDate && arraySelectedDate.includes(id)
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

  const nextWeekData = React.useCallback(() => {
    Alert.alert(
      alertMsgConstant.WARNING,
      alertMsgConstant.REPLACE_YOUR_NEXT_WEEK_DATA,
      [
        {
          text: alertMsgConstant.CANCEL,
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: alertMsgConstant.OK,
          onPress: () => {
            const startNextWeek = moment(endDay)
              .add(1, "weeks")
              .startOf("isoWeek");
            setSelectedWeek(startNextWeek, true);
          },
        },
      ]
    );
    return () => {};
  });

  const onNextWeekCopyData = () => {
    if (!isSelectedAvailabilityDataSaved) {
      Alert.alert(
        alertMsgConstant.WARNING,
        alertMsgConstant.AVAILABILITY_ALERT_MSG,
        [
          {
            text: alertMsgConstant.CANCEL,
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: alertMsgConstant.OK,
            onPress: () => {
              nextWeekData();
            },
          },
        ]
      );
    } else {
      nextWeekData();
    }
  };

  if (!startDay || !endDay) {
    return (
      <>
        <Loader loading={true} />
      </>
    );
  }
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

        {/*  Need to add scroll view here  */}
        <ScrollView nestedScrollEnabled style={styles.scrollView}>
          {/* City and Time list */}

          {/* Shift Availability Detail  */}

          {selectedAvailabilityData.map((availabilityData) => {
            return (
              <>
                <AvailabilityItem
                  data={availabilityData}
                  arrayDistricts={arrayDistricts}
                  addNewAvailabilityAction={addNewAvailabilityAction}
                  removeAvailabilityAction={removeAvailabilityAction}
                  setDataItemofAvailabilityAction={
                    setDataItemofAvailabilityAction
                  }
                />
              </>
            );
          })}
          <View>
            <Pressable
              style={styles.btnBlack}
              onPress={() => {
                requestToAddAvailabilityAction();
              }}
            >
              <AppText style={styles.saveButton} text={"Add"} />
            </Pressable>
          </View>
          {/* Shift Availability Detail  */}

          <View style={styles.viewTopTitle}>
            <AppText
              text={"Shift Availability Detail"}
              style={styles.txtUnavailablity}
            />
            <View>
              <Shift
                updateDataItemofAvailabilityAction={
                  updateDataItemofAvailabilityAction
                }
                arrayDistricts={arrayDistricts}
                availabilityData={availabilityData}
                deleteDataItemofAvailabilityAction={
                  deleteDataItemofAvailabilityAction
                }
              />
            </View>
          </View>
          {/* Save and Copy button  */}
          <View style={styles.viewSaveCopy}>
            {!isSelectedAvailabilityDataSaved && (
              <TouchableOpacity
                style={styles.btnSave}
                onPress={() => {
                  requestToSaveAvailabilityAction();
                }}
              >
                <AppText style={styles.saveButton} text={"Save"} />
              </TouchableOpacity>
            )}
            {isSelectedAvailabilityDataSaved && (
              <TouchableOpacity
                style={styles.btnCopy}
                onPress={onNextWeekCopyData}
              >
                <AppText style={styles.saveButton} text={"Copy"} />
              </TouchableOpacity>
            )}
          </View>

          {isDatePickerVisible && (
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          )}

          {/* Shift Availability List */}
        </ScrollView>
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
              initialDate={startDay}
            />
          </View>
        )}
      </View>
      {props.AvailabilityReducer.isRequesting ? (
        <Loader loading={props.AvailabilityReducer.isRequesting} />
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => ({
  selectedDistrict: state.AvailabilityReducer.selectedDistrict,
  markedDates: state.AvailabilityReducer.markedDates,
  selectedWeek: state.AvailabilityReducer.selectedWeek.data,
  startDay: state.AvailabilityReducer.selectedWeek.weekStart,
  endDay: state.AvailabilityReducer.selectedWeek.weekEnd,
  arraySelectedDate:
    state.AvailabilityReducer.selected.availabilitySelectedDate,

  isSelectedAvailabilityDataSaved: state.AvailabilityReducer.selected.isSaved,
  selectedAvailabilityData: state.AvailabilityReducer.selected.availabilityData,
  // arrayCityAndTime: state.AvailabilityReducer.arrayCityAndTime,
  availabilityData: state.AvailabilityReducer.availabilityData,
  arrayDistricts: state.LoginReducer.districts,
  AvailabilityReducer: state.AvailabilityReducer,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setArraySelectedDateAction: (params) =>
      dispatch(setArraySelectedDate(params)),

    setSelectedDistrictsAction: (params) =>
      dispatch(setSelectedDistricts(params)),
    setMarkeDatesAction: (params) => dispatch(setMarkeDates(params)),
    requestToGetRoasterDateRangeAction: (params) =>
      dispatch(requestToGetRoasterDateRange(params)),
    setSelectedDateAction: (params) => dispatch(setSelectedDateAction(params)),
    removeSelectedDateAction: (params) =>
      dispatch(removeSelectedDateAction(params)),
    requestToGetAvailabilityAction: (params) =>
      dispatch(requestToGetAvailability(params)),
    requestToSaveAvailabilityAction: (params) =>
      dispatch(requestToSaveAvailability(params)),

    // setCityAndTimeArray
    setCityAndTimeArrayAction: (params) =>
      dispatch(setCityAndTimeArray(params)),

    addNewAvailabilityAction: () => dispatch(addNewAvailability()),
    removeAvailabilityAction: (params) => dispatch(removeAvailability(params)),
    setDataItemofAvailabilityAction: (params) =>
      dispatch(setDataItemOfAvailability(params)),
    updateDataItemofAvailabilityAction: (params) =>
      dispatch(updateDataItemOfAvailability(params)),
    deleteDataItemofAvailabilityAction: (params) =>
      dispatch(deleteDataItemOfAvailability(params)),
    resetAvailabilityDataAction: () => dispatch(resetAvailabilityData()),

    requestToAddAvailabilityAction: () => dispatch(requestToAddAvailability()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Availability));
