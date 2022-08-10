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
  }

  return (
    <>
      <CommonHeader screenName={route?.name} onGoBack={onGoBack}/>
      <View style={[styles.container]}>
        <QRCodeScanner
          onRead={onSuccess}
          cameraStyle={{ height: SCREEN_HEIGHT, width : SCREEN_WIDTH }}
          showMarker
          markerStyle={{
            borderColor: appColor.WHITE,
            borderRadius: 1,
            height: SCREEN_HEIGHT,
            width: SCREEN_WIDTH,
          }}
          customMarker={
            <View style={styles.rectangleContainer}>
              <View style={styles.topOverlay}>
                <Text>{""}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <View style={styles.leftAndRightOverlay} />
                <View style={styles.circleContainer}>
                  <View style={styles.rectangle}></View>
                  <Animatable.View
                    style={styles.scanBar}
                    direction="alternate-reverse"
                    iterationCount="infinite"
                    duration={1800}
                    easing="linear"
                    animation={makeSlideOutTranslation(
                      "translateY",
                      SCREEN_WIDTH * -0.30
                    )}
                  />
                </View>

                <View style={styles.leftAndRightOverlay} />
              </View>

              <View style={styles.topOverlay}>
                <Text style={styles.scanText}>
                Scan QR Code
                </Text>
                {/* <View style={{ marginTop: 40 }}>
                  <CustomButton />
                </View> */}
              </View>

              <View style={styles.bottomOverlay} />
            </View>
          }
        />
      </View>
    </>
  );
};

export default QRCodeScreen;
