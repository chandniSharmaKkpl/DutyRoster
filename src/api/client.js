import { Config } from "@/config";
import { alertMsgConstant, appConstant } from "@/constant";
import localDb from "@/database/localDb";
import {
  navigate,
  navigateAndSimpleReset,
  navigationRef,
} from "@/navigators/utils";
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
        // console.log('res.header',res.header);
        console.error("login_fail");
        localDb.clearAll();
        navigationRef.dispatch(StackActions.replace(appConstant.LOGIN));
      }
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localDb.clearAll();
      navigationRef.dispatch(StackActions.replace(appConstant.LOGIN));
    } else if (error.toJSON().message === "Network Error") {
      alert("no internet connection");
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
