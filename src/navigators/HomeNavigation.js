import React from "react";
import {
  Animated,
  BackHandler,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { appColor, appConstant, fontConstant, imageConstant } from "@/constant";
import { useRef } from "react";
import { Images } from "@/constant/svgImgConst";
import RosterScreen from "@/screen/roster";
import TimeSheetScreen from "@/screen/timeSheet";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "../responsiveScreen";
import QRCodeScreen from "@/screen/qrCode";
import { navigationRef } from "@/Navigation/RootNavigation";
import EditProfile from "@/screen/editProfile";
import Availability from "@/screen/availability";
import ProfileSetting from "@/screen/profileSettings";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Tab.navigationOptions = ({ navigation }) => {
//   let tabBarVisible = true;

//   let routeName = navigation.state.routes[navigation.state.index].routeName;

//   if (routeName == appConstant.EDIT_PROFILE) {
//     tabBarVisible = false;
//   }

//   return {
//     tabBarVisible,
//   };
// };

export default function HomeNavigation(props) {
  const tabOffsetValue = useRef(new Animated.Value(0)).current;

  const styles = StyleSheet.create({
    tabBar: {
      height: Platform.OS === "android" ? 80 : 60,
      // backgroundColor: "pink",
      // padding: 20,
      shadowColor: appColor.BOX_SHADOW,
    },
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
      paddingTop: hp("1%"),
    },
    redCircle: {
      width: 72,
      height: 72,
      opacity: 1,
      backgroundColor: appColor.RED,
      alignItems: "center",
      position: "absolute",
      bottom: Platform.OS === "android" ? 40 : hp("2.5%"),
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

  function RosterStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name={appConstant.ROASTER} component={RosterScreen} />
        {/* <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Settings" component={Settings} /> */}

        <Stack.Screen
          name={appConstant.PROFILE_SETTINGS}
          component={ProfileSetting}
        />
        <Stack.Screen name={appConstant.EDIT_PROFILE} component={EditProfile} />
        <Stack.Screen
          name={appConstant.AVAILABILITY}
          component={Availability}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarStyle: styles.tabBar }}
      initialRouteName={appConstant.ROASTER}
      tabBarOptions={{
        showLabel: false,
      }}
    >
      <Tab.Screen
        name={appConstant.ROASTER}
        component={RosterScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tab}>
              <View style={styles.viewImage}>
                <Images.IMAGE_HOME_SVG
                  fill={focused ? appColor.RED : appColor.ICON_COLOR}
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
        name={appConstant.QR_CODE}
        component={QRCodeScreen}
        headerShown={false}
        options={{
          tabBarStyle: { display: "none" },
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
        name={appConstant.TIMESHEETS}
        component={TimeSheetScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tab}>
              <View style={styles.viewImage}>
                <Images.IMAGE_CALENDAE_SVG
                  fill={focused ? appColor.RED : appColor.ICON_COLOR}
                />
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
