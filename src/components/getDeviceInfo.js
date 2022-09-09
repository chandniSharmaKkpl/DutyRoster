import DeviceInfo from "react-native-device-info";

  DeviceInfo.getDeviceToken().then((deviceToken) => {
    return deviceToken;
  });

//   let type = DeviceInfo.getDeviceType();
//   setDevice_type(type);

  DeviceInfo.syncUniqueId().then((uniqueId) => {
    return uniqueId;
  });

  DeviceInfo.getDeviceName().then((deviceName) => {
    return deviceName;
  });

//   let version = DeviceInfo.getVersion();
//   setApp_version(version);