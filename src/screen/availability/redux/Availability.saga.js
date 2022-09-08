import { actionConstant, alertMsgConstant } from "@/constant";
import { takeLatest, take, call, put, select, all } from "redux-saga/effects";
import {
  getAvailabilityApiCall,
  saveAvailabilityApiCall,
} from "./Availability.api";
import { selectorToken } from "@/screen/login/redux/Login.reducer";
import { createAvailibilityParams } from "@/utils/Availablity";
import {
  selectedAvailabilityData,
  selectorForSelectedWeek,
} from "./Availability.reducer";

export function* workerGetAvailabilityDateResponse(action) {
  try {
    const response = yield call(getAvailabilityApiCall, action.payload);
    console.log(JSON.stringify(response, null, 4));
    if (!response.success) {
      var stringCombined = "";
      let arrayTemp = Object.keys(response.error);

      for (let index = 0; index < arrayTemp.length; index++) {
        const element = arrayTemp[index];
        let element1 = response.error[element];

        if (element1.length > 0) {
          let stringTemp = element1[0];
          stringCombined = stringCombined + stringTemp.toString();
        }
      }
      toast.show(stringCombined, {
        type: alertMsgConstant.TOAST_DANGER,
      });
      yield put({
        type: actionConstant.ACTION_GET_AVAILABILITY_FAILURE,
        payload: stringCombined,
      });
    } else {
      yield put({
        type: actionConstant.ACTION_GET_AVAILABILITY_SUCCESS,
        payload: response,
      });
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: actionConstant.ACTION_GET_AVAILABILITY_FAILURE,
      payload: error,
    });
  }
}

export function* workerSaveAvailability(action) {
  try {
    const selectedData = yield select(selectedAvailabilityData);
    const selectedWeek = yield select(selectorForSelectedWeek);

    const params = createAvailibilityParams({
      selected: selectedData,
      ...selectedWeek,
    });
    // alert("workerSaveAvailability params", params);
    const saveAvailabilityRes = yield call(saveAvailabilityApiCall, params);
    yield put({
      type: actionConstant.ACTION_SAVE_AVAILABILITY_SUCCESS,
      payload: saveAvailabilityRes,
    });
    toast.show(saveAvailabilityRes.message, {
      type: alertMsgConstant.TOAST_SUCCESS,
    });
  } catch (error) {
    // alert("workerSaveAvailability error");
    toast.show(error, {
      type: alertMsgConstant.TOAST_DANGER,
    });
    yield put({
      type: actionConstant.ACTION_SAVE_AVAILABILITY_FAILURE,
      payload: error,
    });
  }
}

export function* watchGetAvailabilityDate() {
  yield takeLatest(
    actionConstant.ACTION_GET_AVAILABILITY_REQUEST,
    workerGetAvailabilityDateResponse
  );
}

export function* watchSaveAvailabilityDate() {
  yield takeLatest(
    actionConstant.ACTION_SAVE_AVAILABILITY_REQUEST,
    workerSaveAvailability
  );
}
