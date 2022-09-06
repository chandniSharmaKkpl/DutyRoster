import { getTimeFromDateTime } from "../index";

export const cardConfig = [
  {
    title: "Location",
    key: "location",
    flag: false,
    minWidth: 100,
  },
  {
    title: "IN",
    key: "signin",
    flag: false,
    minWidth: 50,
  },
  {
    title: "OUT",
    key: "signout",
    flag: false,
    minWidth: 50,
  },
  {
    title: "LHR",
    key: "shift",
    flag: true,
    type: "LHR",
    minWidth: 50,
    textAlign: "center",
  },
  {
    title: "DHR",
    key: "shift",
    type: "DHR",
    flag: true,
    minWidth: 50,
    textAlign: "center",
  },
  {
    title: "SHR",
    key: "shift",
    type: "SHR",
    flag: true,
    minWidth: 50,
    textAlign: "center",
  },
];

export const bottomCardConfig = [
  {
    mainTitle: null,
    key: "totalshift",
    data: [
      {
        key: "HRS",
        title: "Total LHRS",
        value: (value) => {
          return `${value.toFixed(2)}`;
        },
      },
      {
        key: "LHR",
        title: "Total LHR",
        value: (value) => {
          return `${value.toFixed(2)}`;
        },
      },
      {
        key: "DHR",
        title: "Total DHR",
        value: (value) => {
          return `${value.toFixed(2)}`;
        },
      },
      {
        key: "SHR",
        title: "Total SHR",
        value: (value) => {
          return `${value.toFixed(2)}`;
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
        label: null
      },
      {
        key: "rate_per_hour",
        title: "Rate / HR",
        value: (value) => {
          return `${value.toFixed(2)}`;
        },
      },
      {
        key: "book_total_hours",
        title: "BOOK TOTAL",
        value: null,
        label: {
          key: "book_total_dollar",
          value: (value) => {
            return `$${value.toFixed(2)}`;
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
        value: null,
      },
      {
        key: "book_total_hours",
        title: "BOOK TOTAL",
        value: null,
        label: null,
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
