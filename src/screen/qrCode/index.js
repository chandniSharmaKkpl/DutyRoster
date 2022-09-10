import React, { useState, useCallback, useEffect } from "react";
import { View, BackHandler, Linking, Dimensions, Platform } from "react-native";
import stylesCommon from "../../common/commonStyle";
import styles from "./style";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/core";
import { CustomButton } from "@/components/CustomButton";
import { CommonHeader } from "@/components";
import * as Animatable from "react-native-animatable";
import QRCodeScanner from "react-native-qrcode-scanner";
import { appColor, fontConstant } from "@/constant";
import Svg, {
  Circle,
  Defs,
  Mask,
  Rect,
  Text as SvgText,
} from "react-native-svg";
import { connect } from "react-redux";
import moment from "moment";
import { convertDateTime } from "@/common/timeFormate";
import {
  requestToGetQRCodeResponse,
  setQRLocation,
} from "./redux/QRCode.action";
import RNLocation from "react-native-location";
import { checkMultiplePermision, requestPermission } from "@/libs/Permission";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const QRCodeScreen = (props) => {
  const { requestToFetQRCodeResponseAction, setQRLocationAction, location } =
    props;
  const scannerRef = React.useRef();
  const svgRef = React.useRef();
  const textSVGRef = React.useRef();
  const [permission, setPermission] = React.useState(
    Platform.OS === "ios" ? true : false
  );
  const navigation = useNavigation();
  const route = useRoute();
  const handleBackButtonClick = () => {
    moveBack();
    return true;
  };

  const onSuccess = (e) => {
     RNLocation.getLatestLocation({ timeout: 5000 }).then((latestLocation) => {
      try {
        let lat = latestLocation.latitude;
        let lon = latestLocation.longitude;
        console.log("lat && lon", lat, lon);
        setQRLocationAction({
          latitude: lat,
          longitude: lon,
        });
      } catch (error) {
        console.log("error at getlatestLocation", error);
      }
    });
    Linking.openURL(e.data).catch((err) =>
      console.log("An error occured", err)
    );

    const res = JSON.parse(e.data);
    console.log("QR code =>", res);
    const currentTime = new Date(); // get current date & time
    const location_id = res.location_id; // get location id when user scan QR code response
    const signIn = convertDateTime(currentTime, false, true); // convert time formate and get current time
    const date = convertDateTime(currentTime, true, false); // covert date formate and get current date
    // permissionHandle()
    //  if(timesheetId){
    //   requestToFetQRCodeResponseAction({
    //     location_id: location_id,
    //     signout: signIn,
    //     date: date,
    //     latitude: isLatitude,
    //     longitude: isLongitude,
    //     timesheet_id: timesheetId
    //   });
    //  }else{
    requestToFetQRCodeResponseAction({
      location_id: location_id,
      signin: signIn,
      date: date,
      latitude: location.latitude,
      longitude: location.longitude,
    });
    //  }
  };

  React.useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);

  useFocusEffect(() => {
    // Unsubscribe
    // RNLocation.getLatestLocation({ timeout: 5000 }).then((latestLocation) => {
    //   try {
    //     let lat = latestLocation.latitude;
    //     let lon = latestLocation.longitude;
    //     console.log("lat && lon", lat, lon);
    //     setQRLocationAction({
    //       latitude: lat,
    //       longitude: lon,
    //     });
    //   } catch (error) {
    //     console.log("error at getlatestLocation", error);
    //   }
    // });
    // unsubscribe();

    requestPermission(setPermission, onRequestGranted);
  });
  const moveBack = () => {
    props.navigation.goBack();
  };

  const makeSlideOutTranslation = (translationType, fromValue) => {
    return {
      from: {
        [translationType]: SCREEN_WIDTH * -0.18,
      },
      to: {
        [translationType]: fromValue,
      },
    };
  };

  const onGoBack = () => {
    props.navigation.goBack();
  };

  const MARGIN_TOP_RECT = 150;
  const MARGIN_TOP_TEXT = 80;

  React.useEffect(() => {
    if (textSVGRef) {
      // const result = textSVGRef.current.getBBox();
    }
  }, [textSVGRef]);

  const CircleMAsk = () => {
    const rectWidth = SCREEN_WIDTH * 0.45;
    const rectHeight = SCREEN_HEIGHT * 0.45;
    const circleWidth = (rectWidth / 2) * 1.75;
    const rectPosition = MARGIN_TOP_RECT;

    const cY = rectPosition + rectWidth / 2.0;
    const cX = SCREEN_WIDTH / 2.0;

    const rectX = cX - circleWidth;
    const rectY = cY - circleWidth;

    const internalRectX = cX - rectWidth / 2.0;
    const internalRectY = rectPosition;

    const textPosition = {
      x: SCREEN_WIDTH / 2.0 - 80,
      y: SCREEN_HEIGHT * 0.5 + MARGIN_TOP_TEXT,
    };
    return (
      <>
        <Svg height="100%" width="100%" ref={svgRef}>
          <Defs>
            <Mask id="RectMask" x="0" y="0" height="100%" width="100%">
              <Rect height="100%" width="100%" fill="#fff" />
              <Rect
                width={rectWidth}
                height={rectWidth}
                x={internalRectX}
                y={internalRectY}
                fill="black"
                rx="20"
                ry="20"
              />
              {/* <Rect x={10} y={10} width={100} height={100} /> */}
            </Mask>
            <Mask id="mask" x="0" y="0" height="100%" width="100%">
              <Rect height="100%" width="100%" fill="#fff" />
              <Circle r={circleWidth} cx={cX} cy={cY} fill="black" />
            </Mask>
          </Defs>
          <Rect
            height={circleWidth * 2}
            width={circleWidth * 2}
            x={rectX}
            y={rectY}
            fill="#ffe6e7"
            mask="url(#RectMask)"
            fill-opacity="0"
            borderRadius={15}
          />
          <Rect
            height="100%"
            width="100%"
            fill="#ffffff"
            mask="url(#mask)"
            fill-opacity="0"
          />
          <SvgText
            x={textPosition.x}
            y={textPosition.y}
            fill={appColor.BLACK}
            fontSize={fontConstant.TEXT_H2_SIZE_BOLD}
            fontFamily={fontConstant.FONT_BOLD}
            fontWeight={fontConstant.WEIGHT_BOLD}
            ref={textSVGRef}
          >
            Scan QR Code
          </SvgText>
        </Svg>
      </>
    );
  };

  const reactiveQRCode = React.useCallback(() => {
    console.log("reactiveQRCode");
    if (scannerRef.current) {
      // console.log("reactiveQRCode", scannerRef.current);
      // scannerRef.current.reactivate();
    }
  }, []);

  const onRequestGranted = () => {
    reactiveQRCode();
    startUpdatingLocation();
  };

  // React.useEffect(() => {
  //   requestPermission(setPermission, onRequestGranted);
  // }, []);
  // React.useEffect(() => {
  //   RNLocation.checkPermission({
  //     ios: "always", // or 'always'
  //     android: {
  //       detail: "coarse", // or 'fine'
  //     },
  //   });

  //   RNLocation.requestPermission({
  //     ios: "whenInUse",
  //     android: {
  //       detail: "fine",
  //       rationale: {
  //         title: "Location permission",
  //         message: "We use your location to demo the library",
  //         buttonPositive: "OK",
  //         buttonNegative: "Cancel",
  //       },
  //     },
  //   }).then((granted) => {
  //     // alert(granted);
  //     if (granted) {
  //       startUpdatingLocation();
  //     } else {
  //       alert("Please allow location from settings");
  //     }
  //   });

  //   // When Permission Changed

  //   // React.useEffect(() => {
  //   //   // Subscribe

  //   //   return () => {
  //   //     // unsubscribe();
  //   //   };
  //   //   // // Unsubscribe
  //   // }, []);
  //   // Subscribe
  //   RNLocation.configure({
  //     distanceFilter: 50, // Meters

  //     desiredAccuracy: {
  //       ios: "best",
  //       android: "balancedPowerAccuracy",
  //     },
  //     // // Android only
  //     // androidProvider: "auto",
  //     // // interval: 10000, // Milliseconds
  //     // // fastestInterval: 10000, // Milliseconds
  //     // // maxWaitTime: 60000, // Milliseconds
  //     // // iOS Only
  //     activityType: "other",
  //     allowsBackgroundLocationUpdates: false,
  //     headingFilter: 1, // Degrees
  //     headingOrientation: "portrait",
  //     pausesLocationUpdatesAutomatically: false,
  //     showsBackgroundLocationIndicator: false,
  //   });
  //   const unsubscribe = RNLocation.subscribeToPermissionUpdates(
  //     (currentPermission) => {
  //       if (currentPermission === "authorizedWhenInUse") {
  //       } else if (currentPermission === "denied") {
  //         alert("Please allow location from settings");
  //       }
  //       console.log("currentPermission", currentPermission);
  //       // startUpdatingLocation();
  //     }
  //   );
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);
  // const unsubscribe = RNLocation.subscribeToPermissionUpdates(
  //   (currentPermission) => {
  //     if (currentPermission === "authorizedWhenInUse") {
  //     } else if (currentPermission === "denied") {
  //       alert("Please allow location from settings");
  //     }
  //     console.log("currentPermission", currentPermission);
  //     // startUpdatingLocation();
  //   }
  // );
  // unsubscribe();
  const startUpdatingLocation = () => {
    return RNLocation.subscribeToLocationUpdates((locations) => {
      let lat = locations[0].latitude;
      let lon = locations[0].longitude;
      console.log("locations: ", lat, lon);
      setQRLocationAction({
        latitude: lat,
        longitude: lon,
      });
    });
  };

  return (
    <>
      <CommonHeader screenName={route?.name} onGoBack={onGoBack} />
      <View style={[styles.container]}>
        {permission && (
          <QRCodeScanner
            // ref={scannerRef}

            ref={(node) => {
              scannerRef.current = node;
            }}
            checkAndroid6Permissions={true}
            onRead={onSuccess}
            cameraStyle={{ height: SCREEN_HEIGHT, width: SCREEN_WIDTH }}
            reactivate={true}
            reactivateTimeout={3000}
            showMarker
            markerStyle={{
              borderColor: appColor.WHITE,
              borderRadius: 1,
              height: SCREEN_HEIGHT,
              width: SCREEN_WIDTH,
            }}
            customMarker={
              <>
                <View style={{ position: "relative" }}>
                  <View style={styles.rectangleContainer}>
                    <View style={{ marginTop: MARGIN_TOP_RECT }} />
                    <View style={{ flexDirection: "row" }}>
                      <View style={styles.leftAndRightOverlay} />
                      <View>
                        <Animatable.View
                          style={styles.scanBar}
                          direction="alternate-reverse"
                          iterationCount="infinite"
                          duration={1800}
                          easing="linear"
                          animation={makeSlideOutTranslation("translateY", 150)}
                        />
                      </View>
                      <View style={styles.leftAndRightOverlay} />
                    </View>

                    <View style={styles.bottomOverlay} />
                  </View>
                </View>
              </>
            }
          />
        )}
        <CircleMAsk />
      </View>
    </>
  );
};

const mapStateToProps = (state) => ({
  accessToken: state.LoginReducer.accessToken,
  location: state.QRCode_ResponseReducer.location,
});

const mapDispatchToProps = (dispatch) => {
  return {
    requestToFetQRCodeResponseAction: (params) =>
      dispatch(requestToGetQRCodeResponse(params)),
    setQRLocationAction: (params) => dispatch(setQRLocation(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QRCodeScreen);
