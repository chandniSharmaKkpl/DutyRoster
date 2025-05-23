import { string } from "prop-types";

const isEmailValid = (email) => {
  let format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (format.test(email)) {
    return true;
  } else {
    return false;
  }
};

const isMobileNumberValid = (string) => {
  var format = /^[0]?[789]\d{9}$/;
  // /^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-57-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/;

  if (format.test(string)) {
    return true;
  } else {
    return false;
  }
};

const isValidTitle = (string) => {
  var format =
    /^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-57-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/;

  if (format.test(string)) {
    return true;
  } else {
    return false;
  }
};

const isValidPassword = (password) => {
  var format = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,30}$/;
  if (password.match(format)) {
    return true;
  } else {
    return false;
  }
};

// Expect input as d/m/y
const isValidDate = (s) => {
  var bits = s.split("-");
  var d = new Date(bits[2], bits[1] - 1, bits[0]);
  return d && d.getMonth() + 1 == bits[1];
};

export { isEmailValid, isMobileNumberValid, isValidDate, isValidPassword };
