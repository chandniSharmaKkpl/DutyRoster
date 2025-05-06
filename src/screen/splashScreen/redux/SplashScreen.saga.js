import { actionConstant, appConstant, alertMsgConstant } from "@/constant";
import { navigationRef } from "@/navigators/utils";
import { StackActions } from "@react-navigation/native";
import { takeLatest, take, call, put, select, all } from "redux-saga/effects";
import { initCall } from "./SplashScreen.api";

export function* workerInit(action) {
  try {
    const initResponse = yield call(initCall, action.payload);
    // console.log("initResponse ======", initResponse);
    if (!initResponse.success) {
      var stringCombined = "";
      let arrayTemp = Object.keys(initResponse.error);

      for (let index = 0; index < arrayTemp.length; index++) {
        const element = arrayTemp[index];
        let element1 = initResponse.error[element];

        if (element1.length > 0) {
          let stringTemp = element1[0];
          stringCombined = stringCombined + stringTemp.toString();
        }
      }
      // toast.show(stringCombined, {
      //   type: alertMsgConstant.TOAST_DANGER,
      // });
      yield put({
        type: actionConstant.ACTION_CHECK_USER_LOGIN_FAILURE,
        payload: stringCombined,
      });
      const resetAction = StackActions.replace(appConstant.LOGIN);
      navigationRef.dispatch(resetAction);
    } else {
      yield put({
        type: actionConstant.ACTION_CHECK_USER_LOGIN_SUCCESS,
        payload: initResponse,
      });
      // toast.show(initResponse.message, {
      //   type: alertMsgConstant.TOAST_SUCCESS,
      // });

      const resetAction = StackActions.replace(appConstant.HOME);
      navigationRef.dispatch(resetAction);
    }
  } catch (error) {
    console.log("=> ", error);
    yield put({
      type: actionConstant.ACTION_CHECK_USER_LOGIN_FAILURE,
      payload: error,
    });
    const resetAction = StackActions.replace(appConstant.LOGIN);
    navigationRef.dispatch(resetAction);
  }
}

export function* watchInit() {
  yield takeLatest(actionConstant.ACTION_CHECK_USER_LOGIN_REQUEST, workerInit);
}
