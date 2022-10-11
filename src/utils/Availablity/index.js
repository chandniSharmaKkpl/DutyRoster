import { alertMsgConstant } from "@/constant";
import _ from "lodash";
import {
  API_DATE_FORMAT,
  changeDateFormat,
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
import { Alert } from "react-native";

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
            // renameKey(availability[day], "times", "time");
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
    params.week_start = moment(weekStart).format(API_DATE_FORMAT);
    params.week_end = moment(weekEnd).format(API_DATE_FORMAT);
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

    if (
      getAmPmFromDate(inTimeInMilisecond) === "PM" &&
      getAmPmFromDate(outTimeInMilisecond) === "AM"
    ) {
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

//  Add button avalability functionality
const uniqueIterator = (item) => item.start_time || item.end_time; // Same item data remove and get unique item

const parseTimeInTimestamp = (_startTime, _endTime) => {
  let startTime = Number(changeDateFormat(_startTime, "HH:mm", "x"));
  let endTime = Number(changeDateFormat(_endTime, "HH:mm", "x"));
  if (startTime >= endTime) {
    // console.log("", moment(endTime).add(1, "day"));
    endTime = Number(moment(endTime).add(1, "day").format("x"));
  }
  return { startTime, endTime };
};

export const replaceAvalabiltyItems = (_prevData, newData, dateKey) => {
  console.log("newData", JSON.stringify(newData, null, 4));
  console.log("prevData", JSON.stringify(_prevData, null, 4));
  // let prevData = _.uniqBy(_.cloneDeep(_prevData), uniqueIterator);
  // const avalabilityTimes = _.uniqBy(_.cloneDeep(_prevData), uniqueIterator);
  let prevData = _.cloneDeep(_prevData);

  const avalabilityTimes = _.cloneDeep(_prevData);

  try {
    if (newData && prevData) {
      const alertData = [];
      newData.map((_newItem, _newItemIndex) => {
        let flag = false;

        const { startTime: _newStartTime, endTime: _newEndTime } =
          parseTimeInTimestamp(_newItem.start_time, _newItem.end_time);

        prevData.map((_prevItem, _prevItemIndex) => {
          const { startTime: _prevStartTime, endTime: _prevEndTime } =
            parseTimeInTimestamp(_prevItem.start_time, _prevItem.end_time);

          console.log(
            "Same time ===>",
            _newItem.district_id,
            _prevItem.district_id
          );
          console.log(
            "Same time ===> 123456",
            _newItem.district_id !== _prevItem.district_id
          );

          if (_newItem.district_id === _prevItem.district_id) {
            if (
              (_newStartTime > _prevStartTime &&
                _newStartTime < _prevEndTime) ||
              (_newEndTime > _prevStartTime && _newEndTime < _prevEndTime)
            ) {
              flag = true;
              alertData.push(
                `${_newItem.start_time} - ${_newItem.end_time} 1 is already occupied on ${dateKey}`
              );
            } else if (
              (_newStartTime < _prevStartTime &&
                _newEndTime > _prevStartTime) ||
              (_newStartTime < _prevEndTime && _newEndTime > _prevEndTime)
            ) {
              alertData.push(
                `${_newItem.start_time} - ${_newItem.end_time} 2 is already occupied on ${dateKey}`
              );
              flag = true;
            } else if (
              _prevStartTime === _newStartTime ||
              _prevEndTime === _newEndTime
            ) {
              // avalabilityTimes[_prevItemIndex] = _newItem;
              flag = true;
              alertData.push(
                `${_newItem.start_time} - ${_newItem.end_time} 3 is already occupied on ${dateKey}`
              );
            }
          }
        });

        if (!flag) {
          avalabilityTimes.push({ ..._newItem });
        }
      });
      console.log(
        "avalabilityTimes",
        JSON.stringify(avalabilityTimes, null, 4)
      );
      return { times: avalabilityTimes, alerts: alertData };
    }
  } catch (error) {
    alert(error);
    return null;
  }
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

    // console.log("createAvailibilityParams time", JSON.stringify(availability, null, 2));
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

        let alertData = [];
        selected.availabilitySelectedDate.forEach((element) => {
          let dateKey = getDateFromTimeStamp(element);

          if (
            checkObjectHasData(availabilityData, dateKey) &&
            checkObject(availabilityData[dateKey])
          ) {
            // console.log(
            //   "checkObjectHasData",
            //   checkObjectHasData(availabilityData[dateKey], "times")
            // );
            if (checkObjectHasData(availabilityData[dateKey], "times")) {
              const { times: _newDatas, alerts } = replaceAvalabiltyItems(
                availabilityData[dateKey].times,
                time,
                dateKey
              );
              if (alerts && alerts.length > 0) {
                console.error(JSON.stringify(alerts, null, 4));
                alertData = alertData.concat(alerts);
              }

              availability[dateKey] = {
                times: _newDatas,
              };
              // availability[dateKey] = {
              //   times: [...availabilityData[dateKey].times, ...time],
              // };
            } else {
              availability[dateKey] = {
                times: time,
              };
            }
          } else {
            availability[dateKey] = {
              times: time,
            };
          }
        });
        if (alertData && alertData.length > 0) {
          Alert.alert("Time Alert", alertData.join("\n"), [
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]);
        }
        params.availability = availability;
      } else {
        // toast.show("Not Data selected", {
        //   type: alertMsgConstant.TOAST_DANGER,
        // });
        throw "Not Data selected";
      }

      params.week_start = moment(weekStart).format("DD/MM/YYYY");
      params.week_end = moment(weekEnd).format("DD/MM/YYYY");

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
const getPreviousWeek = (_date) =>
  moment(_date, API_DATE_FORMAT).add(-1, "week").toDate();

const modifyData = ({ currentWeek, nextWeek, data }) => {
  try {
    const { days: currentWeekDays } = currentWeek;
    const { days: nextWeekDays } = nextWeek;
    const nextWeekData = {};
    currentWeekDays.forEach((_day, index) => {
      if (checkObjectHasData(data, _day))
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
      if (checkObjectHasData(existData, day)) {
        if (checkObject(existData[day])) {
          if (checkObjectHasData(newData[day], "times")) {
            const _datas = newData[day].times;
            // console.log(_datas);
            existData[day] = {
              ...existData[day],
              times: [..._datas],

              // times: [...existData[day]?.times, ..._datas],
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
    // console.log('nextWeekDates.week_start',nextWeekDates.week_start);
    const currentWeek = getCurrentWeek(
      getPreviousWeek(nextWeekDates.week_start)
    );
    const nextWeek = getCurrentWeek(
      moment(nextWeekDates.week_start, API_DATE_FORMAT).toDate()
    );

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

export const isInOutTimeValidForAvalability = ({
  availabilityData,
  time,
  id,
}) => {
  if (!isArrayEmpty(availabilityData)) {
    availabilityData.forEach((data) => {
      if (data.id !== id)
        if (data.inTime && data.outTime)
          if (inBetweenTime(time, data.inTime, data.outTime)) {
            throw "Time is Not valid";
          }
    });
  }
};

// getSelectedAvailability

export const selectedDateAvailability = (availabilityData, selectedDates) => {
  console.log(
    "availabilityData :::::====>",
    JSON.stringify(availabilityData, null, 4)
  );
  // console.log(
  //   "selectedDate :::::====>",
  //   JSON.stringify(selectedDates, null, 4)
  // );
  try {
    if (selectedDates) {
      if (availabilityData) {
        const _previousAvailabilityData = {};
        selectedDates.map((_selectedDate) => {
          const _data = availabilityData[getDateFromTimeStamp(_selectedDate)];
          if (checkObject(_data)) {
            _previousAvailabilityData[getDateFromTimeStamp(_selectedDate)] =
              _data;
          }
          // console.log(
          //   JSON.stringify(
          //     availabilityData[getDateFromTimeStamp(_selectedDate)],
          //     null,
          //     2
          //   )
          // );
        });
        console.log(
          "previousAvailabilityData :::::====>",
          JSON.stringify(_previousAvailabilityData, null, 4)
        );
        return _previousAvailabilityData;
      }
    }
    return {};
  } catch (error) {
    return {};
  }
};
