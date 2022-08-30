import client from "@/api/client";
import { apiConstant } from "@/constant";


const config = {
  header: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
    mimeType: "multipart/form-data",
  }
};

export const login = (params) => client.post(apiConstant.LOGIN, params, config);
export const singup = (params) => client.post(apiConstant.SIGNUP, params, config);
export const forgotPassword = (params) => client.post(apiConstant.FORGOT_PWD, params, config);
export const resetPassword = (params) => client.post(apiConstant.RESET_PWD, params, config);
export const addTimeSheet = (params) => client.post(apiConstant.ADD_TIMESHEET,params, config);
export const roasterDateRange = (params) => client.post(apiConstant.ROASTER_DATE_RANGE, params, config);