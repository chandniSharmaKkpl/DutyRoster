import { actionConstant, appConstant } from "@/constant";
import localDb from "@/database/localDb";
import { navigateAndReset } from "@/navigators/utils";
import { takeLatest, take, call, put, select, all } from "redux-saga/effects";
import { loginCall } from "./Login.api";
export function* workerGetAccessToken(action) {
  try {
    const loginResponse = yield call(loginCall, action.payload);
    yield put({
      type: actionConstant.ACTION_GET_ACCESS_TOKEN_SUCCESS,
      payload: loginResponse,
    });
    localDb.setUser(loginResponse.data);
    localDb.setAccessToken(loginResponse.data.token);
    console.log(loginResponse.data, "loginResponse.data");

    action.payload.navigation.navigate(appConstant.HOME, {
      userData: loginResponse.data,
    });
    // action.payload.navigation.reset({
    //   index: 0,
    //   routes: [{ name: appConstant.HOME, userData: loginResponse.data }],
    // });
    // navigateAndReset(
    //   [{ name: appConstant.HOME, userData: loginResponse.data }],
    //   0
    // );
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
