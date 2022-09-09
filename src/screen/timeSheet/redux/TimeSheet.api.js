import * as API from "@/api/auth";

export const TimeSheetDateRangeCall = async (params) => {
  try {
    const res = await API.timesheetDateRange(params);
    return res.data;
  } catch (error) {
    console.log("error", JSON.stringify(error, null, 4));
    throw error;
  }
};
