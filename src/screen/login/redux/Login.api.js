import { Platform } from "react-native";
import * as API from "@/api/auth";

export const loginCall = async (params) => {
  try {
    const res = await API.login(params);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
