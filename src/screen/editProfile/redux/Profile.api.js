import * as API from "@/api/user";


export const ViewProfile = async (params) => {
  try {
    const data = {
      employee_id: params.employee_id,
    };
    const res = await API.user(data);

    return res.data;
  } catch (error) {
    console.log(error, "error");
    throw error;
  }
};

export const UpdateProfile = async (params) => {
  try {
    const res = await API.updateProfile(params);
    return res;
  } catch (error) {
    console.log("***************-", error, "error");
    throw error;
  }
};
