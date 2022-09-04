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
