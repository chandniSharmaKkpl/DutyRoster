import {
  getAmPmFromDate,
  getTimeFromDateTime,
  getTimeFromDateTimeUTC,
} from "../index";

export const timeSheetCardConfig = [
  {
    title: "Location",
    key: "location",
    flag: false,
    maxWidth: "25%",
    flex: 2,
  },
  {
    title: "IN",
    key: "signin",
    flag: true,
    maxWidth: "15%",
    flex: 1,
    titleAlignment: "left",
    textAlign: "center",
  },
  {
    title: "OUT",
    key: "signout",
    flag: true,
    maxWidth: "15%",
    flex: 1,
    titleAlignment: "left",
    textAlign: "center",
  },
  {
    title: "LHR",
    key: "shift",
    flag: true,
    type: "LHR",
    maxWidth: "15%",
    flex: 1,
    textAlign: "left",
  },
  {
    title: "DHR",
    key: "shift",
    type: "DHR",
    flag: true,
    maxWidth: "15%",
    flex: 1,
    textAlign: "left",
  },
  {
    title: "SHR",
    key: "shift",
    type: "SHR",
    flag: true,
    maxWidth: "15%",
    flex: 1,
    textAlign: "left",
  },
];

export const timeSheetBottomCardConfig = [
  {
    mainTitle: null,
    key: "totalshift",
    data: [
      {
        key: "HRS",
        title: "Total HRS",
        value: (value) => {
          return `${parseFloat(value).toFixed(2)}`;
        },
      },
      {
        key: "LHR",
        title: "Total LHR",
        value: (value) => {
          return `${parseFloat(value).toFixed(2)}`;
        },
      },
      {
        key: "DHR",
        title: "Total DHR",
        value: (value) => {
          return `${parseFloat(value).toFixed(2)}`;
        },
      },
      {
        key: "SHR",
        title: "Total SHR",
        value: (value) => {
          return `${parseFloat(value).toFixed(2)}`;
        },
      },
    ],
  },
  {
    mainTitle: "Bank",
    key: "bank",
    data: [
      {
        key: "default_hours",
        title: "Default Hour",
        value: null,
        label: null,
      },
      {
        key: "rate_per_hour",
        title: "Rate / HR",
        value: (value) => {
          return `$${parseFloat(value).toFixed(2)}`;
        },
      },
      {
        key: "book_total_hours",
        title: "BOOK TOTAL",
        value: null,
        label: {
          key: "book_total_dollar",
          value: (value) => {
            return `$${parseFloat(value).toFixed(2)}`;
          },
        },
      },
    ],
  },
  {
    mainTitle: "Cash",
    key: "bank",
    data: [
      {
        key: "rate_per_hour",
        title: "Rate / HR",
        value: (value) => {
          return `$${parseFloat(value).toFixed(2)}`;
        },
      },
      {
        key: "book_total_hours",
        title: "Cash TOTAL",
        value: null,
        label: null,
      },
    ],
  },
  {
    mainTitle: "Cash $2 Extra",
    key: "cash.cash_extra",
    data: [
      // FRI,SAT
      {
        key: "cash_fri_sat_rate",
        title: "Rate / HR",
        value: (value) => {
          return `$${parseFloat(value).toFixed(2)}`;
        },
      },
      {
        key: "cash_fri_sat_hour",
        title: "$2 FRI,SAT",
        value: null,
        label: {
          key: "cash_fri_sat_dollar",
          value: (value) => {
            return `$${parseFloat(value).toFixed(2)}`;
          },
        },
      },
      // Sunday
      {
        key: "cash_sun_rate",
        title: "/HR",
        value: (value) => {
          return `$${parseFloat(value).toFixed(2)}`;
        },
      },
      {
        key: "cash_sun_hour",
        title: "$4 SUN",
        value: null,
        label: {
          key: "cash_sun_dollar",
          value: (value) => {
            return `$${parseFloat(value).toFixed(2)}`;
          },
        },
      },
    ],
  },
  {
    mainTitle: "Adjustment",
    key: "adjustment",
    data: [
      {
        key: "total_hrs",
        title: "TOTAL HRS ($)",
        value: (value) => {
          return `$${parseFloat(value).toFixed(2)}`;
        },
      },
      {
        key: "plus_minus",
        title: "+ /-($)",
        value: (value) => {
          return `$${parseFloat(value).toFixed(2)}`;
        },
      },
      {
        key: "grand_total",
        title: "GRAND TOTAL ($)",
        value: (value) => {
          return `$${parseFloat(value).toFixed(2)}`;
        },
      },
      {
        key: "note",
        title: "NOTE",
        value: null,
      },
      {
        key: "remark",
        title: "REMARK",
        value: null,
      },
    ],
  },
  {
    mainTitle: null,
    key: "adjustment",
    data: [
      // FRI,SAT
      {
        key: "payg",
        title: "PAYG",
        value: (value) => {
          return `$${parseFloat(value).toFixed(2)}`;
        },
      },
      {
        key: "bank_transfer",
        title: "BANK TRANSFER",
        value: (value) => {
          return `$${parseFloat(value).toFixed(2)}`;
        },
      },
      {
        key: "cash_Amount",
        title: "CASH AMOUNT",
        value: (value) => {
          return `$${parseFloat(value).toFixed(2)}`;
        },
      },
    ],
  },
];

export const extractData = (item, { key, type }) => {
  if (key === "location") {
    return item[key];
  } else if (key === "signin" || key === "signout") {
    console.log("getTimeFromDateTime=>", item[key]);
    return getTimeFromDateTimeUTC(item[key]);
  } else if (key == "shift") {
    if (type === item[key]) {
      return item.hours;
    }
    return "-";
  }
  return "text";
};

export const inOutTimeFormate = (item, { key, type }) => {
  if (key === "signin" || key === "signout") {
    console.log("getTimeFromDateTime=>", item[key]);
    return getAmPmFromDate(item[key]);
  }
  return "text";
};
