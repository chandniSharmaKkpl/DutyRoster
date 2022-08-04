import { actionConstant } from "@/constant";
import { takeLatest, take, call, put, select, all } from "redux-saga/effects";
import { loginCall } from "./Login.api";

export function* workerGetAccessToken(action) {
  try {
    const accessToken = yield call(loginCall, action.payload);
    yield put({
      type: actionConstant.ACTION_GET_ACCESS_TOKEN_SUCCESS,
      payload: accessToken,
    });
  } catch (error) {
    yield put({
      type: actionConstant.ACTION_GET_ACCESS_TOKEN_FAILURE,
      payload: error,
    });
  }
}

export function* watchGetAccessToken() {
  yield takeLatest(
    actionConstant.ACTION_GET_ACCESS_TOKEN_REQUEST,
    workerGetAccessToken
  );
}
