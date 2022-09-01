import {takeLatest, take, call, put, select, all} from 'redux-saga/effects';
import {actionConstant, apiConstant, appConstant, errorCodeConstant} from '../../constant';


export function* workerHandleError(errorParam) {
    try {
         yield put({
          type: actionConstant.ACTION_API_ERROR_SUCCESS,
          payload: errorParam,
        });
    } catch (error) {
        //console.log(" root saga error ---", error); 

    }
}

export function* watchError(errorParam) {
    yield takeLatest(
      actionConstant.ACTION_API_ERROR_REQUEST,
      workerHandleError
    );
  }
  export default watchError;