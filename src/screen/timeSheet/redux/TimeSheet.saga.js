import { actionConstant } from "@/constant";
import { takeLatest, take, call, put, select, all } from "redux-saga/effects";
import { TimeSheetDateRangeCall } from "./TimeSheet.api";

export function* workerGetTimeSheetDateResponse(action) {
  try {
    const timeSheetDateRangeResponse = yield call(
      TimeSheetDateRangeCall,
      action.payload
    );
    // console.log('timeSheetDateRangeResponse',JSON.stringify(timeSheetDateRangeResponse, null,4));
    yield put({
      type: actionConstant.ACTION_GET_TIMESHEET_DATE_SUCCESS,
      payload: timeSheetDateRangeResponse?.data,
    });
  } catch (error) {
    console.log("SAGA error", error.status);
    yield put({
      type: actionConstant.ACTION_GET_TIMESHEET_DATE_FAILURE,
      payload: error,
    });
  }
}

export function* watchGetTimeSheetDate() {
  yield takeLatest(
    actionConstant.ACTION_GET_TIMESHEET_DATE_REQUEST,
    workerGetTimeSheetDateResponse
  );
}
