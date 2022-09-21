import React, { useState } from "react";
import { appConstant, imageConstant } from "@/constant";
import { StackActions, useFocusEffect } from "@react-navigation/native";
import { View, Image, Platform } from "react-native";
import { checkToUserLogin } from "./redux/SplashScreen.action";
import { connect } from "react-redux";
import DeviceInfo from "react-native-device-info";
import { navigationRef } from "@/navigators/utils";

function SplashScreen(props) {
  const { checkToUserLoginAction, accessToken } = props;

  console.log("accessToken", accessToken);

  const [DeviceToken, setDeviceToken] = useState();
  const [DeviceUuid, setDeviceUuid] = useState();
  const [DeviceName, setDeviceName] = useState();
  const [AppVersion, setAppVersion] = useState();

  useFocusEffect(
    React.useCallback(() => {
      if (!accessToken) {
        try {
          const resetAction = StackActions.replace(appConstant.LOGIN);
          navigationRef.dispatch(resetAction);
          return;
        } catch (error) {
          console.log("error", error);
        }
      }
      DeviceInfo.getDeviceToken().then((deviceToken) => {
        setDeviceToken(deviceToken);
      });

      DeviceInfo.getDeviceName().then((device_name) => {
        setDeviceName(device_name);
      });

      DeviceInfo.syncUniqueId().then((uniqueId) => {
        setDeviceUuid(uniqueId);
      });

      let version = DeviceInfo.getVersion();
      setAppVersion(version);
    }, [DeviceInfo])
  );

  checkToUserLoginAction({
    device_token: 1234,
    device_uuid: DeviceUuid,
    device_type: Platform.OS === "android" ? 1 : 2,
    device_name: DeviceName,
    app_version: AppVersion,
    os_version: Platform.Version,
  });

  // React.useEffect(() => {
  //   checkToUserLoginAction({
  //     device_token: 1234,
  //     device_uuid: DeviceUuid,
  //     device_type: Platform.OS === "android" ? 1 : 2,
  //     device_name: DeviceName,
  //     app_version: AppVersion,
  //     os_version: Platform.Version,
  //   });
  
  // }, []);

  return (
    <View>
      <Image
        source={imageConstant.IMAGE_SPLASH_SCREEN}
        style={{ height: "100%", width: "100%" }}
      />
    </View>
  );
}

const mapStateToProps = (state) => ({
  accessToken: state.LoginReducer.accessToken,
});

const mapDispatchToProps = (dispatch) => {
  return {
    checkToUserLoginAction: (params) => dispatch(checkToUserLogin(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
