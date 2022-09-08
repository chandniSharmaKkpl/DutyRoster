import { getTimeFromDateTime } from "../index";

export const cardConfig = [
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
    flag: false,
    maxWidth: "15%",
    flex: 1,
  },
  {
    title: "OUT",
    key: "signout",
    flag: false,
    maxWidth: "15%",
    flex: 1,
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

export const bottomCardConfig = [
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
    mainTitle: "Cash Extra",
    key: "cash.cash_extra",
    data: [
      // FRI,SAT
      {
        key: "cash_fri_sat_rate",
        title: "Rate / HR",
        value: (value) => {
          return `$${parseFloat(value).toFixed()}`;
        },
      },
      {
        key: "cash_fri_sat_hour",
        title: "FRI,SAT",
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
        title: "Rate / HR",
        value: (value) => {
          return `$${parseFloat(value).toFixed()}`;
        },
      },
      {
        key: "cash_sun_hour",
        title: "Sunday",
        value: null,
        label: {
          key: "cash_sun_dollar",
          value: (value) => {
            return `$${parseFloat(value).toFixed(2)}`;
          },
        },
      },
      // OverTime
      {
        key: "cash_overtime_rate",
        title: "Rate / HR",
        value: (value) => {
          return `$${parseFloat(value).toFixed()}`;
        },
      },
      {
        key: "cash_overtime_hour",
        title: "OverTime",
        value: null,
        label: {
          key: "cash_overtime_dollar",
          value: (value) => {
            return `$${parseFloat(value).toFixed(2)}`;
          },
        },
      },
      // Holiday
      {
        key: "cash_holiday_rate",
        title: "Rate / HR",
        value: (value) => {
          return `$${parseFloat(value).toFixed()}`;
        },
      },
      {
        key: "cash_holiday_hour",
        title: "Holiday",
        value: null,
        label: {
          key: "cash_holiday_dollar",
          value: (value) => {
            return `$${parseFloat(value).toFixed(2)}`;
          },
        },
      },
    ],
  },
];

export const extractData = (item, { key, type }) => {
  if (key === "location") {
    return item[key];
  } else if (key === "signin" || key === "signout") {
    return getTimeFromDateTime(item[key]);
  } else if (key == "shift") {
    if (type === item[key]) {
      return item.hours;
    }
    return "-";
  }
  return "text";
};
