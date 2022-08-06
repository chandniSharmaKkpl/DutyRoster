import { actionConstant } from "@/constant";
import { takeLatest, take, call, put, select, all } from "redux-saga/effects";
import { resetPasswordCall } from "./Reset_Password.api";

export function* workerResetPassword(action) {
  console.log(" actin reset ", action.payload);
  try {
    const accessToken = yield call(resetPasswordCall, action.payload);
    yield put({
      type: actionConstant.ACTION_RESET_PASSWORD_SUCCESS,
      payload: accessToken,
    });
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
