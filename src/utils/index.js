import moment from "moment";

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

function getCurrentWeek(date) {
  var currentDate = moment(date);
  var weekStart = currentDate.clone().startOf("isoWeek");
  // console.log("weekStart", weekStart);
  var weekEnd = currentDate.clone().endOf("isoWeek");
  // console.log("weekEnd", weekEnd);
  var days = [];
  for (var i = 0; i <= 6; i++) {
    days.push(moment(weekStart).add(i, "days").format("YYYY-MM-DD"));
  }
  return { days, weekStart, weekEnd };
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
export {
  enumerateDaysBetweenDates,
  getCurrentWeek,
  getDayfromDate,
  getDatefromFullDate,
  getTimeStampfromDate,
  getTimeFromDateTime,
  get24HrFrom12HrFormat,
  getDateFromTimeStamp,
};
