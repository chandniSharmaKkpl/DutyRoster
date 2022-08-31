import { actionConstant, appConstant, alertMsgConstant } from "@/constant";
import { takeLatest, take, call, put, select, all } from "redux-saga/effects";
import { loginCall } from "./Login.api";
import localDb from "@/database/localDb";

export function* workerGetAccessToken(action) {
  try {
    const loginResponse = yield call(loginCall, action.payload);
    if (!loginResponse.success) {
      var stringCombined = "";
      let arrayTemp = Object.keys(loginResponse.error);

      for (let index = 0; index < arrayTemp.length; index++) {
        const element = arrayTemp[index];
        element1 = loginResponse.error[element];

        if (element1.length > 0) {
          let stringTemp = element1[0];
          stringCombined = stringCombined + stringTemp.toString();
        }
      }
      toast.show(stringCombined, {
        type: alertMsgConstant.TOAST_DANGER,
      });
      yield put({
        type: actionConstant.ACTION_GET_ACCESS_TOKEN_FAILURE,
        payload: stringCombined,
      });
    } else {
      yield put({
        type: actionConstant.ACTION_GET_ACCESS_TOKEN_SUCCESS,
        payload: loginResponse,
      });
      localDb.setUser(loginResponse.data);
      localDb.setAccessToken(loginResponse.data.token);
      if (loginResponse.data) {
        action.payload.navigation.navigate(appConstant.HOME, {
          userData: loginResponse.data,
        });
      }
      toast.show(loginResponse.message, {
        type: alertMsgConstant.TOAST_SUCCESS,
      });
    }
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
