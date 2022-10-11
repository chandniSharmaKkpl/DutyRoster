import { Platform } from "react-native";
import * as API from "@/api/auth";

export const loginCall = async (params) => {
  try {
    const res = await API.login(params);
    // console.log("Login Success ===>", JSON.stringify(res, null, 4));
    return res?.data;
  } catch (error) {
    console.log("Login Error ===>", JSON.stringify(error, null, 4));

    throw error;
  }
};
