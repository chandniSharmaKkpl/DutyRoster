import React from "react";
import moment from "moment";

export const convertDateTime = (dateString, isDate, isTime) => {
    if(dateString) {
        if(isDate && !isTime) {
            let formattedDate = moment(dateString).format("YYYY-MM-DD");
            return formattedDate;
         }
         if(!isDate && isTime) {
            let formattedDate = moment(dateString).format("HH:mm");
            return formattedDate
         }
    }
};

export default {
    convertDateTime
  };