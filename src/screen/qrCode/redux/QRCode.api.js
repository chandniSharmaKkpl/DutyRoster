import { Platform } from "react-native";
import * as API from "@/api/auth";

export const QRCodeCall = async (params) => {
  // console.log("QR Code :::::: ===>", params);
  try {
    const res = await API.addTimeSheet(params);
    // console.log("Response", JSON.stringify(res,null,4));
    return res.data;
  } catch (error) {
    throw error;
  }
};
