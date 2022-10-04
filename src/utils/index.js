import moment from "moment";
import _ from "lodash";
import { alertMsgConstant } from "@/constant";
import { element } from "prop-types";
const enumerateDaysBetweenDates = function (_startDate, _endDate) {
  var startDate = moment(_startDate);
  var endDate = moment(_endDate);
  var now = startDate.clone(),
    dates = [];

  while (now.isSameOrBefore(endDate)) {
    dates.push(now.format("DD/MM/YYYY"));
    now.add(1, "days");
  }
  return dates;
};
// moment.setDefault('America/New_York');

function getCurrentWeek(date) {
  var currentDate = moment(date);
  var weekStart = currentDate.clone().startOf("isoWeek").toDate();
  var weekEnd = currentDate.clone().endOf("isoWeek").toDate();
  var days = [];
  // days.push(moment(weekStart).format("DD/MM/YYYY"));

  for (let i = 0; i <= 6; i++) {
    days.push(moment(weekStart).add(i, "d").format("DD/MM/YYYY"));
  }
  return {
    days,
    weekStart,
    weekEnd: weekEnd,
  };
}

function dateCheckForCurrentWeek(date, startDay) {
  var currentDate = moment(date);
  var weekEnd = currentDate.clone().endOf("isoWeek").toDate();

  if (weekEnd <= startDay) {
    return true;
  } else {
    toast.show(alertMsgConstant.YOU_CAN_NOT_ADD_AVAILABILITY, {
      type: alertMsgConstant.TOAST_DANGER,
    });
    return false;
  }
}

function getDayfromDate(date) {
  return moment(date, "DD/MM/YYYY").format("ddd");
}
function getDatefromFullDate(date) {
  return moment(date, "DD/MM/YYYY").format("DD");
}
function getTimeStampfromDate(date) {
  return moment(date, "DD/MM/YYYY").format("X");
}
function getDateFromTimeStamp(timestamp) {
  return moment.unix(timestamp).format("DD/MM/YYYY");
}
function getTimeFromDateTime(dateTime) {
  return moment(dateTime).format("hh:mm A");
}
function getTimeFromDateTimeUTC(dateTime) {
  return moment.utc(dateTime).format("hh:mm A");
}

function get24HrFrom12HrFormat(time) {
  return moment(time, ["h:mm A"]).format("HH:mm");
}
function get12HrFrom24HrFormat(time) {
  return moment(time, ["HH:mm"]).format("h:mm A");
}
function getAmPmFromDate(date) {
  return moment(date).format("A");
}
function changeDateFormat(_date, oldFormat, newFormat) {
  return moment(_date, oldFormat).format(newFormat);
}
function inBetweenTime(_time, start, end) {
  return (
    moment(start, "h:mm A").format("x") <=
      moment(_time, ["h:mm A"]).format("x") &&
    moment(_time, "h:mm A").format("x") <= moment(end, "h:mm A").format("x")
  );
}

export function checkObject(arr) {
  // check if arr is array
  const result = Array.isArray(arr);

  if (result) {
    // console.log(`[${arr}] is an array.`);
    return false;
  } else {
    // console.log(`${arr} is not an array.`);
    return true;
  }
}

export function isArrayEmpty(arr) {
  try {
    if (Array.isArray(arr) && arr.length) {
      return false;
    }
    return true;
  } catch (error) {
    return true;
  }
}

export const checkObjectHasData = (data, key) => {
  try {
    if (_.hasIn(data, key)) {
      return true;
    }
    throw "Not data";
  } catch (error) {
    // console.error('checkObjectHasData',error);
    return null;
  }
};
export function isStringEmpty(x) {
  return (
    //don't put newline after return
    typeof x == "undefined" ||
    x == null ||
    x == false || //same as: !x
    x.length == 0 ||
    x == 0 || // note this line, you might not need this.
    x == "" ||
    x.replace(/\s/g, "") == "" ||
    !/[^\s]/.test(x) ||
    /^\s*$/.test(x)
  );
}

export const getValueFromDeepKey = (o, s) => {
  s = s.replace(/\[(\w+)\]/g, ".$1"); // convert indexes to properties
  s = s.replace(/^\./, ""); // strip a leading dot
  var a = s.split(".");
  for (var i = 0, n = a.length; i < n; ++i) {
    var k = a[i];
    if (k in o) {
      o = o[k];
    } else {
      return;
    }
  }
  return o;
};
export function renameKey(obj, old_key, new_key) {
  // check if old key = new key
  if (old_key !== new_key) {
    Object.defineProperty(
      obj,
      new_key, // modify old key
      // fetch description from object
      Object.getOwnPropertyDescriptor(obj, old_key)
    );
    delete obj[old_key]; // delete old key
  }
}

export const convertDateFormate = (dateString, dateValueObj) => {
  if (!dateValueObj) return null;
  if (dateString) {
    if (dateValueObj.key == "Format.Date") {
      let formattedDate = moment(dateString).format(dateValueObj.value);
      return formattedDate;
    }
  } else {
    return "";
  }
};

export const USER_DATE_FORMAT = "DD/MM/YYYY";
export const API_DATE_FORMAT = "DD/MM/YYYY";
export const CALENDER_DATE_FORMAT = "YYYY-MM-DD";

export {
  enumerateDaysBetweenDates,
  getCurrentWeek,
  getDayfromDate,
  getDatefromFullDate,
  getTimeStampfromDate,
  getTimeFromDateTime,
  get24HrFrom12HrFormat,
  get12HrFrom24HrFormat,
  getDateFromTimeStamp,
  getAmPmFromDate,
  changeDateFormat,
  inBetweenTime,
  dateCheckForCurrentWeek,
  getTimeFromDateTimeUTC,
};
