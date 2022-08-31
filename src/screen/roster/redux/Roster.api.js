import * as API from "@/api/auth";

export const RoasterDateRangeCall = async (params) => {
  try {
    const res = await API.roasterDateRange(params);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
