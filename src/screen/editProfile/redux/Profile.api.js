
import * as API from "@/api/user";

export const ViewProfile = async (params) => {
  try {
    const res = await API.user(params);
    console.log(":::::::::: ViewProfile ::::::::::", res);
    return res.data;
  } catch (error) {
    console.log(error , 'error')
    throw error;
  }
};

export const UpdateProfile = async (params) => {
  try {
    console.log(":::::::: UpdateProfile ::::::: 666666 ====>", JSON.stringify(params,null,4))
    const res = await API.updateProfile(params);
    console.log("UpdateProfile ===>",res , 'response in API');
    return res.data;
  } catch (error) {
    console.log(error , 'errossr')
    throw error;
  }
};
