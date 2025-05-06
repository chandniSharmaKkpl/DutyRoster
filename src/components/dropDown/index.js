import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";

const DropDown = (props) => {
  return (
    <>
      <View style={styles.timeCardContainer}>
        <View style={styles.dateContainer}>
          <View style={styles.dateContainerTextCenter}>
            <Text style={styles.dateText}>09</Text>
            <Text style={styles.monthText}>May</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default DropDown;
