import { actionConstant } from "@/constant";

export const requestToResetPassword = (params) => ({ 
    type : actionConstant.ACTION_RESET_PASSWORD_REQUEST,
    payload : params
})
