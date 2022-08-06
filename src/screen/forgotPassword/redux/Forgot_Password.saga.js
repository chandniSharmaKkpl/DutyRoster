import { actionConstant,appConstant } from "@/constant";
import { takeLatest, take, call, put, select, all } from "redux-saga/effects";
import { forgotPasswordCall } from "./Forgot_Password.api";

export function* workerForgotPassword(action) {

  try {
    const response = yield call(forgotPasswordCall, action.payload);

    yield put({
      type: actionConstant.ACTION_FORGOT_PASSWORD_SUCCESS,
      payload: response,
    });
    action.payload.navigation.navigate(appConstant.RESER_PWD, {"email": action.payload.email});
  } catch (error) {
    alert(error)
    action.payload.navigation.navigate(appConstant.RESER_PWD, {"email": action.payload.email});

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
