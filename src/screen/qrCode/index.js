import React, { useState, useCallback, useEffect } from "react";
import { View, BackHandler, Linking, Dimensions } from "react-native";
import stylesCommon from "../../common/commonStyle";
import styles from "./style";
import { useNavigation, useRoute } from "@react-navigation/core";
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
import { requestToGetQRCodeResponse } from "./redux/QRCode.action";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
const QRCodeScreen = (props) => {
  const { requestToFetQRCodeResponseAction } = props;
  const svgRef = React.useRef();
  const textSVGRef = React.useRef();

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
    requestToFetQRCodeResponseAction(e);
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
        <CircleMAsk />
      </View>
    </>
  );
};

const mapDispatchToProps = (disptch) => {
  return {
    requestToFetQRCodeResponseAction: (params) =>
      disptch(requestToGetQRCodeResponse(params)),
  };
};

export default QRCodeScreen;
