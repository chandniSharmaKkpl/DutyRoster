import { actionConstant, alertMsgConstant, appConstant } from "@/constant";
import { navigate, navigationRef } from "@/navigators/utils";
import { StackActions } from "@react-navigation/native";
import { takeLatest, take, call, put, select, all } from "redux-saga/effects";
import { QRCodeCall } from "./QRCode.api";

export function* workerGetQRCodeResponse(action) {
  try {
    const qrCodeResponse = yield call(QRCodeCall, action.payload);
    console.log("qrCodeParams", JSON.stringify(qrCodeResponse, null, 4));
    if (!qrCodeResponse.success) {
      var stringCombined = "";
      let arrayTemp = Object.keys(qrCodeResponse.error);
      for (let index = 0; index < arrayTemp.length; index++) {
        const element = arrayTemp[index];
        let element1 = qrCodeResponse.error[element];

        if (element1.length > 0) {
          let stringTemp = element1[0];
          stringCombined = stringCombined + stringTemp.toString();
        }
      }
      toast.show(stringCombined, {
        type: alertMsgConstant.TOAST_DANGER,
      });
      yield put({
        type: actionConstant.ACTION_GET_QR_CODE_FAILURE,
        payload: stringCombined,
      });
    } else {
      yield put({
        type: actionConstant.ACTION_GET_QR_CODE_SUCCESS,
        payload: { ...qrCodeResponse, signin: action.payload.signin },
      });
      // alert(qrCodeResponse.message);
      if (action.payload.signout) {
        // alert(response.data.message);
        navigationRef.dispatch(StackActions.replace(appConstant.LOGIN));
      } else if (action.payload.signin) {
        navigate(appConstant.ROASTER);
      }
      toast.show(qrCodeResponse.message, {
        type: alertMsgConstant.TOAST_SUCCESS,
      });
    }
  } catch (error) {
    // alert(JSON.stringify(error.message.message));
    yield put({
      type: actionConstant.ACTION_GET_QR_CODE_FAILURE,
      payload: error,
    });
  }
}

export function* watchGetQRCodeResponse() {
  yield takeLatest(
    actionConstant.ACTION_GET_QR_CODE_REQUEST,
    workerGetQRCodeResponse
  );
}
