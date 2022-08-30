import React from "react";
import { appColor, appConstant, fontConstant } from "@/constant";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";

const Calendars = (props) => {
  const navigation = useNavigation();
  const {markedDates} = props;
  const [getDisabledDates, setGetDisabledDates] = useState();

  const onClickDate = (day) => {
    props.onDayPress(day);
    console.log("onClickDate =>", day);
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
        onDayPress={(day) => onClickDate(day.dateString)}
        allowRangeSelection={true}
      />
    </>
  );
};
export default Calendars;
