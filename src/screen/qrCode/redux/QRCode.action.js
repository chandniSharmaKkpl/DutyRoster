import { actionConstant } from "@/constant";

export const requestToGetQRCodeResponse = (params) => ({
    type: actionConstant.ACTION_GET_QR_CODE_REQUEST,
    payload: params,
  }); 