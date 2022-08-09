import { actionConstant, appConstant } from "@/constant";
import localDb from "@/database/localDb";
import { takeLatest, take, call, put, select, all } from "redux-saga/effects";
import { loginCall } from "./Login.api";

export function* workerGetAccessToken(action) {
  try {
    const loginResponse = yield call(loginCall, action.payload);
    yield put({
      type: actionConstant.ACTION_GET_ACCESS_TOKEN_SUCCESS,
      payload: loginResponse,
    });
   //localDb.setUser(loginResponse.data); 
     action.payload.navigation.navigate(appConstant.HOME,{userData: loginResponse.data}); 
  } catch (error) {
    alert(error); 
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
