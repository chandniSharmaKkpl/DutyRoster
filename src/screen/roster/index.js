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
import { StackActions } from "@react-navigation/native";

import styles from "./style";
import { AppText } from "@/components/AppText";
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/core";
import { alertMsgConstant, appColor, appConstant } from "@/constant";
import { CommonHeader } from "@/components";
import { Images } from "@/constant/svgImgConst";
import EmpTimeCard from "@/components/roasterEmpTimeCard";
import Calendars from "@/components/Calendars";
import moment from "moment";
import {
  API_DATE_FORMAT,
  CALENDER_DATE_FORMAT,
  changeDateFormat,
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
import RosterBottomCard from "@/components/RosterBottomCard";
import Loader from "@/components/Loader";

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
    data,
    cardData,
    accessToken,
    isAuth,
    rosterReducer,
  } = props;
  const [selectedItem, setSelectedItem] = useState(3);
  const [isCalendarShow, setIsCalendarShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [isAlertShow, setIsAlertShow] = useState(false);

  // markedDates obj function

  // console.log("cardData ===>", JSON.stringify(rosterReducer, null, 4));
  // console.log("startDay :::: endDay :::::", startDay,endDay);
  React.useLayoutEffect(() => {
    if (!accessToken || !isAuth) {
      const resetAction = StackActions.replace(appConstant.LOGIN);
      navigation.dispatch(resetAction);
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      var endDate = "";
      var startDate = new Date();
      endDate = moment(startDate).add(7, "d");
      // console.log("startDate", startDate);
      setSelectedWeek(startDate);
      setSelectedDate(startDate);
      setIsCalendarShow(false);
    }, [])
  );

  const getSelectedDayEvents = (date) => {
    setSelectedWeek(date);
    onClickCalendar();
  };

  const setSelectedWeek = React.useCallback((date) => {
    const _dateList = {};
    const _dateFlatList = [];

    const { days: _dateRange, weekStart, weekEnd } = getCurrentWeek(date);

    _dateRange.map((item, index) => {
      _dateList[changeDateFormat(item, API_DATE_FORMAT, CALENDER_DATE_FORMAT)] =
        {
          startingDay: index === 0 ? true : false,
          endingDay: index === _dateRange.length - 1 ? true : false,
          color: !(index === 0 || index === _dateRange.length - 1)
            ? appColor.RED
            : appColor.RED,
          textColor: appColor.WHITE,
          selected: index === _dateRange.length - 1 ? true : false,
          // selectedColor: 'blue'
          disabled: true,
        };
      _dateFlatList.push({
        id: getTimeStampfromDate(item),
        date: getDatefromFullDate(item),
        day: getDayfromDate(item),
      });
    });
    console.log("weekStart ===>", weekStart);
    setMarkeDatesAction({
      markedDates: _dateList,
      selectedWeek: _dateFlatList,
      weekStart: weekStart,
      weekEnd: weekEnd,
    });
    const fromDate = moment(weekStart).format(API_DATE_FORMAT);
    const toDate = moment(weekEnd).format(API_DATE_FORMAT);
    const params = {
      from: fromDate,
      to: toDate,
    };
    requestToGetRoasterDateRangeAction(params);
  }, []);

  const onClickCalendar = () => {
    setIsCalendarShow(!isCalendarShow);
  };
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
        </View>
        <View style={styles.empTimeCardDetails}>
          <EmpTimeCard data={data} cardData={cardData} />
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
              initialDate={startDay}
            />
          </View>
        )}
      </View>

      {rosterReducer.isRequesting ? (
        <Loader loading={rosterReducer.isRequesting} />
      ) : null}
    </>
  );
};
const mapStateToProps = (state) => ({
  markedDates: state.RosterReducer.markedDates,
  selectedWeek: state.RosterReducer.selectedWeek.data,
  startDay: state.RosterReducer.selectedWeek.weekStart,
  endDay: state.RosterReducer.selectedWeek.weekEnd,
  data: state.RosterReducer.data,
  cardData: state.RosterReducer.cardData,
  rosterReducer: state.RosterReducer,
  accessToken: state.LoginReducer.accessToken,
  isAuth: state.LoginReducer.isAuth,
});
const mapDispatchToProps = (dispatch) => {
  return {
    setMarkeDatesAction: (params) => dispatch(setMarkeDates(params)),
    requestToGetRoasterDateRangeAction: (params) =>
      dispatch(requestToGetRoasterDateRange(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RosterScreen);
