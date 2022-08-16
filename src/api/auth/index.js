import client from "@/api/client";
import { apiConstant } from "@/constant";

const config = {
  headers: {},
};
export const login = (params) => client.post(apiConstant.LOGIN, params, config);
export const singup = (params) => client.post(apiConstant.SIGNUP, params, config);
export const forgotPassword = (params) => client.post(apiConstant.FORGOT_PWD, params, config);
export const resetPassword = (params) => client.post(apiConstant.RESET_PWD, params, config);