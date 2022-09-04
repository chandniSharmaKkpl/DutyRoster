import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  BackHandler,
  Keyboard,
  Text,
  FlatList,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";
import stylesCommon from "../../common/commonStyle";
import { AppText } from "@/components/AppText";
import { useRoute, useNavigation } from "@react-navigation/core";
import { CustomButton } from "@/components/CustomButton";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  appConstant,
  imageConstant,
  alertMsgConstant,
  appColor,
  fontConstant,
} from "@/constant";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Shift = (props) => {
  const { arrayShift } = props;

  const renderItem = ({ item }) => {

    return (
         <View>

    </View>
    )
  };
  return (
    <View style={styles.viewOuter}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <AppText text={"DATE"} style={styles.txtRed}/>
            <AppText text={"DISTRICTS"} style={styles.txtRed}/>
            <AppText text={"IN"} style={styles.txtRed}/>
            <AppText text={"OUT"} style={styles.txtRed}/>

             </View>
      <FlatList
        data={arrayShift}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export const styles={
    viewOuter:{
        backgroundColor:appColor.WHITE, 
        borderWidth: 1,
        borderColor: "#D2D2D2",
        borderRadius: 10,
        shadowColor: "#0000001A",
        shadowOffset: {
          width: 1,
          height: 1,
        },
        shadowOpacity: 22,
        shadowRadius: 4.65,
    },
 txtRed:{
    fontFamily: fontConstant.FONT_SEMI_BOLD,
    fontSize: fontConstant.TEXT_18_SIZE_REGULAR,
    color: appColor.RED,
    paddingVertical: hp("1%"),
    // paddingHorizontal:wp("1%")
 }
}
export default Shift; 