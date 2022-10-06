import { actionConstant, alertMsgConstant } from "@/constant";
import { takeLatest, take, call, put, select, all } from "redux-saga/effects";
import {
  getAvailabilityApiCall,
  saveAvailabilityApiCall,
} from "./Availability.api";
import {
  selectedDistricts,
  selectorToken,
} from "@/screen/login/redux/Login.reducer";
import {
  addAvailibilityDataParams,
  appendAvailabilityData,
  createAvailibilityParams,
  isInOutTimeValidForAvalability,
  SET_DATA_TYPE,
} from "@/utils/Availablity";
import {
  selectedAvailabilityData,
  selectordAvailabilityData,
  selectorForSelectedWeek,
} from "./Availability.reducer";

export function* workerGetAvailabilityDateResponse(action) {
  try {
    const { params, copied } = action.payload;

    const response = yield call(getAvailabilityApiCall, params);
    let data = {};
    data = response.data;
    // console.log(JSON.stringify(response, null, 4));
    if (copied) {
      let availabilityData = yield select(selectordAvailabilityData);
      data = appendAvailabilityData({
        copiedData: availabilityData,
        existData: response.data,
        nextWeekDates: params,
        haveToMerge: false,
      });
    }
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
      if (copied) {
        yield put({
          type: actionConstant.ACTION_GET_AVAILABILITY_SUCCESS,
          payload: { data, copied },
        });
        return;
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
        payload: { data, copied },
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
    const selectedWeek = yield select(selectorForSelectedWeek);
    const availabilityData = yield select(selectordAvailabilityData);
    // const params = createAvailibilityParams({
    //   selected: selectedData,
    //   ...selectedWeek,
    // });
    const params = createAvailibilityParams({
      ...selectedWeek,
      availabilityData,
    });
    console.log(
      "workerSaveAvailability params",
      JSON.stringify(params, null, 8)
    );
    const saveAvailabilityRes = yield call(saveAvailabilityApiCall, params);
    yield put({
      type: actionConstant.ACTION_SAVE_AVAILABILITY_SUCCESS,
      payload: saveAvailabilityRes,
    });
    toast.show(saveAvailabilityRes.message, {
      type: alertMsgConstant.TOAST_SUCCESS,
    });
  } catch (error) {
    console.error(error);
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

export function* workerAddAvailabilityData(action) {
  try {
    const availabilityData = yield select(selectordAvailabilityData);
    const selected = yield select(selectedAvailabilityData);
    const selectedWeek = yield select(selectorForSelectedWeek);
    const districts = yield select(selectedDistricts);

    const data = addAvailibilityDataParams({
      selected,
      districts,
      availabilityData,
      ...selectedWeek,
    });
    yield put({
      type: actionConstant.ACTION_ON_ADD_AVAILABILITY_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    toast.show(error, {
      type: alertMsgConstant.TOAST_DANGER,
    });
  }
}

export function* workerSetDataForAvailability(action) {
  try {
    const { payload } = action;
    console.log(payload);
    const { type, data, id } = payload;
    if (
      (type === SET_DATA_TYPE.inTime || type === SET_DATA_TYPE.outTime) &&
      data
    ) {
      const { availabilityData } = yield select(selectedAvailabilityData);
      isInOutTimeValidForAvalability({
        availabilityData,
        time: data,
        id,
      });
    }
    yield put({
      type: actionConstant.ACTION_SET_DATA_ITEM_AVAILABILITY,
      payload: payload,
    });
  } catch (error) {
    // alert(error);
    toast.show(error, {
      type: alertMsgConstant.TOAST_DANGER,
    });

    console.log("ERROR => workerSetDataForAvailability =>", error);
  }
}

export function* watchGetAvailabilityDate() {
  yield takeLatest(
    actionConstant.ACTION_GET_AVAILABILITY_REQUEST,
    workerGetAvailabilityDateResponse
  );
}

export function* watchSetDataForAvailability() {
  yield takeLatest(
    actionConstant.ACTION_SET_DATA_ITEM_AVAILABILITY_REQUEST,
    workerSetDataForAvailability
  );
}

export function* watchSaveAvailabilityDate() {
  yield takeLatest(
    actionConstant.ACTION_SAVE_AVAILABILITY_REQUEST,
    workerSaveAvailability
  );
}

export function* watchAddAvailabilityData() {
  yield takeLatest(
    actionConstant.ACTION_ON_ADD_AVAILABILITY_DATA_REQUEST,
    workerAddAvailabilityData
  );
}
