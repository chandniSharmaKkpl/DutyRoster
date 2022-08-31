import client from "@/api/client";
import { Config } from "@/config";
import { apiConstant } from "@/constant";

import localDb from "@/database/localDb";
import axios from "axios";
import { forEach } from "lodash";

var config = {
  headers: {},
};

export const user = (params) =>
  client.post(apiConstant.VIEW_PROFILE, params, config);

// export const updateProfile = (params) => {
// config.headers["Content-Type"] = "multipart/form-data";
//   // delete params.token;

//   axios({
//     url: Config.API_URL + apiConstant.EDIT_PROFILE,
//     method: "POST",
//     data: params,
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "multipart/form-data",
//       Authorization: `Bearer ${params.token}`,
//     },
//   })
//     .then(function (response) {
//       console.log("response :", JSON.stringify(response, null, 4));
//     })
//     .catch(function (error) {
//       console.log("error from image :");
//     });
//   // return client.post(apiConstant.EDIT_PROFILE,data=params,config);
// };

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
    myHeaders.append(
      "Authorization",
      `Bearer ${token}`
    );

    var formdata = new FormData();
    Object.keys(params).map((key)=>{

      formdata.append(key,params[key]);
    })
    // formdata.append("title", '"test1"');
    // formdata.append("name", '"test"');
    // formdata.append("dob", "2022-07-13");
    // formdata.append("email", "emp_8_25@yopmail.com");
    // formdata.append("phone", "111111111111");
    // formdata.append("address", "test");
    // formdata.append("tfn_number", "123456");
    // formdata.append("employee_id", "85");
    // formdata.append("password", "password");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      apiConstant.BASE_URL + apiConstant.EDIT_PROFILE,
      requestOptions
    )
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
