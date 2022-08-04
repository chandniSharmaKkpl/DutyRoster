import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { fontConstant, appColor } from "../constant";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
// import IconMaterial from "react-native-vector-icons/MaterialIcons";
import { AppText } from "./AppText";

export const CommonHeader = (props) => {
  const {
    leftTitle,
    rightTitle,
    leftOnPress,
    rightOnPress,
    iconLeft,
    iconRight,
  } = props;
  return (
    <View style={styles.viewOuter}>
      <View style={styles.view1}>
      <View style={styles.viewLeft}>
        {/* <IconMaterial name={"wine-bar"} /> */}
        <AppText text={leftTitle} style={styles.txtLeft} />
      </View>

      <View style={styles.viewRight}>
        <AppText text={rightTitle} style={styles.txtRight} />
      </View>
      </View>
    </View>
  );
};

export const styles = {
  viewOuter: {
    backgroundColor: appColor.RED,
    height:hp('9%'), 
    //justifyContent:''
  },
  view1:{
   //backgroundColor:'pink', 
   paddingTop:hp('5%'), 
   flexDirection:'row', 
   justifyContent:'space-between', 
   flexWrap:'wrap', 
   paddingHorizontal:wp('3.4%')
  },
  viewLeft: {
   // paddingLeft:wp('5%'),
    flexDirection: "row",
    alignItems: "center",
  },
  viewRight: {},
  txtLeft: {
      color: appColor.WHITE,
      fontWeight: fontConstant.WEIGHT_SEMI_BOLD
  },
  txtRight:{
    color: appColor.WHITE,
    fontWeight: fontConstant.WEIGHT_REGULAR
  },
  iconLeft: {
    fontSize: 20,
  },
  iconRight: {},
};
