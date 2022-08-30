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

export const dayDateReturn = (
    dateString,
   isYear
  ) => {
    console.log("dayDateReturn =>", dateString);
    if (isYear) {
        let formattedDate = moment(dateString).format('ddd, d-MM, YYYY');
        return formattedDate
    }else{
        let formattedDate = moment(dateString).format('ddd, d-MM');
        return formattedDate
    }
   
  };

export default {
    convertDateTime
  };