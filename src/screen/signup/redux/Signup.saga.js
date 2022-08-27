
import { singup } from "@/api/auth";
import { actionConstant, appConstant } from "@/constant";
import localDb from "@/database/localDb";
import { takeLatest, take, call, put, select, all } from "redux-saga/effects";

export function* workerSingup(action) {
  try {
    const signupResponse = yield call(singup, action.payload);
    console.log(signupResponse, 'signupResponse')
    yield put({
      type: actionConstant.ACTION_GET_SIGN_UP_SUCCESS,
      payload: signupResponse,
    });
   //localDb.setUser(loginResponse.data); 
     alert(signupResponse.data.message); 
     action.payload.navigation.navigate(appConstant.LOGIN); 
  } catch (error) {
    console.log(JSON.stringify(error.message.data.error_email) , 'eerrr')
    alert(JSON.stringify(error.message.data.error_email)); 
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
