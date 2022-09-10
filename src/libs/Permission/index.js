import { checkMultiple, PERMISSIONS, RESULTS } from "react-native-permissions";
import { PermissionsAndroid, Platform } from "react-native";
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
const PERMISSIONS_IOS = [
  PERMISSIONS.IOS.CAMERA,
  PERMISSIONS.IOS.LOCATION_ALWAYS,
  PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
];

export const requestPermission = async (setPermission, callback) => {
  try {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.requestMultiple(
        PERMISSIONS_ANDROID
      );
      console.log("Permissions granted", granted);
      if (
        checkMultiplePermissions({
          permissions: PERMISSIONS_ANDROID,
          statuses: granted,
        })
      ) {
        setPermission(true);
        console.log("You can use all the permission");
        callback();
      } else {
        setPermission(false);
        console.log("Access denied permission denied");
      }
    }
  } catch (err) {
    setPermission(false);

    console.warn(err);
  }
};

export async function checkMultiplePermissions({ permissions, statuses }) {
  let isPermissionGranted = false;
  for (var index in permissions) {
    if (statuses[permissions[index]] === PermissionsAndroid.RESULTS.GRANTED) {
      isPermissionGranted = true;
    } else {
      isPermissionGranted = false;
      //   alert(permissions[index]);
      break;
    }
  }
  return isPermissionGranted;
}

// export async function checkMultiplePermissions({ permissions, statuses }) {
//   let isPermissionGranted = false;
//   for (var index in permissions) {
//     console.log('statuses[permissions[index]]',statuses[permissions[index]]);
//     if (statuses[permissions[index]] === RESULTS.GRANTED) {
//       isPermissionGranted = true;
//     } else {
//       isPermissionGranted = false;
//       break;
//     }
//   }
//   return isPermissionGranted;
// }
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
    // checkMultiple(PERMISSIONS_IOS).then((statuses) => {
    //   if (
    //     checkMultiplePermissions({
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
