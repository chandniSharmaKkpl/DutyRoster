import { actionConstant } from "@/constant";
import localDb from "@/database/localDb";

export const requestToGetAccessToken = (params) => ({
  type: actionConstant.ACTION_GET_ACCESS_TOKEN_REQUEST,
  payload: params,
});

export const userLogoutAction = () => {
  localDb.clearAll();
  return {
    type: actionConstant.ACTION_USER_LOGOUT,
  };
};
