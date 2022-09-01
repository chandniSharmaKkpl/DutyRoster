import React, { useEffect } from 'react'
import { View, Image, StyleSheet, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ExampleContainer } from '@/Containers'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../responsiveScreen'
import { useTheme } from '@/Hooks'
import { appConstant, appColor, fontConstant } from '@/Constant'

const Tab = createBottomTabNavigator()

// @refresh reset
const MainNavigator = () => {
  const { Layout, Images } = useTheme()




  return (
    <Tab.Navigator
      name={appConstant.TAB}
      options={{ tabBarVisible: true }}
      tabBarOptions={{
        activeTintColor: appColor.WHITE,
        inactiveTintColor: appColor.NAVY_BLUE,
        showLabel: false,
        style: styles.tabBar,
      }}
      initialRouteName={appConstant.TOP_LISTS}
    >
      <Tab.Screen
        name={appConstant.TOP_LISTS}
        component={ExampleContainer}
        screenOptions={{ headerShown: false }}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <View style={styles.container}>
              <View style={styles.viewImage}>
                <Image
                  style={styles.image}
                  source={Images.home}
                  resizeMode={'contain'}
                />
              </View>
              <Text style={styles.tabBarLabel}>Top Lists</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default MainNavigator

const styles = StyleSheet.create({
  container: {
    width: wp('10%'),
    alignItems: 'center',
  },
  viewImage: {
    width: wp('6%'),
    height: hp('4.5%'),
  },
  image: {
    height: '100%',
    width: '100%',
  },
  tabBar: {
    backgroundColor: appColor.NAVY_BLUE,
  },
  tabBarLabel: {
    fontSize: fontConstant.TEXT_H3_SIZE_REGULAR,
    color: appColor.BLACK,
    textAlign: 'center',
  },
})
