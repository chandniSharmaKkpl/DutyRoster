import React from 'react';
import {View, Text, Image} from 'react-native';
import appColor from '../constant/colorConstant';
import fontConstant from '../constant/fontConstant';
import format from 'date-fns/format';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import imageConstant from '../constant/imageConstant';
import appConstant from '../constant/appConstant';
import {Pressable} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';


const AlertView = props => {
  const {title, subtitle, confirmBtnTxt, cancelBtnTxt, buttonCount, bigBtnText, onPressConfirmBtn, onPressCancel, onPressBigBtn} = props;

  return (
    <View style={styles.viewOutSide}>
      <View style={buttonCount === 2? styles.viewInside1: styles.viewInsideWithBigButton}>
        <Text style={styles.textTitle}>{title}</Text>
        <Text style={styles.textSubtitle}>{subtitle}</Text>

        <View style={styles.viewButtons}>
          {buttonCount === 3? <TouchableOpacity style={styles.buttonGray} onPress={onPressCancel}>
            <Text style={[styles.textButtons]}>{cancelBtnTxt}</Text>
          </TouchableOpacity>:
          <TouchableOpacity style={styles.buttonRed} onPress={onPressCancel}>
          <Text style={styles.textButtons}>{cancelBtnTxt}</Text>
        </TouchableOpacity> }
          

          <TouchableOpacity style={styles.buttonYellow} onPress={onPressConfirmBtn}>
            <Text style={styles.textButtons}>{confirmBtnTxt}</Text>
          </TouchableOpacity>
        
        </View>

        {buttonCount === 3? 
        <View style={styles.viewButtons}>
            <Pressable style={styles.buttonRedBig} onPress={onPressBigBtn}>
            <Text style={styles.textBtnBigRed}>{bigBtnText}</Text>
          </Pressable>
          </View>
          : null }
      </View>
    </View>
  );
};

const styles = {
  viewButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  // backgroundColor:'pink',
    width:'100%', 
    paddingLeft:'2%',
    paddingRight:'2%',
    alignItems:'center',
   // height:'15%',
    marginTop:'5%',
    paddingBottom:'5%'
  },
  viewOutSide: {
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: 'rgba(0,0,0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    // position:'absolute'
  },
  viewInside1: {
    backgroundColor: appColor.WHITE,
    width: wp('90%'),
   // height: hp('35%'),
    borderRadius: 10,
    alignItems:'center',
    alignSelf:'center',
   // position:'absolute'

  },
  viewInsideWithBigButton:{
    backgroundColor: appColor.WHITE,
    width: wp('90%'),
   // height: hp('30%'),
    borderRadius: 10,
    alignItems:'center',
    alignSelf:'center'
  },
  textTitle: {
    fontFamily: fontConstant.BARLOW_BOLD,
    fontSize: fontConstant.TEXT_H2_SIZE_BOLD,
    color: appColor.GRAY,
    paddingBottom:'2%',
    paddingTop:'5%'
  },
  textSubtitle: {
    fontFamily: fontConstant.BARLOW_REGULAR,
    fontSize: fontConstant.TEXT_17_SIZE_REGULAR,
    color: appColor.GRAY,
   padding:'2%',
   textAlign:'center'
  },
  textButtons: {
    fontFamily: fontConstant.BARLOW_BOLD,
    fontSize: fontConstant.TEXT_H3_SIZE_BOLD,
    color: appColor.WHITE,
    textAlign:'center',
    paddingTop:'7%',
    paddingBottom:'7%'
  },
  textBtnBigRed: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    alignSelf: 'center',
    paddingTop:'5%',
    paddingBottom:'5%',
    fontFamily: fontConstant.BARLOW_BOLD,
    fontSize: fontConstant.TEXT_H3_SIZE_BOLD,
    color: appColor.WHITE,
    textAlign:'center',
   
  },
  buttonYellow: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    width: 150,
  //  height:'100%',
    alignSelf: 'center',
    backgroundColor: appColor.YELLOW,
    zIndex: 100
  },
  buttonRed: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    width: 150,
    alignSelf: 'center',
    backgroundColor: appColor.RED,
    zIndex: 100
  },
  buttonGray: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    width: 150,
    alignSelf: 'center',
    backgroundColor: appColor.GRAY_LIGHT,
    zIndex: 100
  },
  buttonRedBig: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    width: '95%',
    alignSelf: 'center',
    backgroundColor: appColor.RED,
  },
};

export default AlertView;
