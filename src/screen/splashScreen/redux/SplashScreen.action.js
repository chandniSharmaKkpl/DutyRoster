import { actionConstant } from "@/constant";

export const checkToUserLogin = (params) => {
  return ({
    type: actionConstant.ACTION_CHECK_USER_LOGIN_REQUEST,
    payload: params,
  });
};
