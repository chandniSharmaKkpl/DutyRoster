

// // Access Token

import { actionConstant } from "@/constant";

export const requestToGetTimeSheetDateRange = (params) => ({
    type : actionConstant.ACTION_GET_TIMESHEET_DATE_REQUEST,
    payload: params,
})

export const setMarkeDates = (params) => ({
    type : actionConstant.ACTION_SET_MARKED_DATES,
    payload : params
})