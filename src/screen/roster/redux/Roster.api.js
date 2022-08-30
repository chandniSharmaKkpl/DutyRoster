import * as API from "@/api/auth";

export const RoasterDateRangeCall = async (params) => {
    console.log("RoasterDateRangeCall =>", params);
  try {
    const res = await API.roasterDateRange(params);
    // console.log("roaster range date data ->", JSON.stringify(res, null,4));
    return res.data;
  } catch (error) {
    alert(JSON.stringify(error.message.message));
    console.log(error);

    throw error;
  }
};
