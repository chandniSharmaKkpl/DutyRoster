import { Platform } from "react-native";
import * as API from "@/api/auth";

export const resetPasswordCall = async (params) => {
  let arg = {"email": params.email, "code": params.refCode, "password":params.newPassword, "password_confirmation": params.confirmPassword}
  console.log(" reset paramas are 0--- ", params);
  try {
    const res = await API.resetPassword(arg);
    console.log(res);
    return res;
  } catch (error) {
    alert(error);
    console.log("resetPassword ==>",error);
    throw error;
  }
};
