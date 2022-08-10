import { actionConstant,appConstant } from "@/constant";
import { takeLatest, take, call, put, select, all } from "redux-saga/effects";
import { forgotPasswordCall } from "./Forgot_Password.api";

export function* workerForgotPassword(action) {

  try {
    const response = yield call(forgotPasswordCall, action.payload);
   console.log(" response msg ---", response); 
    yield put({
      type: actionConstant.ACTION_FORGOT_PASSWORD_SUCCESS,
      payload: response,
    });
    if (action.payload.comeFrom == appConstant.FORGOT_PWD ) {
      action.payload.navigation.navigate(appConstant.RESER_PWD, {"email": action.payload.email});
    }
    alert(response.message)
  } catch (error) {
    alert(error)
    if (action.payload.comeFrom == appConstant.FORGOT_PWD ) {
      action.payload.navigation.navigate(appConstant.RESER_PWD, {"email": action.payload.email});
    }
    alert(response.message)

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
