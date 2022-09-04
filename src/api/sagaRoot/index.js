import { all, fork } from "redux-saga/effects";
import { watchError } from "./global.saga";
import { watchGetAccessToken } from "@/screen/login/redux/Login.saga";
import { watchSignup } from "@/screen/signup/redux/Signup.saga";
import { watchForgotPassword } from "@/screen/forgotPassword/redux/Forgot_Password.saga";
import { watchResetPassword } from "@/screen/resetPassword/redux/Reset_Password.saga";
import { watchGetQRCodeResponse } from "@/screen/qrCode/redux/QRCode.saga";
import { watchProfile } from "@/screen/editProfile/redux/Profile.saga";
import { watchGetRoasterDate } from "@/screen/roster/redux/Roster.saga";
import { watchGetAvailabilityDate } from "@/screen/availability/redux/Availability.saga";

export default function* sagaRoot() {
  yield all([
    fork(watchError),
    fork(watchSignup),
    fork(watchGetAccessToken),
    fork(watchForgotPassword),
    fork(watchResetPassword),
    fork(watchGetQRCodeResponse),
    fork(watchProfile),
    fork(watchGetRoasterDate),
    fork(watchGetAvailabilityDate),

  ]);
}
