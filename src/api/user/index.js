import client from "@/api/client";
import { apiConstant } from "@/constant";
import localDb from "@/database/localDb";

let config = {
  headers:{}
}
const token = localDb.getAccessToken().then(async(token) => {
   config = {
    headers: {
      'Authorization': 'Bearer '+token,
    },
  };
  return token;
});
console.log(token ,'ssss')

export const user = (params) => client.post(apiConstant.VIEW_PROFILE, params, config);
export const updateProfile = (params) => client.post(apiConstant.EDIT_PROFILE, params, config);
