import { actionConstant } from "@/constant";
import { takeLatest, take, call, put, select, all } from "redux-saga/effects";
import { RoasterDateRangeCall } from "./Roster.api";

export function* workerGetRoasterDateResponse(action) {
  try {
    const roasterDateRangeResponse = yield call(
      RoasterDateRangeCall,
      action.payload
    );
    // console.log('roasterDateRangeResponse',JSON.stringify(roasterDateRangeResponse, null,4));
    yield put({
      type: actionConstant.ACTION_GET_ROASTER_DATE_SUCCESS,
      payload: roasterDateRangeResponse?.data?.roaster,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: actionConstant.ACTION_GET_ROASTER_DATE_FAILURE,
      payload: error,
    });
  }
}
 
export function* watchGetRoasterDate() {
    yield takeLatest(
        actionConstant.ACTION_GET_ROASTER_DATE_REQUEST,
        workerGetRoasterDateResponse
    )
}