import React from "react";
import moment from "moment";
// moment.locale('in');

export const convertDateTime = (dateString, isDate, isTime) => {
  if (dateString) {
    if (isDate && !isTime) {
      let formattedDate = moment(dateString).format("YYYY-MM-DD");
      return formattedDate;
    }
    if (!isDate && isTime) {
      let formattedDate = moment(dateString).format("HH:mm");
      return formattedDate;
    }
  }
};

export const dayDateReturn = (dateString, isYear) => {
  console.log("dayDateReturn ==>", dateString);
  if (isYear) {
    let formattedDate = moment(dateString).format("ddd, DD-MM, YYYY");
    return formattedDate;
  } else {
    let formattedDate = moment(dateString).format("ddd, DD-MM");
    console.log("formattedDate", formattedDate);
    return formattedDate;
  }
};

export const birthDateFormat = (dateString, isDDmmYYYY) => {
  console.log(" date string -------------", dateString);
  if (isDDmmYYYY) {
    let formattedDate = moment(dateString).format("DD-MM-YYYY");
    return formattedDate;
  } else {
    let formattedDate = moment(dateString).format("YYYY-MM-DD");
    return formattedDate;
  }
};

export const EmpTimeCardDateFormate = (dateString) => {
  let formattedDate = moment(dateString).format("ddd, DD-MM-YYYY");
  return formattedDate;
};

export default {
  convertDateTime,
};
