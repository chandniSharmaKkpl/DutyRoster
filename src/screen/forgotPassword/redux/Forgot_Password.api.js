import { Platform } from "react-native";
import * as API from "@/api/auth";

export const forgotPasswordCall = async (params) => {
  let arg = {"email": params}
  try {
    const res = await API.forgotPassword(arg);
    console.log(res);
    return res;
  } catch (error) {
    throw error;
  }
};