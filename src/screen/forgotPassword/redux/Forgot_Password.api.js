import * as API from "@/api/auth";

export const forgotPasswordCall = async (params) => {
  let arg = {"email": params.email}
  try {
    const res = await API.forgotPassword(arg);
    console.log( "argument -------->",arg, params);
    return res.data;
  } catch (error) {
     console.log(" error is --->", error);
    throw error;
  }
};