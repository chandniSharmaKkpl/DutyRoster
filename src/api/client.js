import { Config } from "@/config";
import { appConstant } from "@/constant";
import { navigate } from "@/Navigation/RootNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// client.js api
const baseURL = Config.API_URL;
export { baseURL };
const client = axios.create({
  baseURL,
});

client.interceptors.response.use(undefined, (error) => {
  if (error.response?.status === 401) {
    // if (isLocalStorageAvailable()) {
    //   AsyncStorage.removeItem("persist:root");
    //   navigate(appConstant.LOGIN);
    // }
  }

  error.message = error.response
    ? error.response.data.message
    : error.request
    ? error.message
    : "Something went wrong. Try again.";
  return Promise.reject(error);
});

export default client;
