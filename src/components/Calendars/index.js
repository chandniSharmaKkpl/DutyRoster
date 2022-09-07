import React from "react";
import { appColor, appConstant, fontConstant } from "@/constant";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";

const Calendars = (props) => {
  const navigation = useNavigation();
  const { markedDates } = props;
  const [getDisabledDates, setGetDisabledDates] = useState();

  const onClickDate = (day) => {
    props.onDayPress(day);
  };

  const createMarkedDateObject = (arrayDates) => {
    var newDaysObject = {};
    if (arrayDates && arrayDates.length > 0) {
      arrayDates.forEach((day) => {
        newDaysObject[day] = {
          selected: true,
          marked: true,
          dotColor: AppColor.colors.RED,
        };
      });
    }
    setMarkedDates(newDaysObject);
  };

  return (
    <>
      <Calendar
        style={{
          borderRadius: 8,
        }}
        markingType={"period"}
        markedDates={markedDates}
        monthFormat={"MMMM yyyy "}
        firstDay={1}
        onDayPress={(day) => onClickDate(day.dateString)}
        // allowRangeSelection={true}        
      />
    </>
  );
};
export default Calendars;
