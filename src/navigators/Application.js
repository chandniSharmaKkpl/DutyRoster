import React from "react";
import { SafeAreaView, StatusBar, useColorScheme } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useTheme,
} from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { navigationRef } from "./utils";
import { appColor, appConstant } from "../constant";
// import CustomDrawer from './CustomDrawer'
import Login from "../screen/login";
import Roster from "../screen/roster";
import Signup from "../screen/signup";
import ForgotPassword from "../screen/forgotPassword";
import ResetPassword from "@/screen/resetPassword";
import HomeNavigation from "./HomeNavigation";
import EditProfile from "@/screen/editProfile";
import Availability from "@/screen/availability";
import ProfileSetting from "@/screen/profileSettings";
import Calendars from "@/components/Calendars";

export const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const MyTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
  },
};
// @refresh reset
const ApplicationNavigator = (props) => {
  // const { Layout, darkMode, NavigationTheme } = useTheme()
  // const { colors } = NavigationTheme
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer ref={navigationRef} theme={MyTheme}>
        <StatusBar backgroundColor={appColor.RED} />
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={appConstant.LOGIN}
        >
          <Stack.Screen name={appConstant.HOME} component={HomeNavigation} />
          <Stack.Screen name={appConstant.LOGIN} component={Login} />
          <Stack.Screen name={appConstant.SIGNUP} component={Signup} />
          <Stack.Screen
            name={appConstant.FORGOT_PWD}
            component={ForgotPassword}
          />
          <Stack.Screen
            name={appConstant.RESER_PWD}
            component={ResetPassword}
          />
         

          <Stack.Screen name={appConstant.CALENDAR} component={Calendars} />
         
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default ApplicationNavigator;
