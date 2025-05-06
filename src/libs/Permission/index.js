import {
  check,
  checkMultiple,
  PERMISSIONS,
  RESULTS,
} from "react-native-permissions";
import { PermissionsAndroid, Platform } from "react-native";
import { PermissionAlertModel } from "./alertModel";
import { alertMsgConstant } from "@/constant";
const PERMISSIONS_ANDROID = [
  PermissionsAndroid.PERMISSIONS.CAMERA,
  PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
];
// const PERMISSIONS_ANDROID = [
//   PERMISSIONS.ANDROID.CAMERA,
//   PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
//   PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
// ];
const permissionAlertAndroid = (permission) => {
  if (permission === PermissionsAndroid.PERMISSIONS.CAMERA) {
    PermissionAlertModel(alertMsgConstant.CAMERA_PERMISSION_ALERT);
  } else if (
    permission === PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
  ) {
    PermissionAlertModel(alertMsgConstant.LOCATION_PERMISSION_ALERT);
  } else if (
    permission === PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  ) {
    PermissionAlertModel(alertMsgConstant.LOCATION_PERMISSION_ALERT);
  }
};
const permissionAlertIOS = (permission) => {
  // console.log("permission", permission);
  if (permission === PERMISSIONS.IOS.CAMERA) {
    PermissionAlertModel(alertMsgConstant.CAMERA_PERMISSION_ALERT);
  } else if (permission === PERMISSIONS.IOS.LOCATION_ALWAYS) {
    PermissionAlertModel(alertMsgConstant.LOCATION_PERMISSION_ALERT);
  } else if (permission === PERMISSIONS.IOS.LOCATION_WHEN_IN_USE) {
    PermissionAlertModel(alertMsgConstant.LOCATION_PERMISSION_ALERT);
  }
};
const PERMISSIONS_IOS_CAMERA = [PERMISSIONS.IOS.CAMERA];
const PERMISSIONS_IOS_LOCATION = [
  PERMISSIONS.IOS.LOCATION_ALWAYS,
  PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
];
export const requestPermission = async (setPermission, callback) => {
  try {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.requestMultiple(
        PERMISSIONS_ANDROID
      );
      // console.log("Permissions granted", granted);
      if (
        checkMultiplePermissions({
          permissions: PERMISSIONS_ANDROID,
          statuses: granted,
        })
      ) {
        setPermission(true);
        // console.log("You can use all the permission in android");
        callback();
      } else {
        setPermission(false);
        // alert("Please Allow Permission");
        // console.log("Access denied permission denied in android");
      }
    } else {
      checkMultiple(PERMISSIONS_IOS_LOCATION).then((statuses) => {
        // console.log(
        //   "statuses",
        //   Object.values(statuses).some((_el) => _el === RESULTS.GRANTED)
        // );
        if (Object.values(statuses).some((_el) => _el === RESULTS.GRANTED)) {
          setPermission(true);
          // console.log("You can use all the permission in ios");
          callback();
        } else {
          PermissionAlertModel(alertMsgConstant.LOCATION_PERMISSION_ALERT);
        }
      });
      // check(PERMISSIONS.IOS.LOCATION_ALWAYS)
      //   .then((result) => {
      //     switch (result) {
      //       case RESULTS.UNAVAILABLE:
      //         console.log(
      //           "This feature is not available (on this device / in this context)"
      //         );
      //         break;
      //       case RESULTS.DENIED:
      //         console.log(
      //           "The permission has not been requested / is denied but requestable"
      //         );
      //         break;
      //       case RESULTS.LIMITED:
      //         console.log(
      //           "The permission is limited: some actions are possible"
      //         );
      //         break;
      //       case RESULTS.GRANTED:
      //         console.log("The permission is granted");
      //         break;
      //       case RESULTS.BLOCKED:
      //         console.log(
      //           "The permission is denied and not requestable anymore"
      //         );
      //         break;
      //     }
      //   })
      //   .catch((error) => {
      //     // …
      //     console.log("error", error);
      //   });
    }
  } catch (err) {
    setPermission(false);

    console.warn(err);
  }
};

export function checkMultiplePermissions({ permissions, statuses }) {
  let isPermissionGranted = false;
  for (var index in permissions) {
    if (statuses[permissions[index]] === PermissionsAndroid.RESULTS.GRANTED) {
      isPermissionGranted = true;
    } else {
      permissionAlertAndroid(permissions[index]);
      // console.log("permissions[index]", permissions[index]);
      isPermissionGranted = false;
      break;
    }
  }
  return isPermissionGranted;
}

export function checkMultiplePermissionsIOS({ permissions, statuses }) {
  let isPermissionGranted = false;
  for (var index in permissions) {
    // console.log([permissions[index]], statuses[permissions[index]]);
    if (statuses[permissions[index]] === RESULTS.GRANTED) {
      isPermissionGranted = true;
    } else {
      permissionAlertIOS(permissions[index]);
      isPermissionGranted = false;
      break;
    }
  }
  return isPermissionGranted;
}
export const checkMultiplePermision = (setPermission, callback) => {
  if (Platform.OS === "android") {
    checkMultiple(PERMISSIONS_ANDROID)
      .then((statuses) => {
        if (
          checkMultiplePermissions({
            permissions: PERMISSIONS_ANDROID,
            statuses: statuses,
          })
        ) {
          setPermission(true);
          console.log("You can use all the permission in android");
          callback();
        } else {
          setPermission(false);
          console.log("Access denied permission denied in android");
        }
      })
      .catch((err) => {});
  } else {
    // check(PERMISSIONS.IOS.LOCATION_ALWAYS)
    check(PERMISSIONS.IOS.LOCATION_ALWAYS)
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              "This feature is not available (on this device / in this context)"
            );
            break;
          case RESULTS.DENIED:
            console.log(
              "The permission has not been requested / is denied but requestable"
            );
            break;
          case RESULTS.LIMITED:
            console.log("The permission is limited: some actions are possible");
            break;
          case RESULTS.GRANTED:
            console.log("The permission is granted");
            break;
          case RESULTS.BLOCKED:
            console.log("The permission is denied and not requestable anymore");
            break;
        }
      })
      .catch((error) => {
        // …
      });
    // checkMultiple(PERMISSIONS_IOS).then((statuses) => {
    //   if (
    //     checkMultiplePermissionsIOS({
    //       permissions: PERMISSIONS_IOS,
    //       statuses: statuses,
    //     })
    //   ) {
    //     setPermission(true);
    //     console.log("You can use all the permission in ios");
    //     callback();
    //   } else {
    //     setPermission(false);
    //     console.log("Access denied permission denied in ios");
    //   }
    // });
  }
};
