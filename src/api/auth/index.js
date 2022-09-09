import client from "@/api/client";
import { apiConstant } from "@/constant";

const config = {
  header: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
    mimeType: "multipart/form-data",
  },
};

const config1 = {
  header: {
    "Content-Type": "application/json"
  }
};



export const login = (params) => client.post(apiConstant.LOGIN, params, config);
// export const singup = (params) => client.post(apiConstant.SIGNUP, params, config);
export const forgotPassword = (params) =>
  client.post(apiConstant.FORGOT_PWD, params, config);
export const resetPassword = (params) =>
  client.post(apiConstant.RESET_PWD, params, config);
export const addTimeSheet = (params) =>
  client.post(apiConstant.ADD_TIMESHEET, params, config);
export const roasterDateRange = (params) => {
  return client.post(apiConstant.ROASTER_DATE_RANGE, params, config);
};
export const timesheetDateRange = (params) => {
  return client.post(apiConstant.TIMESHEET_DATE_RANGE, params, config);
};
export const getAvailbility = (params) => {
  console.log(" params ----",params);
  return client.post(apiConstant.GET_AVAILABILITY, params, config1);
};
export const saveAvailbility =(params)=> client.post(apiConstant.SAVE_AVAILABILITY, params, config);

export const getAvailbilityTemp =(params)=> {
  var requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
    body: params,
    // redirect: "follow",
  };

  return fetch(apiConstant.BASE_URL + apiConstant.GET_AVAILABILITY, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(" res", result);
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error)); }




export const singup = (params) => {
  var requestOptions = {
    method: "POST",
    headers: config.headers,
    body: params,
    // redirect: "follow",
  };

  return fetch(apiConstant.BASE_URL + apiConstant.SIGNUP, requestOptions)
    .then((response) => response.text())
    .then((result) => {
     
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
};
