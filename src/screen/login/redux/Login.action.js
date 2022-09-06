import { actionConstant, apiConstant, appConstant } from "@/constant";
import localDb from "@/database/localDb";
import { navigationRef } from "@/navigators/utils";

import { StackActions } from "@react-navigation/native";

export const requestToGetAccessToken = (params) => ({
  type: actionConstant.ACTION_GET_ACCESS_TOKEN_REQUEST,
  payload: params,
});

export const userLogoutAction = () => {
  try {
    localDb.clearAll();
    navigationRef.dispatch(StackActions.replace(appConstant.LOGIN));
  } catch (error) {
    console.log("ERROR LOGOUT", error);
  }
  return {
    type: actionConstant.ACTION_USER_LOGOUT,
  };
};
