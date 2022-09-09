import { dayDateReturn, EmpTimeCardDateFormate } from "@/common/timeFormate";
import React from "react";
import { heightPercentageToDP as hp } from "@/responsiveScreen";
import { View, Text, TouchableOpacity, FlatList, Platform } from "react-native";
import Item from "./Item";
import styles from "./styles";
import RosterBottomCard from "../RosterBottomCard";


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
