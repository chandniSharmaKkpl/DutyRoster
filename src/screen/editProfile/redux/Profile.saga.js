
import { actionConstant, appConstant } from "@/constant";
import localDb from "@/database/localDb";
import { takeLatest, take, call, put, select, all } from "redux-saga/effects";
import { ViewProfile , UpdateProfile } from "./Profile.api";

export function* workersViewProfile(action) {
  
  try {
    const viewProfileResponse = yield call(ViewProfile, action.payload);
    //  console.log(viewProfileResponse, 'viewProfileResponse')
    yield put({
      type: actionConstant.ACTION_GET_PROFILE_SUCCESS,
      payload: viewProfileResponse,
    });
   //localDb.setUser(loginResponse.data); 
     action.payload.navigation.navigate(appConstant.EDIT_PROFILE , {profileData:viewProfileResponse}); 
  } catch (error) {
    console.log(JSON.stringify(error))
    // alert("Email already associate with other user."); 
    yield put({
      type: actionConstant.ACTION_GET_PROFILE_FAILURE,
      payload: error,
    });
  }
}

export function* workersUpdateProfile(action) {
  
  try {
    console.log(action , 'action');
    const viewUpdateProfileResponse = yield call(UpdateProfile, action.payload);
    console.log(viewUpdateProfileResponse, 'viewUpdateProfileResponse')
    yield put({
      type: actionConstant.ACTION_UPDATE_PROFILE_SUCCESS,
      payload: viewUpdateProfileResponse,
    });
   //localDb.setUser(loginResponse.data); 
   action.payload.navigation.navigate(appConstant.EDIT_PROFILE , {profileData:viewUpdateProfileResponse}); 
  } catch (error) {
    console.log(JSON.stringify(error) , 'error in API')
    // alert("Email already associate with other user."); 
    yield put({
      type: actionConstant.ACTION_UPDATE_PROFILE_FAILURE,
      payload: error,
    });
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
}
