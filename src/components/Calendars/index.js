import React from "react";
import { appColor, appConstant, fontConstant } from "@/constant";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";

const Calendars = (props) => {
  const navigation = useNavigation();
  const [getDisabledDates, setGetDisabledDates] = useState();

  const moveBack = () => {
    // navigation.navigate(appConstant.ROASTER);
    navigation.goBack();
  };

  const onClickDate = (day) => {
    props.onDayPress(day);
  };

  return (
    <>
      <Calendar
        style={{
          height: 330,
          width: 250,
          borderWidth: 1,
          borderColor: '#D2D2D2',
          borderRadius: 8,
          paddingHorizontal: 10,
          shadowColor: "#0000001A",
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 22,
          shadowRadius: 4.65,
          elevation: 5,
        }}
        markingType={"period"}
        markedDates={{
          "2022-08-22": {
            startingDay: true,
            color: appColor.RED,
            textColor: appColor.WHITE,
            // selected: true`
          },
          "2022-08-23": {
            color: appColor.LIGHT_ORANGE,
            textColor: appColor.BLACK ,
            marked: true,
            dotColor: appColor.BLACK,
          },
          "2022-08-24": { color: appColor.LIGHT_ORANGE, textColor: appColor.BLACK },
          "2022-08-25": { color: appColor.LIGHT_ORANGE, textColor: appColor.BLACK },
          "2022-08-26": { color: appColor.LIGHT_ORANGE, textColor: appColor.BLACK },
          "2022-08-27": { color: appColor.LIGHT_ORANGE, textColor: appColor.BLACK },
          "2022-08-28": {
            endingDay: true,
            color: appColor.RED,
            textColor: appColor.WHITE,
          },
        }}
        // minDate={Date()}
        // maxDate={"2030-05-30"}
        monthFormat={"MMMM yyyy "}
        onDayPress={(day) => onClickDate(day.dateString)}
        allowRangeSelection={true}
      />
      {/* <Pressable onPress={moveBack}>
        <Text>Back</Text>
      </Pressable> */}
    </>
  );
};

export default Calendars;
