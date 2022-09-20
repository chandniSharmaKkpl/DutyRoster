import React from "react";
import { appColor, appConstant, fontConstant } from "@/constant";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";

const Calendars = (props) => {
  const { markedDates, initialDate } = props;
  const onClickDate = (day) => {
    props.onDayPress(day);
  };
  return (
    <>
      <Calendar
        {...props}
        style={{
          borderRadius: 8,
        }}
        markingType={"period"}
        markedDates={markedDates}
        monthFormat={"MMMM yyyy "}
        firstDay={1}
        onDayPress={(day) => onClickDate(day.dateString)}
        initialDate={initialDate}
        // allowRangeSelection={true}
      />
    </>
  );
};
export default Calendars;
