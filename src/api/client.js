import { Config } from "@/config";
import { appConstant } from "@/constant";
import { navigateAndSimpleReset } from "@/navigators/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

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
        AsyncStorage.removeItem("persist:root");
        navigateAndSimpleReset(appConstant.LOGIN, 0);
      }
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      if (isLocalStorageAvailable()) {
        AsyncStorage.removeItem("persist:root");
        navigate(appConstant.LOGIN);
      }
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
