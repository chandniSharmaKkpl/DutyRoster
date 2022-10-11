import React from "react";
import moment from "moment";
import { USER_DATE_FORMAT } from "@/utils";
// moment.locale('in');

export const convertDateTime = (dateString, isDate, isTime) => {
  // console.log(dateString);
  if (dateString) {
    if (isDate && !isTime) {
      let formattedDate = moment(dateString).format("DD/MM/YYYY");
      return formattedDate;
    }
    if (!isDate && isTime) {
      let formattedDate = moment(dateString).format("HH:mm");
      return formattedDate;
    }
  }
};

export const dayDateReturn = (dateString, isYear) => {
  // console.log("dayDateReturn :::: ==>", dateString);
  if (dateString) {
    if (isYear) {
      let formattedDate = moment(dateString, "YYYY-MM-DD").format(
        "ddd, DD-MM, YYYY"
      );
      return formattedDate;
    } else {
      let formattedDate = moment(dateString, "YYYY-MM-DD").format("ddd, DD-MM");
      // console.log("formattedDate", formattedDate);
      return formattedDate;
    }
  }
  return "";
};

export const birthDateFormat = (dateString, isDDmmYYYY) => {
  // console.log(" date string -------------", dateString);
  if (isDDmmYYYY) {
    let formattedDate = moment(dateString).format("DD/MM/YYYY");
    return formattedDate;
  } else {
    let formattedDate = moment(dateString).format("DD/MM/YYYY");
    return formattedDate;
  }
};

export const EmpTimeCardDateFormate = (dateString) => {
  let formattedDate = moment(dateString, "DD/MM/YYYY").format(
    `ddd, ${USER_DATE_FORMAT}`
  );
  return formattedDate;
};

export default {
  convertDateTime,
};
