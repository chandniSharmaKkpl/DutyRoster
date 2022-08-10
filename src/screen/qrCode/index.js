import React, { useState, useCallback, useEffect } from "react";
import { View, BackHandler, Text, Linking, Dimensions } from "react-native";
import stylesCommon from "../../common/commonStyle";
import styles from "./style";
import { useNavigation, useRoute } from "@react-navigation/core";
import { CustomButton } from "@/components/CustomButton";
import { CommonHeader } from "@/components";
import * as Animatable from "react-native-animatable";
import QRCodeScanner from "react-native-qrcode-scanner";
import { appColor } from "@/constant";
import Svg, { Circle, Defs, Mask, Rect } from "react-native-svg";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
const iconScanColor = "blue";

const QRCodeScreen = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const handleBackButtonClick = () => {
    moveBack();
    return true;
  };

  const onSuccess = (e) => {
    Linking.openURL(e.data).catch((err) =>
      console.error("An error occured", err)
    );
    console.log("success ==>", e);
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);

    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);

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
  const CircleMAsk = () => {
    const rectWidth = SCREEN_WIDTH * 0.45;
    const circleWidth = (rectWidth / 2) * 1.75;
    const rectPosition = MARGIN_TOP_RECT;
    
    const cY = rectPosition + rectWidth / 2.0;
    const cX = (SCREEN_WIDTH/2.0)

    const rectX = cX - circleWidth
    const rectY = cY - circleWidth

    const internalRectX = cX - (rectWidth/2.0)
    const internalRectY = rectPosition

    return (
      <>
        
        <Svg height="100%" width="100%">
          <Defs>
            <Mask id="RectMask" x="0" y="0" height="100%" width="100%">
              <Rect height="100%" width="100%" fill="#fff" />
              <Rect width={rectWidth} height={rectWidth} x={internalRectX} y ={internalRectY} fill="black" />
              {/* <Rect x={10} y={10} width={100} height={100} /> */}
            </Mask>
            <Mask id="mask" x="0" y="0" height="100%" width="100%">
              <Rect height="100%" width="100%" fill="#fff" />
              <Circle r={circleWidth} cx={cX} cy={cY} fill="black" />
            </Mask>
          </Defs>
          <Rect
            height={circleWidth*2}
            width={circleWidth*2}
            x={rectX} 
            y={rectY}
            fill="#ffe6e7"
            mask="url(#RectMask)"
            fill-opacity="0"
          />
          <Rect
            height="100%"
            width="100%"
            fill="#ffffff"
            mask="url(#mask)"
            fill-opacity="0"
          />
        </Svg>
      </>
    );
  };

  return (
    <>
      <CommonHeader screenName={route?.name} onGoBack={onGoBack} />
      <View style={[styles.container]}>
        <QRCodeScanner
          onRead={onSuccess}
          cameraStyle={{ height: SCREEN_HEIGHT, width: SCREEN_WIDTH }}
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
                  {/* <View style={styles.topOverlay}>
                    <Text>{""}</Text>
                  </View> */}
                  <View style={{ marginTop: MARGIN_TOP_RECT }} />
                  <View style={{ flexDirection: "row" }}>
                    <View style={styles.leftAndRightOverlay} />
                    <View>
                      {/* <View style={styles.rectangle}></View> */}
                      <Animatable.View
                        style={styles.scanBar}
                        direction="alternate-reverse"
                        iterationCount="infinite"
                        duration={1800}
                        easing="linear"
                        animation={makeSlideOutTranslation(
                          "translateY",
                          150
                        )}
                      />
                    </View>
                    <View style={styles.leftAndRightOverlay} />
                  </View>

                  <View style={styles.topOverlay}>
                    <Text style={styles.scanText}>Scan QR Code</Text>
                    <View style={{ marginTop: 40 }}>
                      <CustomButton />
                    </View>
                  </View>

                  <View style={styles.bottomOverlay} />
                </View>
              </View>
            </>
          }
        />
        <CircleMAsk />
      </View>
    </>
  );
};

export default QRCodeScreen;
