import { watchGetAccessToken } from '@/screen/login/redux/Login.saga';
import {all, fork} from 'redux-saga/effects';


import {watchError} from './global.saga';

export default function* sagaRoot() {
  yield all([
    fork(watchError),
    // fork(watchGetApiBase),
    fork(watchGetAccessToken),

  ]);
}
