import { actionConstant } from "@/constant";

export const requestToForgotPassword = (params) => ({
    type : actionConstant.ACTION_FORGOT_PASSWORD_REQUEST,
    payload : params
})