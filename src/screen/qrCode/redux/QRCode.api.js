import { Platform } from "react-native";
import * as API from "@/api/auth";

export const QRCodeCall = async (params) => {
  try {
    const res = await API.addTimeSheet(params);
    return res.data;
  } catch (error) {
    throw error;
  }
};
