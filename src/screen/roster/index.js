import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  BackHandler,
  Pressable,
  Image,
  FlatList,
  Text,
} from "react-native";
import stylesCommon from "../../common/commonStyle";
import styles from "./style";
import { AppText } from "@/components/AppText";
import { useRoute, useNavigation } from "@react-navigation/core";
import { CustomButton } from "@/components/CustomButton";
import { TouchableOpacity } from "react-native-gesture-handler";
import { appConstant, imageConstant } from "@/constant";
import { CommonHeader } from "@/components";
import { Images } from "@/constant/svgImgConst";
import EmpTimeCard from "@/components/roasterEmpTimeCard";
import style from "./style";

const RosterScreen = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [selectedItem, setSelectedItem] = useState(null);

  const dateData = [
    {
      id: 1,
      day: "Mon",
      date: "09",
    },
    {
      id: 2,
      day: "Tue",
      date: "10",
    },
    {
      id: 3,
      day: "Wed",
      date: "11",
    },
    {
      id: 4,
      day: "Thu",
      date: "12",
    },
    {
      id: 5,
      day: "Fri",
      date: "13",
    },
    {
      id: 6,
      day: "Sat",
      date: "14",
    },
    {
      id: 7,
      day: "Sun",
      date: "15",
    },
  ];

  const handleBackButtonClick = () => {
    moveBack();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);

    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);

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

  const moveBack = () => {
    props.navigation.goBack();
  };

  const onOpenCalendar = () => {
    props.navigation.navigate(appConstant.CALENDAR);
  };

  const goToLogin = () => {
    // props.navigation.navigate(appConstant.LOGIN);
  };

  return (
    <>
      <CommonHeader screenName={route?.name} />
      <View style={[styles.container]}>
        <View style={styles.topContain}>
          <View style={styles.weekDateTextContainer}>
            <AppText
              style={styles.weekDateTextStyle}
              text={"Mon, 09-05 - Sun, 15-05, 2022"}
            />
            <Pressable style={styles.caledarContainer} onPress={onOpenCalendar}>
              <Images.IMAGE_CALENDAE_SVG style={styles.caledarStyles} />
            </Pressable>
          </View>
          <View style={styles.dateLabelContainer}>
            <FlatList
              horizontal={true}
              data={dateData}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
        <View style={styles.empTimeCardDetails}>
          <EmpTimeCard />
        </View>
        <View style={styles.viewBottom}>
          <TouchableOpacity onPress={goToLogin} style={styles.btnTransparant}>
            <AppText style={styles.txtBtnTry} text={"Go To Calander"} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default RosterScreen;
