import client from "@/api/client";
import { apiConstant } from "@/constant";
import localDb from "@/database/localDb";

var config = {
  headers: {},
};
localDb.getAccessToken().then(async (token) => {
  config = {
    headers: {
      Authorization: "Bearer " + token,
      Accept:"application/json"
    },
  };
});

export const user = (params) => client.post(apiConstant.VIEW_PROFILE, params, config);

export const updateProfile = (params) => {

  var requestOptions = {
    method: "POST",
    headers: config.headers,
    body: params,
   // redirect: "follow",
    
  };

  return fetch(apiConstant.BASE_URL+apiConstant.EDIT_PROFILE, requestOptions)
    .then((response) => response.text())
    .then((result) =>{ return JSON.parse(result)})
    .catch((error) => console.log("error", error));

};
