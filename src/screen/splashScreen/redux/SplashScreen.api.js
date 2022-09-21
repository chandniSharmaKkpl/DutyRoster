import * as API from "@/api/auth";

export const initCall = async (params) => {
  try {
    const res = await API.init(params);
    console.log("res ==>", res.data);
    return res.data;
  } catch (error) {
    console.log(JSON.stringify(error,null,4));
    throw error;
  }
};
