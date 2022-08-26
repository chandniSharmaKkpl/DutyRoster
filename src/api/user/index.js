import client from "@/api/client";
import { apiConstant } from "@/constant";
import localDb from "@/database/localDb";
import axios from "axios";

var config = {
  headers: {},
};
localDb.getAccessToken().then(async (token) => {
  config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
});

// export const user = (params) =>
//   client.post(apiConstant.VIEW_PROFILE, params, config);

// export const updateProfile = (params) => {
//   config.headers["Content-Type"] = "multipart/form-data";
//   var data = new FormData();
//   data.append("title", "test1");
//   data.append("name", "test");
//   data.append("dob", "2022-07-13");
//   data.append("email", "emp579@yopmail.com");
//   data.append("phone", "9856895639");
//   data.append("address", "test");
//   data.append("tfn_number", "123456");
//   data.append("employee_id", "79");
//   data.append("password", "test");
//   // console.log("header", config.headers);
//   console.log("req \n Header", config.headers);
//   console.log("Data", data);
//   localDb.getAccessToken().then(async (token) => {
//     config = {
//       method: 'post',
//       url: 'https://2exceltest.com.au:8443/dodee/api/edit-profile',
//       headers: {
//         Authorization: "Bearer " + token,
//       },
//       data : data
//     };
//   });
//   return client(config);
// };
