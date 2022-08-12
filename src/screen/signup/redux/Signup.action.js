import { actionConstant } from "@/constant";

export const requestToSignup = (params) => {
  console.log(params , 'params');
  return ({
    type: actionConstant.ACTION_GET_SIGN_UP_REQUEST,
    payload: params
  });
};