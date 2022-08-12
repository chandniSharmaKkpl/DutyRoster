import React from "react";
import { appConstant } from "@/constant";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";

const Calendars = (props) => {
  const navigation = useNavigation();
  const [getDisabledDates, setGetDisabledDates] = useState()

const moveBack = () => {
  // navigation.navigate(appConstant.ROASTER);
  navigation.goBack()
}

  return (
    <>
      <Calendar
        markingType={"period"}
        markedDates={{
          '2022-08-06': {marked: true, dotColor: '#50cebb'},
          '2022-08-17': {marked: true, dotColor: '#50cebb'},
          '2022-08-08': {startingDay: true, color: '#50cebb', textColor: 'white'},
          '2022-08-09': {color: '#70d7c7', textColor: 'white'},
          '2022-08-10': {color: '#70d7c7', textColor: 'white', marked: true, dotColor: 'white'},
          '2022-08-11': {color: '#70d7c7', textColor: 'white'},
          '2022-08-12': {color: '#70d7c7', textColor: 'white'},
          '2022-08-13': {color: '#70d7c7', textColor: 'white'},
          '2022-08-14': {endingDay: true, color: '#50cebb', textColor: 'white'}
        }}
      />
      <Pressable onPress={moveBack}>
        <Text>Back</Text>
      </Pressable>
    </>
  );
};

export default Calendars;
