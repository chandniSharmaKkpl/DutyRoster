import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useTheme } from "@/hooks";
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
import Unavailablity from "@/screen/unavailablity";
import ProfileSetting from "@/screen/profileSettings";

export const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
// @refresh reset
const ApplicationNavigator = () => {
  // const { Layout, darkMode, NavigationTheme } = useTheme()
  // const { colors } = NavigationTheme

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer ref={navigationRef}>
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
          <Stack.Screen
            name={appConstant.EDIT_PROFILE}
            component={EditProfile}
          />
          <Stack.Screen
            name={appConstant.UNAVAILABILITY}
            component={Unavailablity}
          />
          <Stack.Screen name={appConstant.PROFILE_SETTINGS} component={ProfileSetting} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};
export default ApplicationNavigator;
