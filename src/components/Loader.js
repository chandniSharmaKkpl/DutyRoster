import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {appColor} from '../constant';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from '../responsiveScreen';
import {BackgroundImage} from 'react-native-elements/dist/config';

const Loader = props => {
  const styles = StyleSheet.create({
    viewTransparant: {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      // backgroundColor: 'pink',
      width: wp('100%'),
      height: hp('100%'),
    },
    viewWeb: {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      backgroundColor: 'rgb(173,207,240)',
      width: wp('100%'),
      height: hp('100%'),
    },
  });

  // console.log('style', styles);

  const [orientation, setOrientation] = React.useState('portrait');

  const {loading} = props;
  useEffect(() => {
    console.log('setOrientation', orientation);
    lor(setOrientation);
    return () => {
      rol();
    };
  }, []);

  console.log('wp', wp('100%'));

  console.log('hp', hp('100%'));

  return (
    <>
      {loading ? (
        <View style={props.viewName ? styles.viewWeb : styles.viewTransparant}>
          <ActivityIndicator size="large" color={appColor.NAVY_BLUE} />
        </View>
      ) : null}
    </>
  );
};

export default Loader;
