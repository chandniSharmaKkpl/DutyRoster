import * as API from "@/api/user";
import axios from "axios";
import * as ApiInterceptor from "@/services/ApiInterceptor";
import { apiConstant } from "@/constant";

export const ViewProfile = async (params) => {
  try {
    const res = await API.user(params);
    console.log(":::::::::: ViewProfile ::::::::::", res);
    return res.data;
  } catch (error) {
    console.log(error, "error");
    throw error;
  }
};

export const UpdateProfile = (params) => {
  console.log("chandni params are -in api ---", params);
  
  let paramData = {
    data: params,
  };
  ApiInterceptor.post(apiConstant.EDIT_PROFILE, paramData)
    .then((response) => {
      console.log(" response ====", response);
    })
    .catch((error) => {
      console.log(" error ====", error);
    });
};

export const UpdateProfileYes = (params) => {
  // localDb.getAccessToken().then(async (token) =>
  //  {

  console.log("chandni params are ----", params);

  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiMGY4Nzk0NzQ3Nzc3YjI4MmYzODQ1MzNhMzdjZTZhZmQ4YjhmMGJiOWQ4NzI2YTZmY2MxMWU3NTRhYmQ2M2ZiYTM2NjJiM2Y0ZjlmZWMxY2QiLCJpYXQiOjE2NjEzNDY5NzMuNTY0ODQ2OTkyNDkyNjc1NzgxMjUsIm5iZiI6MTY2MTM0Njk3My41NjQ4NDg4OTk4NDEzMDg1OTM3NSwiZXhwIjoxNjkyODgyOTczLjU1ODkzMjA2NTk2Mzc0NTExNzE4NzUsInN1YiI6Ijc5Iiwic2NvcGVzIjpbXX0.rDEqxGCqzQZI9ufWfpMUC-hLdmvX6uSr6opGW0QOZCN23pJiPcXAxe9_EtUWMKTAhLFO-B3lThe3gv59jDvxj0GhDYjBMHXxk5x65m3qlljct6qobYL_qZDDB_v0mw_jDTt7PTeMsM0YpGIBtLPzuBVo-Qhem_fYSMLXV2tibUfE7XAPSyLpDW0hnYRCzv8aOVNH4Rk7tF8PCr-lfhNpWvwzzeqocl9d-W79EuOFtNRyxVgxnL-VDSIbyBiF0dIDIMpzIRJtmzzJBKwXcmx4oV4aMhRs7k3paktlvQUaJm2XmxrMgpuCg2DiPEyMj-FgxROu4KSUXurpQEX1Im0YQ4vLaut0WXWg466IwHWJMZy_mJSPzkiIDRCecjIPjOYG5BoK1i0VH-MEvAmhVW7HVXPsXVKrfhHR3GISOnsCId-8VaxiQijoLJbu7UF-e8dgyxQwJPXROPtHmVnnJumULb22Yd-TsB5myQan6TtxwT1onwKsv0hqqoSA0YfwdRmV90Z4_7WqtnLCzGSKGwambZZFPzPE_9Cf3VnGhKxr_9Q3955kKeCwZMAYm9vsvGe92wKx7gb51qcphMojWG0ETK2VtLwk4IQMg46611z5-x4_llPb-sivJQF_gjXr9uGNL_3OfiCSDE-G3BvYYUDM7TxvxSoWM07cNvCCyQzfAFI`,

    Accept: "application/json",
    mimeType: "multipart/form-data",
  };

  let paramData = {
    data: params,
  };
  console.log(" paramdata is =====", paramData);
  axios
    .post("https://2exceltest.com.au:8443/dodee/api/edit-profile", {
      headers: headers,
      params,
    })
    .then((response) => {
      console.log(" chandni response ---", response);
      return response.data;
    })
    .catch((error) => {
      console.error(" chandni Error response:", JSON.stringify(error.response));
      throw error;
    });
  // })

  // try {
  //   console.log(
  //     ":::::::: UpdateProfile ::::::: 666666 ====>",
  //     JSON.stringify(params, null, 4)
  //   );
  //   const res = await API.updateProfile(params);
  //   console.log("UpdateProfile ===>", res, "response in API");
  //   return res.data;
  // } catch (error) {

  //   console.error("Error response:");
  //   console.error(error.response.status);  // ***
  //   console.error(error.response.headers);
  //   // console.log("Update Profile API ==> error", JSON.stringify(error.response.data, null, 4));
  //   console.log("UpdateProfile Log request parameter ===>",JSON.stringify(error.request,null,4) );
  //   throw error;
  // }
};
