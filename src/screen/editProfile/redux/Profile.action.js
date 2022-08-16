import { actionConstant } from "@/constant";

export const requestToViewProfile = (params) => {
  return ({
    type: actionConstant.ACTION_GET_PROFILE_REQUEST,
    payload: params
  });
};

export const requestToUpdateProfile = (params) => {
  try {
    console.log(params , 'update');
    return ({
      type: actionConstant.ACTION_UPDATE_PROFILE_REQUEST,
      payload: params
    });
  }
  catch(error) {
    console.log(error);
  }
 
};