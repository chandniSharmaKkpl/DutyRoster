import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {appColor} from '../constant';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from '../responsiveScreen';


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

  const [orientation, setOrientation] = React.useState('portrait');

  const {loading} = props;
  useEffect(() => {
    lor(setOrientation);
    return () => {
      rol();
    };
  }, []);

  return (
    <>
      {loading ? (
        <View style={props.viewName ? styles.viewWeb : styles.viewTransparant}>
          <ActivityIndicator size="large" color={appColor.RED} />
        </View>
      ) : null}
    </>
  );
};

export default Loader;
