import React from "react";
import { Alert, Platform } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { alertMsgConstant } from "@/constant";

export const CheckConnectivity = () => {
  // For Android devices
  if (Platform.OS === "android") {
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        console.log("state.isConnected ==>", state.isConnected);
        return true;
      } else {
        toast.show(alertMsgConstant.NO_INTERNET, {
          type: alertMsgConstant.TOAST_DANGER,
        });
        // return false;
      }
    });
  } else {
    // For iOS devices
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this.handleFirstConnectivityChange
    );
  }
};

export const unsubscribe = NetInfo.addEventListener((state) => {
  //   console.log("Connection type", state.type);
  //   console.log("Is connected?", state.isConnected);
});
