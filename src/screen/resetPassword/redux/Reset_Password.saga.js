import { actionConstant, appConstant } from "@/constant";
import { takeLatest, take, call, put, select, all } from "redux-saga/effects";
import { resetPasswordCall } from "./Reset_Password.api";

export function* workerResetPassword(action) {
  try {
    const response = yield call(resetPasswordCall, action.payload);
    yield put({
      type: actionConstant.ACTION_RESET_PASSWORD_SUCCESS,
      payload: response,
    });
    if (response.data.message) {
      alert(response.data.message);
      action.payload.navigation.navigate(appConstant.LOGIN);
    }
  } catch (error) {
    yield put({
      type: actionConstant.ACTION_RESET_PASSWORD_FAILURE,
      payload: error,
    });
  }
}

export function* watchResetPassword() {
  yield takeLatest(
    actionConstant.ACTION_RESET_PASSWORD_REQUEST,
    workerResetPassword
  );
}
