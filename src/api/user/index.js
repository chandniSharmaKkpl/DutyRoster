import client from "@/api/client";
import { apiConstant } from "@/constant";
import localDb from "@/database/localDb";
import axios from "axios";

let config = {
  headers: {},
};
const token = localDb.getAccessToken().then(async (token) => {
  config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  return token;
});
console.log(token, "ssss");

export const user = (params) =>
  client.post(apiConstant.VIEW_PROFILE, params, config);

export const updateProfile = async (params) => {
  console.log("FormData", params)
  config["Content-Type"] = "multipart/form-data";
  return await client(
    {
      method: "post",
      url: apiConstant.EDIT_PROFILE,
      data: params,
      headers: config.headers
    }
  )
//  return await client.post(apiConstant.EDIT_PROFILE, params, config);
};
