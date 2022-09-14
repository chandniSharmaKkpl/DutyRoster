// // Access Token

import _ from "lodash";
import { actionConstant } from "@/constant";
export const requestToGetRoasterDateRange = (params) => ({
  type: actionConstant.ACTION_GET_ROASTER_DATE_REQUEST,
  payload: params,
});

export const setMarkeDates = (params) => ({
  type: actionConstant.ACTION_SET_MARKED_DATES,
  payload: params,
});

export const setSelectedDateAction = (params) => ({
  type: actionConstant.ACTION_SET_SELECTED_DATES,
  payload: params,
});

export const removeSelectedDateAction = (params) => ({
  type: actionConstant.ACTION_REMOVE_SELECTED_DATES,
  payload: params,
});

export const setCityAndTimeArray = (params) => ({
  type: actionConstant.ACTION_ADD_REMOVE_CITY_AND_TIME,
  payload: params,
});

export const requestToGetAvailability = (params) => ({
  type: actionConstant.ACTION_GET_AVAILABILITY_REQUEST,
  payload: params,
});

export const requestToSaveAvailability = (params) => ({
  type: actionConstant.ACTION_SAVE_AVAILABILITY_REQUEST,
  payload: params,
});

export const setSelectedDistricts = (params) => ({
  type: actionConstant.ACTION_SET_SELECTED_DISTRICTS,
  payload: params,
});

export const setArraySelectedDate = (params) => ({
  type: actionConstant.ACTION_SET_SELECTED_DISTRICTS,
  payload: params,
});

export const addNewAvailability = () => {
  const params = {
    district_id: null,
    inTime: null,
    outTime: null,
    id: _.uniqueId("avail_"),
  };
  return {
    type: actionConstant.ACTION_ADD_NEW_AVAILABILITY,
    payload: params,
  };
};

export const removeAvailability = (params) => ({
  type: actionConstant.ACTION_REMOVE_AVAILABILITY,
  payload: params,
});

export const setDataItemOfAvailability = ({ type, data, id }) => {
  const params = {
    type,
    data,
    id,
  };
  return {
    type: actionConstant.ACTION_SET_DATA_ITEM_AVAILABILITY,
    payload: params,
  };
};

export const resetAvailabilityData = () => {
  return {
    type : actionConstant.ACTION_RESET_AVAILABILITY_DATA,
  }

}

export const requestToAddAvailability = () => {
  return {
    type : actionConstant.ACTION_ON_ADD_AVAILABILITY_DATA_REQUEST,
  }
}
