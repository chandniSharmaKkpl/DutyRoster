import { actionConstant, alertMsgConstant, appConstant } from "@/constant";
import { takeLatest, take, call, put, select, all } from "redux-saga/effects";
import { resetPasswordCall } from "./Reset_Password.api";

export function* workerResetPassword(action) {
  try {
    const response = yield call(resetPasswordCall, action.payload);
    if (!response.data.success) {
      var stringCombined = "";
      let arrayTemp = Object.keys(response.data.error);
      for (let index = 0; index < arrayTemp.length; index++) {
        const element = arrayTemp[index];
        let element1 = response.data.error[element];

        if (element1.length > 0) {
          let stringTemp = element1[0];
          stringCombined = stringCombined + stringTemp.toString();
        }
      }
      toast.show(stringCombined, {
        type: alertMsgConstant.TOAST_DANGER,
      });
      yield put({
        type: actionConstant.ACTION_RESET_PASSWORD_FAILURE,
        payload: stringCombined,
      });
    } else {
      yield put({
        type: actionConstant.ACTION_RESET_PASSWORD_SUCCESS,
        payload: response.data.message,
      });
      if (response) {
        alert(response.data.message);
        action.payload.navigation.navigate(appConstant.LOGIN);
      }
      toast.show(response.data.message, {
        type: alertMsgConstant.TOAST_SUCCESS,
      });
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
