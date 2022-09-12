import { actionConstant } from "@/constant";

export const requestToViewProfile = (params) => {
  return {
    type: actionConstant.ACTION_GET_PROFILE_REQUEST,
    payload: params,
  };
};

export const requestToUpdateProfile = (params) => {
  return {
    type: actionConstant.ACTION_UPDATE_PROFILE_REQUEST,
    payload: params,
  };
};

export const requestUpdateProfileHeader = (params) => {
  console.log("requestUpdateProfileHeader",params);
  return {
    type: actionConstant.ACTION_SET_USER_PROFILE_HEADER,
    payload: params,
  };
};
