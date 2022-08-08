import React from "react";
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { appColor, appConstant, fontConstant, imageConstant } from "@/constant";
import { useRef } from "react";
// import { Images } from "@/constant/svgImgConst";
import RosterScreen from "@/screen/roster";
import TimeSheetScreen from "@/screen/timeSheet";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "../responsiveScreen";
import QRCodeScreen from "@/screen/qrCode";

const Tab = createBottomTabNavigator();

export default function HomeNavigation(props) {
  const tabOffsetValue = useRef(new Animated.Value(0)).current;

  const styles = StyleSheet.create({
    tab: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    tabBarLabel: {
      fontFamily: fontConstant.FONT_BOLD,
      fontSize: fontConstant.TEXT_H3_SIZE_REGULAR,
      color: appColor.GRAY,
      textAlign: "center",
    },
    focuseTabLabel: {
      fontFamily: fontConstant.FONT_BOLD,
      fontSize: fontConstant.TEXT_H3_SIZE_REGULAR,
      color: appColor.RED,
    },
    image: {
      width: "100%",
      height: "100%",
    },
    viewImage: {
      width: wp("6%"),
      height: hp("4.5%"),
      paddingTop: hp('1%')
    },
    redCircle: {
      width: 72,
      height: 72,
      opacity: 0.8,
      backgroundColor: appColor.RED,
      alignItems: "center",
      paddingBottom: hp("5%"),
      position: "absolute",
      bottom: hp("1%"),
      borderWidth: 1,
      borderRadius: 50,
      borderColor: appColor.RED,
    },
    qrCode_viewImage: {
      width: 32,
      height: 32,
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      margin: 18,
    },
  });

  return (
    <Tab.Navigator
      initialRouteName={RosterScreen}
      tabBarOptions={{
        showLabel: false,
        // Floating Tab Bar...
        padding: hp("5%"),
        style: {
          backgroundColor: appColor.BLACK,
          position: "absolute",
          //   bottom: 40,
          marginHorizontal: wp("10%"),
          // Max Height...
          height: hp("10%"),
          borderRadius: 10,
          // Shadow...
          shadowColor: "#000",
          shadowOpacity: 0.06,
          shadowOffset: {
            width: 10,
            height: 10,
          },
          paddingHorizontal: 20,
        },
      }}
    >
      <Tab.Screen
        name={"Roster"}
        component={RosterScreen}
        screenOptions= {{ 
          activeTintColor:'red'
        }}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.tab}>
              <View style={styles.viewImage}>
                <Image
                  source={imageConstant.IMAGE_HOME_ICON}
                  resizeMode={"contain"}
                  style={styles.image}
                  tintColor={focused ? appColor.RED : appColor.GRAY}
                />
              </View>
              <Text
                style={focused ? styles.focuseTabLabel : styles.tabBarLabel}
              >
                Roster
              </Text>
            </View>
          ),
        }}
        listeners={({ navigation, route }) => ({
          // Onpress Update....
          tabPress: (e) => {
            Animated.spring(tabOffsetValue, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
          },
        })}
      />

      <Tab.Screen
        name={"QR Code"}
        component={QRCodeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tab}>
              <View style={styles.redCircle}>
                <View style={styles.qrCode_viewImage}>
                  <Image
                    source={imageConstant.IAMGE_QR_CODE_ICON}
                    resizeMode={"contain"}
                    style={styles.image}
                  />
                </View>
              </View>
            </View>
          ),
        }}
        listeners={({ navigation, route }) => ({
          // Onpress Update....
          tabPress: (e) => {
            Animated.spring(tabOffsetValue, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
          },
        })}
      />

      <Tab.Screen
        name={"Timesheet"}
        component={TimeSheetScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tab}>
              <View style={styles.viewImage}>
                {/* <Image
                  source={imageConstant.IMAGE_CALENDAE_ICON}
                  resizeMode={"contain"}
                  style={styles.image}
                  tintColor={focused ? appColor.RED : appColor.GRAY}
                /> */}
                {/* <Images.IMAGE_CALENDAE_SVG fill = {focused ? appColor.RED : appColor.ICON_COLOR }/> */}
              </View>
              <Text
                style={focused ? styles.focuseTabLabel : styles.tabBarLabel}
              >
                Timesheet
              </Text>
            </View>
          ),
        }}
        listeners={({ navigation, route }) => ({
          // Onpress Update....
          tabPress: (e) => {
            Animated.spring(tabOffsetValue, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
          },
        })}
      />
    </Tab.Navigator>
  );
}
