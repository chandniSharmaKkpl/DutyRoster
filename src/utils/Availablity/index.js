import { alertMsgConstant } from "@/constant";
import _ from "lodash";
import {
  checkObject,
  checkObjectHasData,
  get24HrFrom12HrFormat,
  getAmPmFromDate,
  getCurrentWeek,
  getDateFromTimeStamp,
  inBetweenTime,
  isArrayEmpty,
  renameKey,
} from "@/utils";
import moment from "moment";

export const SET_DATA_TYPE = {
  district_id: "district_id",
  inTime: "inTime",
  outTime: "outTime",
  inTime: "inTime",
  start_time: "start_time",
  end_time: "end_time",
};
export const createAvailibilityParams = ({
  availabilityData,
  weekStart,
  weekEnd,
}) => {
  try {
    const params = {};
    const availability = _.cloneDeep(availabilityData);
    // console.log("before availability", JSON.stringify(availability, null, 4));
    for (const day in availability) {
      if (Object.hasOwnProperty.call(availability, day)) {
        if (
          checkObject(availability[day]) &&
          checkObjectHasData(availability[day], "times")
        ) {
          // availability[day].times.forEach((_el) => {});
          // console.log("", availability[day].times);
          if (availability[day].times && availability[day].times.length > 0) {
            availability[day].times.map((_el) => {
              _el.district = _el.district_id;
            });
            renameKey(availability[day], "times", "time");
          } else {
            delete availability[day];
          }
        } else {
          delete availability[day];
        }
      }
    }
    // console.log("after availability", JSON.stringify(availability, null, 4));

    params.availability = availability;
    params.week_start = moment(weekStart).format("DD/MM/YYYY");
    params.week_end = moment(weekEnd).format("DD/MM/YYYY");
    // console.log("createAvailibilityParams", JSON.stringify(params, null, 2));
    return params;
  } catch (error) {
    // alert(error);
    throw error;
  }
};

/*
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
      params.week_start = moment(weekStart).format("DD/MM/YYYY");
      params.week_end = moment(weekEnd).format("DD/MM/YYYY");
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

*/

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

    const availability =
      typeof availabilityData !== "string" ? availabilityData : {};

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
      params.week_start = moment(weekStart).format("DD/MM/YYYY");
      params.week_end = moment(weekEnd).format("DD/MM/YYYY");
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
    // console.error(error);
    // alert(error);
    throw error;
  }
};
const getPreviousWeek = (_date) => moment(_date).add(-1, "week").toDate();

const modifyData = ({ currentWeek, nextWeek, data }) => {
  try {
    const { days: currentWeekDays } = currentWeek;
    const { days: nextWeekDays } = nextWeek;
    const nextWeekData = {};
    currentWeekDays.forEach((_day, index) => {
      nextWeekData[nextWeekDays[index]] = data[_day];
    });
    // console.log(
    //   "modifyData",
    //   JSON.stringify({ currentWeek, nextWeek, data, nextWeekData }, null, 4)
    // );
    // console.log(JSON.stringify(nextWeekData, null, 4));
    return nextWeekData;
  } catch (error) {
    throw error;
  }
};
const mergeData = ({ existData, newData }) => {
  try {
    for (const day in existData) {
      if (Object.hasOwnProperty.call(existData, day)) {
        if (checkObject(existData[day])) {
          if (Object.hasOwnProperty.call(newData[day], "times")) {
            const _datas = newData[day].times;
            // console.log(_datas);
            existData[day] = {
              ...existData[day],
              times: [...existData[day]?.times, ..._datas],
            };
          }
        } else {
          const _datas = newData[day].times;
          existData[day] = {
            ...existData[day],
            times: _datas,
          };
        }
      }
    }
  } catch (error) {
    throw error;
  }
  // console.log("merge", JSON.stringify(existData, null, 2));
};

export const appendAvailabilityData = ({
  copiedData,
  existData,
  nextWeekDates,
  haveToMerge = false,
}) => {
  try {
    const currentWeek = getCurrentWeek(
      getPreviousWeek(nextWeekDates.week_start)
    );
    const nextWeek = getCurrentWeek(nextWeekDates.week_start);

    const newData = modifyData({ currentWeek, nextWeek, data: copiedData });
    if (existData) {
      if (haveToMerge) {
        // console.log("existData", JSON.stringify(existData, null, 4));
        mergeData({
          existData,
          newData,
        });
        return existData;
      }
    }
    return newData;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

export const getLastDateOfCurrentWeek = () => {
  return moment(new Date()).clone().startOf("isoWeek").toDate();
};


export const isInOutTimeValidForAvalability = ({ availabilityData, time }) => {
  if (!isArrayEmpty(availabilityData)) {
    availabilityData.forEach((data) => {
      if (data.inTime && data.outTime)
        if (inBetweenTime(time, data.inTime, data.outTime)) {
          throw "Time is Not valid";
        }
    });
  }
};
