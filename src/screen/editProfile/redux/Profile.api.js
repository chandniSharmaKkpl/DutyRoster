
import * as API from "@/api/user";

export const ViewProfile = async (params) => {
  try {
    const res = await API.user(params);
    return res.data;
  } catch (error) {
    console.log(error , 'error')
    throw error;
  }
};

export const UpdateProfile = async (params) => {
  try {
    console.log(params , 'paramsDta')
    const res = await API.updateProfile(params);
    console.log(res , 'response in API');
    return res.data;
  } catch (error) {
    console.log(error , 'errossr')
    throw error;
  }
};
