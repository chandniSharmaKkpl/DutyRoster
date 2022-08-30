import { actionConstant, alertMsgConstant, appConstant } from "@/constant";
import { takeLatest, take, call, put, select, all } from "redux-saga/effects";
import { forgotPasswordCall } from "./Forgot_Password.api";

export function* workerForgotPassword(action) {
  try {
    const response = yield call(forgotPasswordCall, action.payload);
    if (!response.success) {
      var stringCombined = "";
      let arrayTemp = Object.keys(response.error);

      for (let index = 0; index < arrayTemp.length; index++) {
        const element = arrayTemp[index];
        element1 = response.error[element];

        if (element1.length > 0) {
          let stringTemp = element1[0];
          stringCombined = stringCombined + stringTemp.toString();
        }
      }
      toast.show(stringCombined, {
        type: alertMsgConstant.TOAST_DANGER,
      });
      yield put({
        type: actionConstant.ACTION_FORGOT_PASSWORD_FAILURE,
        payload: stringCombined,
      });
    } else {
      yield put({
        type: actionConstant.ACTION_FORGOT_PASSWORD_SUCCESS,
        payload: response,
      });
      if (action.payload.comeFrom == appConstant.FORGOT_PWD) {
        action.payload.navigation.navigate(appConstant.RESER_PWD, {
          email: action.payload.email,
        });
      }
      // alert(response.message);
      toast.show(response.message, {
        type: alertMsgConstant.TOAST_SUCCESS,
      });
    }
  } catch (error) {
    // alert(error);
    if (action.payload.comeFrom == appConstant.FORGOT_PWD) {
      action.payload.navigation.navigate(appConstant.RESER_PWD, {
        email: action.payload.email,
      });
    }

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
