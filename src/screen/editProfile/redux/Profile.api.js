import * as API from "@/api/user";
import axios from "axios";
export const ViewProfile = async (params) => {
  try {
    const res = await API.user(params);
    // console.log(":::::::::: ViewProfile ::::::::::", res);
    return res.data;
  } catch (error) {
    console.log(error, "error");
    throw error;
  }
};

export const UpdateProfile = async (params) => {
  try {
    console.log(
      ":::::::: UpdateProfile ::::::: 666666 ====>",
      JSON.stringify(params, null, 4)
    );
    const res = await API.updateProfile(params);
    console.log("UpdateProfile ===>", res, "response in API");
    return res.data;
  } catch (error) {

    console.error("Error response:");
    console.error(error.response.status);  // ***
    console.error(error.response.headers);
    // console.log("Update Profile API ==> error", JSON.stringify(error.response.data, null, 4));
    console.log("UpdateProfile Log request parameter ===>",JSON.stringify(error.request,null,4) );
    throw error;
  }
};
