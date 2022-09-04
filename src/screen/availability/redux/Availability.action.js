

// // Access Token

import { actionConstant } from "@/constant";

export const requestToGetRoasterDateRange = (params) => ({
    type : actionConstant.ACTION_GET_ROASTER_DATE_REQUEST,
    payload: params,
})

export const setMarkeDates = (params) => ({
    type : actionConstant.ACTION_SET_MARKED_DATES,
    payload : params
})

export const setSelectedDateAction = (params) => ({
    type : actionConstant.ACTION_SET_SELECTED_DATES,
    payload : params
})

export const removeSelectedDateAction = (params) => ({
    type : actionConstant.ACTION_REMOVE_SELECTED_DATES,
    payload : params
})

export const setCityAndTimeArray = (params) => ({
    type : actionConstant.ACTION_ADD_REMOVE_CITY_AND_TIME,
    payload : params
})

export const requestToGetAvailability = (params) => ({
    type : actionConstant.ACTION_GET_AVAILABILITY_REQUEST,
    payload : params
})

export const requestToSaveAvailability = (params) => ({
    type : actionConstant.ACTION_SAVE_AVAILABILITY_REQUEST,
    payload : params
})

export const setSelectedDistricts =(params)=>({
    type : actionConstant.ACTION_SET_SELECTED_DISTRICTS,
    payload : params
})