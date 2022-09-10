import { actionConstant, alertMsgConstant, appConstant } from "@/constant";
import { takeLatest, take, call, put, select, all } from "redux-saga/effects";
import { QRCodeCall } from "./QRCode.api";

export function* workerGetQRCodeResponse(action) {
  try {
    console.log("qrCodeParams", JSON.stringify(action.payload, null, 4));
    const qrCodeResponse = yield call(QRCodeCall, action.payload);
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
        payload: qrCodeResponse,
      });
      // alert(qrCodeResponse.message);
      if (qrCodeResponse) {
        // alert(response.data.message);
        action.payload.navigation.navigate(appConstant.ROASTER);
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
