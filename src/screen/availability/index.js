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
} from "../availability/redux/Availability.action";
import { dayDateReturn } from "@/common/timeFormate";
import { useSelector } from "react-redux";
import Shift from "./Shift";
import AvailabilityItem from "@/screen/availability/AvailabilityItem";

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
    setSelectedDistrictsAction,
    removeSelectedDateAction,
    selectedDistrict,
    availabilityData,
    setArraySelectedDateAction,
    // arrayCityAndTime,
    selectedAvailabilityData,
    addNewAvailabilityAction,
    removeAvailabilityAction,
    setDataItemofAvailabilityAction,
    requestToSaveAvailabilityAction,
  } = props;

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
  React.useLayoutEffect(() => {
    var endDate = "";
    var startDate = new Date();
    endDate = moment(startDate).add(7, "d");
    setSelectedWeek(startDate);
    setSelectedDate(startDate);
  }, []);

  React.useEffect(() => {
    // setCityAndTimeArray(["1", "2"]);
    // action to api call format date
    var startDate = new Date();
    endDate = moment(startDate).add(7, "d");

    const fromDate = moment(startDate).format("YYYY-MM-DD");
    const toDate = moment(endDate).format("YYYY-MM-DD");
    const params = {
      week_start: "2022-09-05",
      week_end: "2022-09-11",
    };
    requestToGetAvailabilityAction(params);
    // if (arrayDistricts.length > 0) {
    //   setSelectedDistrictsAction(arrayDistricts[0]);
    // }
  }, []);

  React.useEffect(() => {
    // Get all dates to show selected
    // console.log(
    //   "AvailabilityReducer",
    //   JSON.stringify(props.AvailabilityReducer, null, 4)
    // );
  }, [props.AvailabilityReducer]);

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
    const _selectedDates = [];
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
      _selectedDates.push(getTimeStampfromDate(item));
    });

    console.log("_selectedDates", _selectedDates);
    setMarkeDatesAction({
      markedDates: _dateList,
      selectedWeek: _dateFlatList,
      weekStart: weekStart,
      weekEnd: weekEnd,
      availabilitySelectedDate: _selectedDates,
    });
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
        <ScrollView style={styles.scrollView}>
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
                requestToSaveAvailabilityAction();
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
              <Shift availabilityData={availabilityData} />
            </View>
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
            />
          </View>
        )}
      </View>
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
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Availability));
