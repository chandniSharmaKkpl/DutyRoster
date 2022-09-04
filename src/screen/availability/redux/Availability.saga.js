import { actionConstant } from "@/constant";
import { takeLatest, take, call, put, select, all } from "redux-saga/effects";
import { RoasterDateRangeCall } from "./Availability.api";

export function* workerGetAvailabilityDateResponse(action) {
  try {
    const roasterDateRangeResponse = yield call(
      RoasterDateRangeCall,
      action.payload
    );
    yield put({
      type: actionConstant.ACTION_GET_ROASTER_DATE_SUCCESS,
      payload: roasterDateRangeResponse,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: actionConstant.ACTION_GET_ROASTER_DATE_FAILURE,
      payload: error,
    });
  }
}
 
export function* watchGetAvailabilityDate() {
    yield takeLatest(
        actionConstant.ACTION_GET_ROASTER_DATE_REQUEST,
        workerGetAvailabilityDateResponse
    )
}

export function* watchSetSelectedDate() {
  yield takeLatest(
      actionConstant.ACTION_SET_SELECTED_DATES,
      workerSetSelectedDateResponse
  )
}

export function* watchRemoveSelectedDate() {
    yield takeLatest(
        actionConstant.ACTION_REMOVE_SELECTED_DATES,
        workerRemoveSelectedDateResponse
    )
}