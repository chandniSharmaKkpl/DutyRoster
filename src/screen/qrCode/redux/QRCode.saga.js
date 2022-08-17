
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
  } catch (error) {
    alert(error);
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
