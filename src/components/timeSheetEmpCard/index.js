import { dayDateReturn, EmpTimeCardDateFormate } from "@/common/timeFormate";
import React from "react";
import { heightPercentageToDP as hp } from "@/responsiveScreen";
import { View, Text, TouchableOpacity, FlatList, Platform } from "react-native";
import Item from "./Item";
import styles from "./styles";
import TimeSheetBottomCard from "../TimeSheetBottomCard";

const TimeSheetEmpTimeCard = (props) => {
  const { data, cardData } = props;

  const renderItem = ({ item, index }) => <Item item={item} key={index} />;

  console.log("DATA ===>", data);
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
        ListFooterComponent={<TimeSheetBottomCard cardData={cardData} />}
      />
    </View>
  );
};

export default TimeSheetEmpTimeCard;
