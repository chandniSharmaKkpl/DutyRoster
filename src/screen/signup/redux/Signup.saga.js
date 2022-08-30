
import { singup } from "@/api/auth";
import { actionConstant, appConstant , alertMsgConstant } from "@/constant";
import localDb from "@/database/localDb";
import { takeLatest, take, call, put, select, all } from "redux-saga/effects";
import { SignupCall } from "./Signup.api";
export function* workerSingup(action) {
  try {
    const signupResponse = yield call(SignupCall, action.payload);
    
    if (!signupResponse.success) {
      var stringCombined = "";
      let arrayTemp = Object.keys(signupResponse.error);

      for (let index = 0; index < arrayTemp.length; index++) {
        const element = arrayTemp[index];
        element1 = signupResponse.error[element];

        if (element1.length > 0) {
          let stringTemp = element1[0];
          stringCombined = stringCombined + stringTemp.toString();
        }
      }
      console.log(stringCombined , 'stringCombined')
      toast.show(stringCombined, {
        type: alertMsgConstant.TOAST_DANGER,
      });
      yield put({
        type: actionConstant.ACTION_GET_SIGN_UP_FAILURE,
        payload: stringCombined,
      });
    } else {
      yield put({
        type: actionConstant.ACTION_GET_SIGN_UP_SUCCESS,
        payload: signupResponse,
      });
      console.log(signupResponse.message, 'signupResponse.message')
      toast.show(signupResponse.message, {
        type: alertMsgConstant.TOAST_SUCCESS,
      });
      action.payload.navigation.navigate(appConstant.LOGIN);
    }
  } catch (error) {
    // console.log(JSON.stringify(error.message.data.error_emails) , 'eerrr')
    // alert(JSON.stringify(error.message.data.error_email)); 
    yield put({
      type: actionConstant.ACTION_GET_SIGN_UP_FAILURE,
      payload: error,
    });
  }
}

export function* watchSignup() {
  yield takeLatest(
    actionConstant.ACTION_GET_SIGN_UP_REQUEST,
    workerSingup
  );
}
