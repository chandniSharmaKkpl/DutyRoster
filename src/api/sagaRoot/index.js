import { all, fork } from "redux-saga/effects";
import { watchError } from "./global.saga";
import { watchGetAccessToken } from "@/screen/login/redux/Login.saga";
import { watchForgotPassword } from "@/screen/forgotPassword/redux/Forgot_Password.saga";
import { watchResetPassword } from "@/screen/resetPassword/redux/Reset_Password.saga";

export default function* sagaRoot() {
  yield all([
    fork(watchError),
    // fork(watchGetApiBase),
    fork(watchGetAccessToken),
    fork(watchForgotPassword),
    fork(watchResetPassword)
  ]);
}
