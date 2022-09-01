import React from 'react'; 
import {View, Text, TouchableOpacity} from 'react-native'; 
import {fontConstant, appConstant, appColor} from '../constant'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export const AppText =(props)=>{
const {text,style  } = props;
    return(
       <Text numberOfLines={1} style={[styles.text,style]}>{text}</Text>
    )
}

export const styles = {
    // view:{
    //   width: wp('90%'), 
    //   height: hp('20%'), 
    //   justifyContent:'center'
    // }, 
    txt:{
      fontSize: fontConstant.TEXT_14_SIZE_REGULAR, 
      fontFamily: fontConstant.FONT_REGULAR
    }, 
    btn:{
        width:'100%', 
        height:'100%'
    }
}