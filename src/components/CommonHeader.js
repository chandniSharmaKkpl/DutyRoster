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
    textCenter,
    leftOnPress,
    rightOnPress,
    viewLeft,
    viewRight,
  } = props;
  return (
    <View style={styles.viewOuter}>
      <View style={styles.view1}>
      <View style={styles.viewLeft}>
        {viewLeft}
      </View>

      <AppText text={textCenter} style={styles.txtCenter} />

      <View style={styles.viewRight}>
        {viewRight}
      </View>
      </View>
    </View>
  );
};

export const styles = {
  viewOuter: {
   // width:wp('100%'),
    backgroundColor: appColor.BLACK,
   // height:hp('9%'), 
    //justifyContent:''
  },
  view1:{

  backgroundColor:appColor.RED, 
    // paddingTop:hp('5%'), 
   flexDirection:'row', 
   justifyContent:'space-between', 
   alignItems:'center',
   height:hp('6%')
   //flexWrap:'wrap', 
  //  paddingHorizontal:wp('3.4%')
  },
  viewLeft: {
   // paddingLeft:wp('5%'),
    // flexDirection: "row",
    // alignItems: "center",
  },
  viewRight: {},
  txtCenter: {
    color: appColor.WHITE,
    fontWeight: fontConstant.WEIGHT_SEMI_BOLD,
    fontSize: fontConstant.TEXT_20_SIZE_REGULAR
},
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
