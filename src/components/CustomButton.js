import React from 'react'; 
import {View, Text, TouchableOpacity} from 'react-native'; 
import {fontConstant, appConstant, appColor} from '../constant'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export const CustomButton =(props)=>{
const {title, styleBtn, styleTxt, onPress } = props;
    return(
        <View style={[styles.view, styleBtn]}>
            <TouchableOpacity style={styles.btn} onPress={onPress}>
                <Text style={[styles.txt, styleTxt]}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}

export const styles = {
    view:{
      width: wp('90%'), 
      height: hp('6.2%'), 
      justifyContent:'center', 
      borderRadius: 30, 
      alignItems:'center', 
      margin:'2%', 
      borderColor: appColor.GRAY_LIGHT, 
      borderWidth:1
    }, 
    txt:{
      fontSize: fontConstant.TEXT_14_SIZE_REGULAR, 
      fontFamily: fontConstant.FONT_REGULAR, 
      fontWeight:fontConstant.WEIGHT_SEMI_BOLD
    }, 
    btn:{
       // backgroundColor:'pink',
        width:'100%', 
        height:'100%',
        justifyContent:'center', 
        alignItems:'center'
    }
}