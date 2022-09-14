import moment from "moment";
import _ from "lodash";
const enumerateDaysBetweenDates = function (_startDate, _endDate) {
  var startDate = moment(_startDate);
  var endDate = moment(_endDate);
  var now = startDate.clone(),
    dates = [];

  while (now.isSameOrBefore(endDate)) {
    dates.push(now.format("YYYY-MM-DD"));
    now.add(1, "days");
  }
  return dates;
};
// moment.setDefault('America/New_York');

function getCurrentWeek(date) {
  var currentDate = moment(date);
  console.log("date", date);
  var weekStart = currentDate.clone().startOf("isoWeek").toDate();
  console.log("weekStart", weekStart);
  var weekEnd = currentDate.clone().endOf("isoWeek").toDate();
  console.log("weekEnd", weekEnd);
  var days = [];
  // days.push(moment(weekStart).format("YYYY-MM-DD"));

  for (let i = 0; i <= 6; i++) {
    days.push(moment(weekStart).add(i, "d").format("YYYY-MM-DD"));
  }
  return {
    days,
    weekStart,
    weekEnd: weekEnd,
  };
}
function getDayfromDate(date) {
  return moment(date).format("ddd");
}
function getDatefromFullDate(date) {
  return moment(date).format("DD");
}
function getTimeStampfromDate(date) {
  return moment(date).format("X");
}
function getDateFromTimeStamp(timestamp) {
  return moment.unix(timestamp).format("YYYY-MM-DD");
}
function getTimeFromDateTime(dateTime) {
  return moment(dateTime).format("hh:mm");
}

function get24HrFrom12HrFormat(time) {
  return moment(time, ["h:mm A"]).format("HH:mm");
}

function getAmPmFromDate(date) {
  return moment(date).format("A");
}

export function checkObject(arr) {
  // check if arr is array
  const result = Array.isArray(arr);

  if (result) {
    console.log(`[${arr}] is an array.`);
    return false;
  } else {
    console.log(`${arr} is not an array.`);
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
    console.error('checkObjectHasData',error);
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

export {
  enumerateDaysBetweenDates,
  getCurrentWeek,
  getDayfromDate,
  getDatefromFullDate,
  getTimeStampfromDate,
  getTimeFromDateTime,
  get24HrFrom12HrFormat,
  getDateFromTimeStamp,
  getAmPmFromDate,
};
