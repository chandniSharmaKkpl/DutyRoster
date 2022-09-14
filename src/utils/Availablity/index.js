import { alertMsgConstant } from "@/constant";
import {
  checkObject,
  checkObjectHasData,
  get24HrFrom12HrFormat,
  getAmPmFromDate,
  getDateFromTimeStamp,
  isArrayEmpty,
} from "@/utils";
import moment from "moment";

export const SET_DATA_TYPE = {
  district_id: "district_id",
  inTime: "inTime",
  outTime: "outTime",
};
export const createAvailibilityParams = ({ selected, weekStart, weekEnd }) => {
  try {
    const params = {};

    const availability = {};

    // console.log("createAvailibilityParams time", JSON.stringify(time, null, 2));
    if (
      selected.availabilitySelectedDate &&
      selected.availabilitySelectedDate.length > 0
    ) {
      if (selected.availabilityData) {
        const time = selected.availabilityData.map((_el) => {
          if (!_el.district_id) {
            // toast.show("Please Select District", {
            //   type: alertMsgConstant.TOAST_DANGER,
            // });
            throw "Please Select District";
          } else if (!_el.inTime) {
            // toast.show("Please Add In Time", {
            //   type: alertMsgConstant.TOAST_DANGER,
            // });
            throw "Please Add In Time";
          }
          if (!_el.outTime) {
            // toast.show("Please Add Out Time", {
            //   type: alertMsgConstant.TOAST_DANGER,
            // });
            throw "Please Add Out Time";
          }
          return {
            district: _el.district_id,
            start_time: get24HrFrom12HrFormat(_el.inTime),
            end_time: get24HrFrom12HrFormat(_el.outTime),
          };
        });
        console.log(
          "selected.availabilitySelectedDate",
          selected.availabilitySelectedDate
        );

        selected.availabilitySelectedDate.forEach((element) => {
          availability[getDateFromTimeStamp(element)] = {
            time: time,
          };
        });
        params.availability = availability;
      } else {
        // toast.show("Not Data selected", {
        //   type: alertMsgConstant.TOAST_DANGER,
        // });
        throw "Not Data selected";
      }
      params.week_start = moment(weekStart).format("YYYY-MM-DD");
      params.week_end = moment(weekEnd).format("YYYY-MM-DD");
      console.log("createAvailibilityParams", JSON.stringify(params, null, 2));
      return params;
    } else {
      //   toast.show("Please Select Availability Date", {
      //     type: alertMsgConstant.TOAST_DANGER,
      //   });
      //   alert("Please Select Availability Date");
      throw "Please Select Availability Date";
    }
  } catch (error) {
    // alert(error);
    throw error;
  }
};

export const isInOutTimeValid = (inTime, outTime) => {
  if (inTime) {
    const inTimeInMilisecond = Number(moment(inTime, "hh:mm A").format("x"));
    const outTimeInMilisecond = Number(moment(outTime).format("x"));
    // console.log("inTime ", inTimeInMilisecond);
    // console.log("outTime", outTimeInMilisecond);
    // console.log(
    //   `in => ${getAmPmFromDate(inTimeInMilisecond)}, out => ${getAmPmFromDate(
    //     outTimeInMilisecond
    //   )}`
    // );

    if (
      getAmPmFromDate(inTimeInMilisecond) === "PM" &&
      getAmPmFromDate(outTimeInMilisecond) === "AM"
    ) {
      // console.log("in => PM, out => AM");
      // console.log("new inTime", inTimeInMilisecond + 3 * 60 * 60 * 1000);
      // console.log("new outTime", outTimeInMilisecond + 24 * 60 * 60 * 1000);

      if (
        inTimeInMilisecond + 3 * 60 * 60 * 1000 <= //addThree Hour in IN time
        outTimeInMilisecond + 24 * 60 * 60 * 1000 // add One day in Out Time
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      if (inTimeInMilisecond + 3 * 60 * 60 * 1000 <= outTimeInMilisecond) {
        return true;
      } else {
        return false;
      }
    }
  }
  return false;
};

export const addAvailibilityDataParams = ({
  selected,
  weekStart,
  weekEnd,
  districts,
  availabilityData,
}) => {
  try {
    const params = {};

    const availability = typeof(availabilityData) !== "string" ? availabilityData : {};

    // console.log("createAvailibilityParams time", JSON.stringify(time, null, 2));
    if (
      selected.availabilitySelectedDate &&
      selected.availabilitySelectedDate.length > 0
    ) {
      if (selected.availabilityData) {
        const time = selected.availabilityData.map((_el) => {
          if (!_el.district_id) {
            // toast.show("Please Select District", {
            //   type: alertMsgConstant.TOAST_DANGER,
            // });
            throw "Please Select District";
          } else if (!_el.inTime) {
            // toast.show("Please Add In Time", {
            //   type: alertMsgConstant.TOAST_DANGER,
            // });
            throw "Please Add In Time";
          }
          if (!_el.outTime) {
            // toast.show("Please Add Out Time", {
            //   type: alertMsgConstant.TOAST_DANGER,
            // });
            throw "Please Add Out Time";
          }
          return {
            district: _el.district_id,
            district_id: _el.district_id,
            district_name: districts.find(
              (district) => district.district_id === _el.district_id
            )?.district_name,
            start_time: get24HrFrom12HrFormat(_el.inTime),
            end_time: get24HrFrom12HrFormat(_el.outTime),
          };
        });
        console.log(
          "selected.availabilitySelectedDate",
          selected.availabilitySelectedDate
        );

        selected.availabilitySelectedDate.forEach((element) => {
          let dateKey = getDateFromTimeStamp(element);

          if (
            checkObjectHasData(availabilityData, dateKey) &&
            checkObject(availabilityData[dateKey])
          ) {
            // console.log(
            //   "availabilityData[dateKey].times",
            //   availabilityData[dateKey]
            // );
            availability[dateKey] = {
              times: [...availabilityData[dateKey].times, ...time],
            };
          } else {
            availability[dateKey] = {
              times: time,
            };
          }
        });
        params.availability = availability;
      } else {
        // toast.show("Not Data selected", {
        //   type: alertMsgConstant.TOAST_DANGER,
        // });
        throw "Not Data selected";
      }
      params.week_start = moment(weekStart).format("YYYY-MM-DD");
      params.week_end = moment(weekEnd).format("YYYY-MM-DD");
      console.log("createAvailibilityParams", JSON.stringify(params, null, 2));
      return params;
    } else {
      //   toast.show("Please Select Availability Date", {
      //     type: alertMsgConstant.TOAST_DANGER,
      //   });
      //   alert("Please Select Availability Date");
      throw "Please Select Availability Date";
    }
  } catch (error) {
    alert(error);
    throw error;
  }
};
