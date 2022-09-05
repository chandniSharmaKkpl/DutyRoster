import client from "@/api/client";
import { Config } from "@/config";
import { apiConstant } from "@/constant";

var config = {
  headers: {},
};

export const user = (params) =>
  client.post(apiConstant.VIEW_PROFILE, params, config);

export const updateProfile = ({ token, ...params }) => {
  config.headers["Authorization"] = `Bearer ${token}`;
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
  return new Promise((resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var formdata = new FormData();
    Object.keys(params).map((key) => {
      formdata.append(key, params[key]);
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(apiConstant.BASE_URL + apiConstant.EDIT_PROFILE, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
        console.log("error", error);
      });
  });
};
