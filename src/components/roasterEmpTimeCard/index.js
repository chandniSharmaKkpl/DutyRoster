import { dayDateReturn, EmpTimeCardDateFormate } from "@/common/timeFormate";
import React from "react";
import { heightPercentageToDP as hp } from "@/responsiveScreen";
import { View, Text, TouchableOpacity, FlatList, Platform } from "react-native";
import Item from "./Item";
import styles from "./styles";
import RosterBottomCard from "../RosterBottomCard";

const DATA = {
  "2022-08-29": [
    {
      date: "2022-08-29T00:00:00.000000Z",
      signin: "2022-08-29T10:30:00.000000Z",
      signout: "2022-08-29T16:30:00.000000Z",
      hours: 6,
      employee: "Win dodee",
      location: "Collins FOH",
      shift: "LHR",
    },
    {
      date: "2022-09-05T00:00:00.000000Z",
      signin: "2022-09-05T16:00:00.000000Z",
      signout: "2022-09-05T20:30:00.000000Z",
      hours: 4.5,
      employee: "Win dodee",
      location: "Collins BOH",
      shift: "DHR",
    },
  ],
  "2022-08-30": [
    {
      date: "2022-08-29T00:00:00.000000Z",
      signin: "2022-08-29T10:30:00.000000Z",
      signout: "2022-08-29T16:30:00.000000Z",
      hours: 6,
      employee: "Win dodee",
      location: "Collins FOH",
      shift: "LHR",
    },
    {
      date: "2022-09-05T00:00:00.000000Z",
      signin: "2022-09-05T16:00:00.000000Z",
      signout: "2022-09-05T20:30:00.000000Z",
      hours: 4.5,
      employee: "Win dodee",
      location: "Collins BOH",
      shift: "DHR",
    },
    {
      date: "2022-09-05T00:00:00.000000Z",
      signin: "2022-09-05T22:00:00.000000Z",
      signout: "2022-09-05T24:00:00.000000Z",
      hours: 7.0,
      employee: "Win dodee",
      location: "Collins BOH",
      shift: "SHR",
    },
  ],
  "2022-08-31": [
    {
      date: "2022-08-29T00:00:00.000000Z",
      signin: "2022-08-29T10:30:00.000000Z",
      signout: "2022-08-29T16:30:00.000000Z",
      hours: 6,
      employee: "Win dodee",
      location: "Collins FOH",
      shift: "LHR",
    },
    {
      date: "2022-09-05T00:00:00.000000Z",
      signin: "2022-09-05T16:00:00.000000Z",
      signout: "2022-09-05T20:30:00.000000Z",
      hours: 4.5,
      employee: "Win dodee",
      location: "Collins BOH",
      shift: "DHR",
    },
  ],
  "2022-09-01": [],
  "2022-09-02": [
    {
      date: "2022-08-29T00:00:00.000000Z",
      signin: "2022-08-29T10:30:00.000000Z",
      signout: "2022-08-29T16:30:00.000000Z",
      hours: 6,
      employee: "Win dodee",
      location: "Collins FOH",
      shift: "LHR",
    },
    {
      date: "2022-09-05T00:00:00.000000Z",
      signin: "2022-09-05T16:00:00.000000Z",
      signout: "2022-09-05T20:30:00.000000Z",
      hours: 4.5,
      employee: "Win dodee",
      location: "Collins BOH",
      shift: "DHR",
    },
  ],
  "2022-09-03": [
    {
      date: "2022-08-29T00:00:00.000000Z",
      signin: "2022-08-29T10:30:00.000000Z",
      signout: "2022-08-29T16:30:00.000000Z",
      hours: 6,
      employee: "Win dodee",
      location: "Collins FOH",
      shift: "LHR",
    },
    {
      date: "2022-09-05T00:00:00.000000Z",
      signin: "2022-09-05T16:00:00.000000Z",
      signout: "2022-09-05T20:30:00.000000Z",
      hours: 4.5,
      employee: "Win dodee",
      location: "Collins BOH",
      shift: "DHR",
    },
  ],
  "2022-09-04": [
    {
      date: "2022-08-29T00:00:00.000000Z",
      signin: "2022-08-29T10:30:00.000000Z",
      signout: "2022-08-29T16:30:00.000000Z",
      hours: 6,
      employee: "Win dodee",
      location: "Collins FOH",
      shift: "LHR",
    },
    {
      date: "2022-09-05T00:00:00.000000Z",
      signin: "2022-09-05T16:00:00.000000Z",
      signout: "2022-09-05T20:30:00.000000Z",
      hours: 4.5,
      employee: "Win dodee",
      location: "Collins BOH",
      shift: "DHR",
    },
  ],
  "2022-09-05": [
    {
      date: "2022-08-29T00:00:00.000000Z",
      signin: "2022-08-29T10:30:00.000000Z",
      signout: "2022-08-29T16:30:00.000000Z",
      hours: 6,
      employee: "Win dodee",
      location: "Collins FOH",
      shift: "LHR",
    },
    {
      date: "2022-09-05T00:00:00.000000Z",
      signin: "2022-09-05T16:00:00.000000Z",
      signout: "2022-09-05T20:30:00.000000Z",
      hours: 4.5,
      employee: "Win dodee",
      location: "Collins BOH",
      shift: "DHR",
    },
  ],
  "2022-09-06": [
    {
      date: "2022-08-29T00:00:00.000000Z",
      signin: "2022-08-29T10:30:00.000000Z",
      signout: "2022-08-29T16:30:00.000000Z",
      hours: 6,
      employee: "Win dodee",
      location: "Collins FOH",
      shift: "LHR",
    },
    {
      date: "2022-09-05T00:00:00.000000Z",
      signin: "2022-09-05T16:00:00.000000Z",
      signout: "2022-09-05T20:30:00.000000Z",
      hours: 4.5,
      employee: "Win dodee",
      location: "Collins BOH",
      shift: "DHR",
    },
  ],
  "2022-09-07": [
    {
      date: "2022-08-29T00:00:00.000000Z",
      signin: "2022-08-29T10:30:00.000000Z",
      signout: "2022-08-29T16:30:00.000000Z",
      hours: 6,
      employee: "Win dodee",
      location: "Collins FOH",
      shift: "LHR",
    },
    {
      date: "2022-09-05T00:00:00.000000Z",
      signin: "2022-09-05T16:00:00.000000Z",
      signout: "2022-09-05T20:30:00.000000Z",
      hours: 4.5,
      employee: "Win dodee",
      location: "Collins BOH",
      shift: "DHR",
    },
  ],
  "2022-09-08": [
    {
      date: "2022-08-29T00:00:00.000000Z",
      signin: "2022-08-29T10:30:00.000000Z",
      signout: "2022-08-29T16:30:00.000000Z",
      hours: 6,
      employee: "Win dodee",
      location: "Collins FOH",
      shift: "LHR",
    },
    {
      date: "2022-09-05T00:00:00.000000Z",
      signin: "2022-09-05T16:00:00.000000Z",
      signout: "2022-09-05T20:30:00.000000Z",
      hours: 4.5,
      employee: "Win dodee",
      location: "Collins BOH",
      shift: "DHR",
    },
  ],
  "2022-09-09": [
    {
      date: "2022-08-29T00:00:00.000000Z",
      signin: "2022-08-29T10:30:00.000000Z",
      signout: "2022-08-29T16:30:00.000000Z",
      hours: 6,
      employee: "Win dodee",
      location: "Collins FOH",
      shift: "LHR",
    },
    {
      date: "2022-09-05T00:00:00.000000Z",
      signin: "2022-09-05T16:00:00.000000Z",
      signout: "2022-09-05T20:30:00.000000Z",
      hours: 4.5,
      employee: "Win dodee",
      location: "Collins BOH",
      shift: "DHR",
    },
  ],
  "2022-09-10": [
    {
      date: "2022-08-29T00:00:00.000000Z",
      signin: "2022-08-29T10:30:00.000000Z",
      signout: "2022-08-29T16:30:00.000000Z",
      hours: 6,
      employee: "Win dodee",
      location: "Collins FOH",
      shift: "LHR",
    },
    {
      date: "2022-09-05T00:00:00.000000Z",
      signin: "2022-09-05T16:00:00.000000Z",
      signout: "2022-09-05T20:30:00.000000Z",
      hours: 4.5,
      employee: "Win dodee",
      location: "Collins BOH",
      shift: "DHR",
    },
  ],
  "2022-09-11": [
    {
      date: "2022-08-29T00:00:00.000000Z",
      signin: "2022-08-29T10:30:00.000000Z",
      signout: "2022-08-29T16:30:00.000000Z",
      hours: 6,
      employee: "Win dodee",
      location: "Collins FOH",
      shift: "LHR",
    },
    {
      date: "2022-09-05T00:00:00.000000Z",
      signin: "2022-09-05T16:00:00.000000Z",
      signout: "2022-09-05T20:30:00.000000Z",
      hours: 4.5,
      employee: "Win dodee",
      location: "Collins BOH",
      shift: "DHR",
    },
  ],
  "2022-09-12": [
    {
      date: "2022-08-29T00:00:00.000000Z",
      signin: "2022-08-29T10:30:00.000000Z",
      signout: "2022-08-29T16:30:00.000000Z",
      hours: 6,
      employee: "Win dodee",
      location: "Collins FOH",
      shift: "LHR",
    },
    {
      date: "2022-09-05T00:00:00.000000Z",
      signin: "2022-09-05T16:00:00.000000Z",
      signout: "2022-09-05T20:30:00.000000Z",
      hours: 4.5,
      employee: "Win dodee",
      location: "Collins BOH",
      shift: "DHR",
    },
  ],
  "2022-09-13": [
    {
      date: "2022-08-29T00:00:00.000000Z",
      signin: "2022-08-29T10:30:00.000000Z",
      signout: "2022-08-29T16:30:00.000000Z",
      hours: 6,
      employee: "Win dodee",
      location: "Collins FOH",
      shift: "LHR",
    },
    {
      date: "2022-09-05T00:00:00.000000Z",
      signin: "2022-09-05T16:00:00.000000Z",
      signout: "2022-09-05T20:30:00.000000Z",
      hours: 4.5,
      employee: "Win dodee",
      location: "Collins BOH",
      shift: "DHR",
    },
  ],
  "2022-09-14": [
    {
      date: "2022-08-29T00:00:00.000000Z",
      signin: "2022-08-29T10:30:00.000000Z",
      signout: "2022-08-29T16:30:00.000000Z",
      hours: 6,
      employee: "Win dodee",
      location: "Collins FOH",
      shift: "LHR",
    },
    {
      date: "2022-09-05T00:00:00.000000Z",
      signin: "2022-09-05T16:00:00.000000Z",
      signout: "2022-09-05T20:30:00.000000Z",
      hours: 4.5,
      employee: "Win dodee",
      location: "Collins BOH",
      shift: "DHR",
    },
  ],
  "2022-09-15": [
    {
      date: "2022-08-29T00:00:00.000000Z",
      signin: "2022-08-29T10:30:00.000000Z",
      signout: "2022-08-29T16:30:00.000000Z",
      hours: 6,
      employee: "Win dodee",
      location: "Collins FOH",
      shift: "LHR",
    },
    {
      date: "2022-09-05T00:00:00.000000Z",
      signin: "2022-09-05T16:00:00.000000Z",
      signout: "2022-09-05T20:30:00.000000Z",
      hours: 4.5,
      employee: "Win dodee",
      location: "Collins BOH",
      shift: "DHR",
    },
  ],
  "2022-09-16": [
    {
      date: "2022-08-29T00:00:00.000000Z",
      signin: "2022-08-29T10:30:00.000000Z",
      signout: "2022-08-29T16:30:00.000000Z",
      hours: 6,
      employee: "Win dodee",
      location: "Collins FOH",
      shift: "LHR",
    },
    {
      date: "2022-09-05T00:00:00.000000Z",
      signin: "2022-09-05T16:00:00.000000Z",
      signout: "2022-09-05T20:30:00.000000Z",
      hours: 4.5,
      employee: "Win dodee",
      location: "Collins BOH",
      shift: "DHR",
    },
  ],
  "2022-09-17": [
    {
      date: "2022-08-29T00:00:00.000000Z",
      signin: "2022-08-29T10:30:00.000000Z",
      signout: "2022-08-29T16:30:00.000000Z",
      hours: 6,
      employee: "Win dodee",
      location: "Collins FOH",
      shift: "LHR",
    },
    {
      date: "2022-09-05T00:00:00.000000Z",
      signin: "2022-09-05T16:00:00.000000Z",
      signout: "2022-09-05T20:30:00.000000Z",
      hours: 4.5,
      employee: "Win dodee",
      location: "Collins BOH",
      shift: "DHR",
    },
  ],
  "2022-09-18": [],
  "2022-09-19": [
    {
      date: "2022-08-29T00:00:00.000000Z",
      signin: "2022-08-29T10:30:00.000000Z",
      signout: "2022-08-29T16:30:00.000000Z",
      hours: 6,
      employee: "Win dodee",
      location: "Collins FOH",
      shift: "LHR",
    },
    {
      date: "2022-09-05T00:00:00.000000Z",
      signin: "2022-09-05T16:00:00.000000Z",
      signout: "2022-09-05T20:30:00.000000Z",
      hours: 4.5,
      employee: "Win dodee",
      location: "Collins BOH",
      shift: "DHR",
    },
  ],
  "2022-09-20": [
    {
      date: "2022-08-29T00:00:00.000000Z",
      signin: "2022-08-29T10:30:00.000000Z",
      signout: "2022-08-29T16:30:00.000000Z",
      hours: 6,
      employee: "Win dodee",
      location: "Collins FOH",
      shift: "LHR",
    },
    {
      date: "2022-09-05T00:00:00.000000Z",
      signin: "2022-09-05T16:00:00.000000Z",
      signout: "2022-09-05T20:30:00.000000Z",
      hours: "4.5",
      employee: "Win dodee",
      location: "Collins BOH",
      shift: "DHR",
    },
  ],
};
const EmpTimeCard = (props) => {
  const { data, cardData } = props;
  const renderItem = ({ item }) => <Item item={item} key={item[0]} />;

  // console.log("DATA", data);
  return (
    <View>
      <FlatList
        data={data ? Object.entries(data) : []}
        renderItem={renderItem}
        keyExtractor={(item) => item[0]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: hp("11.6%") + 80,
        }}
        style={styles.listContainer}
        // contentInset={{ right: 0, top: 0, left: 0, bottom: 165 }}
        // removeClippedSubviews={false}
        // style={{paddingBottom: 165}}
        ListFooterComponent={<RosterBottomCard cardData={cardData} />}
      />
    </View>
  );
};

export default EmpTimeCard;
