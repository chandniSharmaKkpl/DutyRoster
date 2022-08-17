import { Platform } from "react-native";
import * as API from "@/api/auth";

export const QRCodeCall = async (params) => {
  try {
    const res = await API.addTimeSheet(params);
    console.log("addTimeSheet ==>", res);
    return res.data;
  } catch (error) {
    throw error;
  }
};
