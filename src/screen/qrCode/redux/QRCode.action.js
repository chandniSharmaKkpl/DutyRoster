import { actionConstant } from "@/constant";

export const requestToGetQRCodeResponse = (params) => ({

  type: actionConstant.ACTION_GET_QR_CODE_REQUEST,
  payload: params,
});
export const setQRLocation = (params) => ({
  type: actionConstant.ACTION_QR_CODE_SET_LOCATION,
  payload: params,
});
