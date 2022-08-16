import { actionConstant } from "@/constant";


export const requestToViewProfile = (params) => {
  return ({
    type: actionConstant.ACTION_GET_PROFILE_REQUEST,
    payload: params
  });
};


