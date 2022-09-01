import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  BackHandler,
  Pressable,
  FlatList,
  Text,
  Dimensions,
  Platform,
  Alert,
} from "react-native";
import styles from "./style";
import { AppText } from "@/components/AppText";
import { useRoute, useNavigation } from "@react-navigation/core";
import { alertMsgConstant, appColor } from "@/constant";
import { CommonHeader } from "@/components";
import { Images } from "@/constant/svgImgConst";
import EmpTimeCard from "@/components/roasterEmpTimeCard";
import Calendars from "@/components/Calendars";
import moment from "moment";
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
} from "./redux/Roster.action";
import { dayDateReturn } from "@/common/timeFormate";
import { useSelector } from "react-redux";

const RosterScreen = (props) => {
  const navigation = useNavigation();
  const route = useRoute();

  const {
    setMarkeDatesAction,
    markedDates,
    requestToGetRoasterDateRangeAction,
    selectedWeek,
    startDay,
    endDay,
  } = props;
  const [selectedItem, setSelectedItem] = useState(3);
  const [isCalendarShow, setIsCalendarShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [isAlertShow, setIsAlertShow] = useState(false);

  var countBack = 0;
  // markedDates obj function

  React.useEffect(() => {
    var endDate = "";
    var startDate = new Date();
    endDate = moment(startDate).add(7, "d");
    console.log("startDate", startDate);
    setSelectedWeek(startDate);
    setSelectedDate(startDate);
    // action to api call format date
    // const fromDate = moment(startDate).format("YYYY-MM-DD");
    // const toDate = moment(endDate).format("YYYY-MM-DD");

    // const params = new FormData();
    // params.append("from", fromDate);
    // params.append("to", toDate);
    // requestToGetRoasterDateRangeAction(params);
  }, []);

  const getSelectedDayEvents = (date) => {
    setSelectedWeek(date);
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
  const Item = ({ day, date, id }) => (
    <Pressable
      onPress={() => {
        setSelectedItem(id);
      }}
    >
      <View
        style={
          selectedItem === id
            ? styles.dateTextBoxSelect
            : styles.dateTextunSelectBox
        }
      >
        <Text
          style={
            selectedItem === id
              ? styles.dayTextStyle
              : styles.unSelectDayTextStyle
          }
        >
          {day}
        </Text>
        <Text
          style={
            selectedItem === id
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
  console.log("getCurrentWeek", getCurrentWeek());
  return (
    <>
      <CommonHeader screenName={route?.name} />
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
        <View style={styles.empTimeCardDetails}>
          <EmpTimeCard />
        </View>
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
        {/* <View style={styles.viewBottom}>
          <TouchableOpacity onPress={goToLogin} style={styles.btnTransparant}>
            <AppText style={styles.txtBtnTry} text={"Go To Calander"} />
          </TouchableOpacity>
        </View> */}
      </View>
      {isAlertShow
        ? Alert.alert(
            alertMsgConstant.PLEASE_CONFIRM,
            alertMsgConstant.ARE_YOU_SURE_TO_LOGOUT,
            [
              {
                text: alertMsgConstant.NO,
                onPress: () => {
                  countBack = 0;
                  setIsAlertShow(false);
                },
                style: "cancel",
              },
              {
                text: alertMsgConstant.YES,
                onPress: () => {
                  BackHandler.exitApp();
                  setIsAlertShow(false);
                },
              },
            ]
          )
        : null}
    </>
  );
};
const mapStateToProps = (state) => ({
  markedDates: state.RosterReducer.markedDates,
  selectedWeek: state.RosterReducer.selectedWeek.data,
  startDay: state.RosterReducer.selectedWeek.weekStart,
  endDay: state.RosterReducer.selectedWeek.weekEnd,
});
const mapDispatchToProps = (dispatch) => {
  return {
    setMarkeDatesAction: (params) => dispatch(setMarkeDates(params)),
    requestToGetRoasterDateRangeAction: (params) =>
      dispatch(requestToGetRoasterDateRange(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RosterScreen);
