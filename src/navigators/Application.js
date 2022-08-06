import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useTheme } from '@/hooks'
import { navigationRef } from './utils'
import { appColor, appConstant } from '../constant'
// import CustomDrawer from './CustomDrawer'
import Login from '../screen/login';
import Roster from '../screen/roster';
import Signup from '../screen/signup'; 
import ForgotPassword from '../screen/forgotPassword'
import ResetPassword from '@/screen/resetPassword'
import HomeNavigation from './TabbarNavigation'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()
// @refresh reset
const ApplicationNavigator = () => {
  // const { Layout, darkMode, NavigationTheme } = useTheme()
  // const { colors } = NavigationTheme

  return (
    <SafeAreaView style={{flex : 1}}>
      <NavigationContainer ref={navigationRef} >
        <StatusBar />
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={appConstant.LOGIN}
        >
          <Stack.Screen name={appConstant.START} component={HomeNavigation} />
          <Stack.Screen name={appConstant.LOGIN} component={Login} />
          <Stack.Screen name={appConstant.SIGNUP} component={Signup} />
          <Stack.Screen name={appConstant.FORGOT_PWD} component={ForgotPassword} />
          <Stack.Screen name={appConstant.RESER_PWD} component={ResetPassword} />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}
export default ApplicationNavigator
