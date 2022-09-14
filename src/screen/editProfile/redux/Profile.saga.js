import { actionConstant, appConstant, alertMsgConstant } from "@/constant";
import localDb from "@/database/localDb";
import { selectorToken } from "@/screen/login/redux/Login.reducer";
import { takeLatest, take, call, put, select, all } from "redux-saga/effects";
import { ViewProfile, UpdateProfile } from "./Profile.api";

export function* workersViewProfile(action) {
  try {
    const viewProfileResponse = yield call(ViewProfile, action.payload);
    if (!viewProfileResponse.success) {
      var stringCombined = "";
      let arrayTemp = Object.keys(viewProfileResponse.error);

      for (let index = 0; index < arrayTemp.length; index++) {
        const element = arrayTemp[index];
        let element1 = viewProfileResponse.error[element];

        if (element1.length > 0) {
          let stringTemp = element1[0];
          stringCombined = stringCombined + stringTemp.toString();
        }
      }
      toast.show(stringCombined, {
        type: alertMsgConstant.TOAST_DANGER,
      });
      yield put({
        type: actionConstant.ACTION_GET_PROFILE_FAILURE,
        payload: stringCombined,
      });
    } else {
      yield put({
        type: actionConstant.ACTION_GET_PROFILE_SUCCESS,
        payload: viewProfileResponse,
      });
      action.payload.navigation.navigate(appConstant.EDIT_PROFILE, {
        profileData: viewProfileResponse,
      });
      toast.show(viewProfileResponse.message, {
        type: alertMsgConstant.TOAST_SUCCESS,
      });
    }
  } catch (error) {
    yield put({
      type: actionConstant.ACTION_GET_PROFILE_FAILURE,
      payload: error,
    });
  }
}

export function* workersUpdateProfile(action) {
  try {
    const token = yield select(selectorToken);
    const viewUpdateProfileResponse = yield call(UpdateProfile, {
      ...action.payload,
      token,
    });

    if (!viewUpdateProfileResponse.success) {
      var stringCombined = "";
      let arrayTemp = Object.keys(viewUpdateProfileResponse.error);

      for (let index = 0; index < arrayTemp.length; index++) {
        const element = arrayTemp[index];
        let element1 = viewUpdateProfileResponse.error[element];

        if (element1.length > 0) {
          let stringTemp = element1[0];
          stringCombined = stringCombined + stringTemp.toString();
        }
      }
      toast.show(stringCombined, {
        type: alertMsgConstant.TOAST_DANGER,
      });
      yield put({
        type: actionConstant.ACTION_UPDATE_PROFILE_FAILURE,
        payload: stringCombined,
      });
    } else {

      yield put({
        type: actionConstant.ACTION_UPDATE_PROFILE_SUCCESS,
        payload: viewUpdateProfileResponse,
      });
      toast.show(viewUpdateProfileResponse.message, {
        type: alertMsgConstant.TOAST_SUCCESS,
      });
    }
  } catch (error) {
    console.log("viewUpdateProfileResponse -************* -- ", error);
    yield put({
      type: actionConstant.ACTION_UPDATE_PROFILE_FAILURE,
      payload: error,
    });
  }
}
export function* workersUpdateProfileSucess(action){
  try {
    yield put({
      type: actionConstant.ACTION_SET_USER_PROFILE_HEADER,
      payload: action.payload
    });
  } catch (error) {
    
  }

}
export function* watchProfile() {
  yield takeLatest(
    actionConstant.ACTION_GET_PROFILE_REQUEST,
    workersViewProfile
  );

  yield takeLatest(
    actionConstant.ACTION_UPDATE_PROFILE_REQUEST,
    workersUpdateProfile
  );
  yield takeLatest(
    actionConstant.ACTION_UPDATE_PROFILE_SUCCESS,
    workersUpdateProfileSucess
  );
}
