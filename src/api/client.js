import { Config } from "@/config";
import { alertMsgConstant, appConstant } from "@/constant";
import localDb from "@/database/localDb";
import { navigate, navigateAndSimpleReset, navigationRef } from "@/navigators/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackActions } from "@react-navigation/native";
import axios from "axios";
import { Alert } from "react-native";

// client.js api
const baseURL = Config.API_URL;
export { baseURL };
const client = axios.create({
  baseURL,
});

client.interceptors.response.use(
  (response) => {
    if (response.data && !response.data.success) {
      // console.log("client.interceptors.response", response.data);
      const res = response.data;
      if (res.error.login_fail) {
        alert("Please Logout and Login again!");
        // Alert.alert(
        //   alertMsgConstant.ALERT,
        //   alertMsgConstant.PLEASE_LOGIN_AGAIN,
        //   [
        //     {
        //       text: alertMsgConstant.CANCEL,
        //       onPress: () => console.log("Cancel Pressed"),
        //       style: "cancel",
        //     },
        //     {
        //       text: alertMsgConstant.OK,
        //       onPress: () => {
        //         localDb.clearAll();
        //         navigate(appConstant.LOGIN,'')
        //         // navigationRef.dispatch(StackActions.replace(appConstant.LOGIN));
        //       },
        //     },
        //   ]
        // );
        // localDb.clearAll();
        // navigationRef.dispatch(StackActions.replace(appConstant.LOGIN));
      }
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // if (isLocalStorageAvailable()) {
      // localDb.clearAll();
      // navigationRef.dispatch(StackActions.replace(appConstant.LOGIN));
      // }/
    }

    error.message = error.response
      ? error.response.data
      : error.request
      ? error.message
      : "Something went wrong. Try again.";
    return Promise.reject(error);
  }
);

export default client;
