import { actionConstant } from "@/constant";
import { takeLatest, take, call, put, select, all } from "redux-saga/effects";
import { QRCodeCall } from "./QRCode.api";

export function* workerGetQRCodeResponse(action) {
  try {
    const qrCodeResponse = yield call(QRCodeCall, action.payload);
    yield put({
      type: actionConstant.ACTION_GET_QR_CODE_SUCCESS,
      payload: qrCodeResponse,
    });
    alert(qrCodeResponse.message)
  } catch (error) {
    alert(JSON.stringify(error.message.message));
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
