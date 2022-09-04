//  import * as API from "@/api/user";
 import * as API from "@/api/auth";

export const getAvailabilityApiCall = async (params) => {
  try {
    const res = await API.getAvailbility(params);
    return res.data;
  } catch (error) {
    console.log("Availbility error ",error);
    throw error;
  }
};

export const saveAvailabilityApiCall = async (params) => {
  try {
    const res = await API.saveAvailbility(params);
    console.log(" save Availability api call ======,", res);

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
