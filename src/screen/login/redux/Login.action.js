import { actionConstant } from "@/constant";

export const requestToGetAccessToken = (params) => ({
    type: actionConstant.ACTION_GET_ACCESS_TOKEN_REQUEST,
    payload: params,
  });