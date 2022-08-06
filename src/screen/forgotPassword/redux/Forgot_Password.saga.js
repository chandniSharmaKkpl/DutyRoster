import { actionConstant } from "@/constant";
import { takeLatest, take, call, put, select, all } from "redux-saga/effects";
import { forgotPasswordCall } from "./Forgot_Password.api";

export function* workerForgotPassword(action) {
  console.log(" re---s is ", action.payload);

  try {
    const response = yield call(forgotPasswordCall, action.payload);

    yield put({
      type: actionConstant.ACTION_FORGOT_PASSWORD_SUCCESS,
      payload: response,
    });
    action.payload.navigation.navigate(appConstant.RESER_PWD);
  } catch (error) {
    alert(error)
    yield put({
      type: actionConstant.ACTION_FORGOT_PASSWORD_FAILURE,
      payload: error,
    });
  }
}

export function* watchForgotPassword() {
  yield takeLatest(
    actionConstant.ACTION_FORGOT_PASSWORD_REQUEST,
    workerForgotPassword
  );
}
