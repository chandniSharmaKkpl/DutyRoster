import { Platform } from "react-native";
import * as API from "@/api/auth";

export const loginCall = async (params) => {
  try {
    const res = await API.login(params);
    return res.data;
  } catch (error) {
    throw error;
  }
};
