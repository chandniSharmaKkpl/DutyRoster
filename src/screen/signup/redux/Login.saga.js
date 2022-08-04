import {takeLatest, take, call, put, select, all} from 'redux-saga/effects';
import {actionConstant, apiConstant, appConstant} from '../../constant';
import {getJourneyDetail} from './JourneyDetail.api';
import {isError} from '../../common';

export function* workerGetJourneyDetail(argumentData ) {

    try {
          
      const journeyDetailResponse = yield call(getJourneyDetail,argumentData.payload);
     
      if (isError(journeyDetailResponse)) {
        yield put({
          type: actionConstant.ACTION_GET_DETAIL_OF_ITINARY_FAILURE,
          payload: journeyDetailResponse.message
        })
        return; 
      }
  
      console.log( 'Sagag journe', journeyDetailResponse,' jorney detail  in saga -======>>>>>>' );

      yield put({
        type: actionConstant.ACTION_GET_DETAIL_OF_ITINARY_SUCCESS,
        payload: journeyDetailResponse,
      });
  
      
    } catch (error) {
      yield put({
        type: actionConstant.ACTION_GET_DETAIL_OF_ITINARY_FAILURE,
        payload: error,
      });
    }
  }

export function* watchJourneyDetail () {
    yield takeLatest(
        actionConstant.ACTION_GET_DETAIL_OF_ITINARY_REQUEST,
        workerGetJourneyDetail,        
      )
  }

  export default watchJourneyDetail;
  