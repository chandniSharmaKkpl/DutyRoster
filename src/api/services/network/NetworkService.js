/*
HTTP Status Code
Informational responses (100–199)
Successful responses (200–299)
Redirects (300–399)
Client errors (400–499)
Server errors (500–599)
*/

import {client} from '../../api';
import env from '../../../env.json';
import {KeyChain, isWeb} from 'helper';
import {Offline, Constants as DBConstants, Sync} from 'database';
import NetInfo from '@react-native-community/netinfo';
import {authTokenActions} from 'screens/generic/RouteHandler/redux';
import {store} from '../../App';
import {Constants, Strings} from 'common';
import {showToast, hideToast} from 'components/widgets/Toast';
import {fetchStatusSliceActions, FetchEnumStatus} from 'reducers';
import * as apiPaths from 'database/constants';
import APIPATHS from './apiPaths';
import {getDownloadStatus} from 'database/operations/common';
import AsyncStorage from '@react-native-community/async-storage';
import {getBackgrounTaskValue} from 'utils/backgroundTask';
import {trackInsightTrace} from 'utils/applicationInsight';

let numberOfAjaxCAllPending = 0;
const apiPathsArray = Object.keys(apiPaths).map(k => {
  return {key: k, val: apiPaths[k]};
});

const filteredApiPaths = apiPathsArray.filter(p =>
  p?.key?.includes('API_PATH'),
);

const checkPaths = url => {
  const splittedUrl = url?.split('?');
  const urlToUse = splittedUrl?.length > 0 ? splittedUrl[0] : url;
  const result = filteredApiPaths.some(
    p => p?.val?.toLowerCase() === urlToUse?.toLowerCase(),
  );
  return !result && !url?.includes('sync') && !url?.includes('pull');
};

const submitDCRSkipAPIList = apiPath => {
  switch (apiPath) {
    case APIPATHS.SUBMIT_DCR:
    case APIPATHS.RCPA_SUBMIT:
    case APIPATHS.SUBMIT_PURCHASE_ORDER_DATA:
    case APIPATHS.SUBMIT_CHEMIST_END_VISIT:
    case APIPATHS.SUBMIT_NONMOVING_ORDER_DATA:
    case APIPATHS.SUBMIT_PRESENTATION_DATA:
    case APIPATHS.POST_DATA_NON_FIELD_ACTIVITY:
    case APIPATHS.POST_ALL_DOCTORS:
    case APIPATHS.MANAGER_JOURNEY_DCR:
      return true;
    default:
      return false;
  }
};

const isOfflineFirst = async apiPath => {
  if (!apiPath) {
    return false;
  }
  switch (apiPath) {
    case Constants.API_PATH.GET_PARTIES:
    case Constants.API_PATH.GET_MISSED_CALLS:
    case APIPATHS.WORKING_DAY:
    case APIPATHS.TOUR_PLAN_STATUS:
      const isSyncRunningForMtp = await AsyncStorage.getItem(
        Constants.SYNC_FOR_MTP,
      );
      if (isSyncRunningForMtp === 'true') {
        return false;
      } else {
        return true;
      }
    case APIPATHS.RAISE_UNLOCK_REQUEST:
      const isUnlockReqUpdate = await AsyncStorage.getItem(
        Constants.UNLOCK_REQ_UPDATE,
      );
      if (isUnlockReqUpdate === 'true') {
        AsyncStorage.setItem(Constants.UNLOCK_REQ_UPDATE, 'false');
        return true;
      } else {
        return false;
      }
    case APIPATHS.UPDATE_UNLOCK_REQUEST:
      const isUnlockAppUpdate = await AsyncStorage.getItem(
        Constants.UNLOCK_DEC_UPDATE,
      );
      if (isUnlockAppUpdate === 'true') {
        AsyncStorage.setItem(Constants.UNLOCK_DEC_UPDATE, 'false');
        return true;
      } else {
        return false;
      }
    case Constants.API_PATH.REMOVE_PARTY_FROM_DAILY_PLAN:
    case Constants.API_PATH.ADD_TODAY_PLAN:
    case APIPATHS.SUBMIT_DCR:
    case APIPATHS.SUBMIT_CHEMIST_END_VISIT:
    case APIPATHS.POST_DATA_NON_FIELD_ACTIVITY:
    case Constants.API_PATH.REMOVE_NFA_FROM_DAILY_PLAN:
    case APIPATHS.GET_USER_APP_SETTINGS:
    case APIPATHS.NOTIFICATION:
    case APIPATHS.ACTIVITY_TYPE:
    case APIPATHS.GET_VISIT:
    case APIPATHS.TOTAL_BRANDS:
    case APIPATHS.GET_PRODUCT:
    case APIPATHS.UPCOMING_EVENTS:
    case APIPATHS.GET_CHEMIST_DOCTOR:
    case APIPATHS.RCPA_FETCH_COMPETITORS:
    case APIPATHS.GET_PRIORITY_PRODUCT:
    case APIPATHS.RCPA_SUBMIT:
    case APIPATHS.GET_ALL_DOCTORS:
    case APIPATHS.POST_ALL_DOCTORS:
    case APIPATHS.RCPA_PERFORMANCE_CHEMIST:
    case APIPATHS.SUBMIT_PURCHASE_ORDER_DATA:
    case APIPATHS.GET_PURCHASE_ORDER_LIST:
    case APIPATHS.GET_NONMOVING_ORDER_LIST:
    case APIPATHS.GET_CHEMIST_MORE_ACTION:
    case APIPATHS.GET_SAMPLES:
    case APIPATHS.GET_ITEMS:
    case APIPATHS.GET_SENIOR:
    case APIPATHS.GET_DCR_DATA:
    case APIPATHS.SUBMIT_NONMOVING_ORDER_DATA:
    case APIPATHS.GET_DAILY_PLAN_STATUS:
    case APIPATHS.GET_DOCTOR_LIST:
    case APIPATHS.RCPA_DONE_STATUS_LIMIT_DAYS:
    case APIPATHS.GET_CHEMIST_VISIT_STATUS:
    case APIPATHS.GET_END_VISIT_DATA_OPEN_ORDERS:
    case APIPATHS.SUBMIT_NUDGES:
    case Constants.API_PATH.GET_OPEN_TASK:
    case APIPATHS.GET_CALL_REPORTINGS:
    case APIPATHS.DCR_HISTORY:
    case APIPATHS.GET_PRODUCT_LIST:
    case APIPATHS.GET_TIMELINE:
    case APIPATHS.ACTIVITY:
    case APIPATHS.GET_OTHER_LOCATION:
    case APIPATHS.GET_LOCATION:
    case APIPATHS.MEDIUM:
    case APIPATHS.POST_NON_FIELD_ACTIVITY:
    case APIPATHS.NUDGE_DATA:
    case APIPATHS.NUDGE_FEEDBACK:
    case APIPATHS.GET_TASKS:
    case APIPATHS.SUBMIT_SLIDE_SELECTION:
    case APIPATHS.SUBMIT_PRESENTATION_DATA:
    case APIPATHS.GET_EDETAILED_LIST:
    case APIPATHS.TIMESLOT_DATA:
    case APIPATHS.GET_UNLOCK_LIST:
    case APIPATHS.GET_MY_PLAN_SUBORDINATES:
    case APIPATHS.GET_SEARCH_DOCTORS:
    case APIPATHS.MANAGER_JOURNEY_DCR:
    case APIPATHS.GET_ADOPTED_PARTIES:
    case APIPATHS.GET_CORE_PARTIES:
    case APIPATHS.DELETE_PARTY_FLM:
    case APIPATHS.GET_All_SUBORDINATES:
    case APIPATHS.DELETE_PARTY_ADHOC:
    case APIPATHS.GET_ALL_EDIT:
    case APIPATHS.CHECK_HOLIDAYS_FILLED:
    case APIPATHS.DCR_FILLED_DATE:
      return true;
    default:
      return false;
  }
};

const goOnline = async apiPath => {
  if ((await isOfflineFirst(apiPath)) && !isWeb()) {
    return false;
  }
  const isConnectionAvailable = await checkInternetConnectionForApp();
  return isConnectionAvailable;
};

client.interceptors.request.use(
  config => {
    const checkPathResult = checkPaths(config.url);
    if (checkPathResult) {
      numberOfAjaxCAllPending = numberOfAjaxCAllPending + 1;
    }
    if (numberOfAjaxCAllPending > 0) {
      store.dispatch(fetchStatusSliceActions.update(FetchEnumStatus.FETCHING));
    }
    return config;
  },
  error => {
    numberOfAjaxCAllPending = numberOfAjaxCAllPending - 1;
    return Promise.reject(error);
  },
);

client.interceptors.response.use(response => {
  if (response.status === Constants.NOT_AUTHORIZED) {
    showToast({
      type: Constants.TOAST_TYPES.ALERT,
      props: {
        onClose: () => hideToast(),
        heading: Strings.sessionExpired,
      },
    });
    store.dispatch(authTokenActions.signOut());
  }
  if (checkPaths(response.config.url)) {
    if (numberOfAjaxCAllPending > 0) {
      numberOfAjaxCAllPending = numberOfAjaxCAllPending - 1;
    }
    if (numberOfAjaxCAllPending <= 0) {
      store.dispatch(fetchStatusSliceActions.update(FetchEnumStatus.SUCCESS));
    }
  }

  return response;
});

export const checkInternetConnectionForApp = async () => {
  return NetInfo.fetch().then(state => {
    if (!state.isConnected && !isWeb()) {
      return false;
    } else {
      return true;
    }
  });
};

const synchronizeDB = (response, config, apiPath) => {
  switch (config.method) {
    case 'DELETE':
      if (response.status === 200) {
        config.alreadyDeleted = true;
        Offline.offlineData(config, apiPath);
      }
      break;
    case 'POST':
      if (response.status === 200) {
        if (apiPath === APIPATHS.ADD_TODAY_PLAN) {
          config.alreadyAdded = true;
          config.response = response;
          Offline.offlineData(config, apiPath);
        }
        if (apiPath === APIPATHS.SUBMIT_DCR) {
          config.isOnline = true;
          Offline.offlineData(config, apiPath);
        }
        if (response?.config?.url === APIPATHS.DCR_SAVE_EXPENSE) {
          config.isOnline = true;
          config.response = response;
          Offline.offlineData(config, APIPATHS.GET_DAILY_PLAN_STATUS);
          Offline.offlineData(config, APIPATHS.GET_CALL_REPORTINGS);
        }
      }
      break;
    default:
      break;
  }
};

const showError = (error = {}) => {
  if (
    error?.response?.status === Constants.ERROR &&
    error?.response?.data?.details
  ) {
    const {details = []} = error?.response?.data || {};
    const errorMessage = details?.map(detail => {
      const {message = '', code = ''} = detail || {};
      // eslint-disable-next-line eqeqeq
      return message && code == Constants.SHOW_GLOBAL_WARNING_CODE
        ? message + '\n\n'
        : '';
    });

    if (errorMessage && errorMessage[0] !== '') {
      showToast({
        type: Constants.TOAST_TYPES.WARNING,
        autoHide: false,
        props: {
          heading: errorMessage,
          onClose: () => hideToast(),
        },
      });
    }
  } else if (
    error?.response?.status === Constants.FORBIDDEN_ERROR &&
    error?.response?.data?.errorCode === Constants.NO_PERMISSION
  ) {
    showToast({
      type: Constants.TOAST_TYPES.WARNING,
      autoHide: false,
      props: {
        heading: error?.response?.data?.description,
        onClose: () => hideToast(),
      },
    });
  }
};

const getNetworkResponse = async (config, apiPath) => {
  return client(config)
    .then(function (response) {
      // handle success
      if (!isWeb()) {
        synchronizeDB(response, config, apiPath);
      }
      const trackObj = {
        url: config.url,
        response: response,
        type: config.method,
      };
      if (config.method === 'POST') {
        trackInsightTrace(`Post call for api ${config.url}`, {
          ...trackObj,
          payload: config.data,
        });
      } else {
        trackInsightTrace(`Get call for api ${config.url}`, trackObj);
      }
      return response;
    })
    .catch(async error => {
      trackInsightTrace(`${config.method} api error for ${config.url}`, {
        error: error,
        payload: config.method === 'POST' ? config.data : null,
      });
      if (error?.response?.status === Constants.NOT_AUTHORIZED) {
        showToast({
          type: Constants.TOAST_TYPES.ALERT,
          props: {
            onClose: () => hideToast(),
            heading: Strings.sessionExpired,
          },
        });
        store.dispatch(authTokenActions.signOut());
      }
      if (numberOfAjaxCAllPending > 0) {
        numberOfAjaxCAllPending = numberOfAjaxCAllPending - 1;
      }
      if (numberOfAjaxCAllPending <= 0) {
        store.dispatch(fetchStatusSliceActions.update(FetchEnumStatus.SUCCESS));
      }

      showError(error);
      const validErrorCodes = [204, 400, 401, 403, 404];
      /** Go to local DB in unexpected error cases */
      if (
        !isWeb() &&
        (!error ||
          error?.code === Constants.API_TIMEOUT_ERROR ||
          !validErrorCodes?.includes(error?.response?.status))
      ) {
        return await Offline.offlineData(config, apiPath);
      }

      // handle error, based on different error code different error message can be set here
      return error.response || error.message;
    });
};

/*
Function to handle HTTP GET request
@params- for query params
*/
export const get = async (url, params = {}, apiPath = null) => {
  const accessToken = await KeyChain.getAccessToken();
  const config = {
    baseURL: env.API_HOST,
    method: 'GET',
    url,
    headers: {Authorization: `Bearer ${accessToken}`},
    params,
  };
  const shouldGoOnline = await goOnline(apiPath);
  if (accessToken && shouldGoOnline) {
    return await getNetworkResponse(config, apiPath);
  } else {
    let response = await Offline.offlineData(config, apiPath);
    return response;
  }
};

/*
Function to handle HTTP POST request
@data for passing data as body
@params- for query params
*/
export const post = async (url, data = {}, params = {}, apiPath = null) => {
  const accessToken = await KeyChain.getAccessToken();
  const config = {
    baseURL: env.API_HOST,
    method: 'POST',
    url,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    data,
    params,
  };
  const shouldGoOnline = await goOnline(apiPath);
  if (accessToken && shouldGoOnline) {
    return await getNetworkResponse(config, apiPath);
  } else {
    let response = await Offline.offlineData(config, apiPath);
    if (submitDCRSkipAPIList(apiPath)) {
      let checkOnlineStatus = await checkInternetConnectionForApp();
      let backgroundTaskStatus = await getBackgrounTaskValue();
      if (
        accessToken &&
        checkOnlineStatus &&
        backgroundTaskStatus === Constants.BACKGROUND_TASK.NOT_RUNNING
      ) {
        AsyncStorage.setItem(Constants.SYNC_APIS_IMP_ON_DCR, 'true');
        AsyncStorage.setItem(Constants.POST_API_FOR_SYNC, apiPath);
        Sync.SyncService.syncNow();
      }
    }
    return response;
  }
};

/**
 * Handle HTTP PUT request
 * @param {string} url http url of api
 * @param {object} data data to pass in body
 * @param {object} params params to pass in api call
 */
export const put = async (url, data = {}, params = {}, apiPath = null) => {
  const accessToken = await KeyChain.getAccessToken();
  const config = {
    baseURL: env.API_HOST,
    method: 'PUT',
    url,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    data,
    params,
  };

  const shouldGoOnline = await goOnline(apiPath);
  if (accessToken && shouldGoOnline) {
    return await getNetworkResponse(config, apiPath);
  } else {
    let response = await Offline.offlineData(config, apiPath);
    return response;
  }
};

/**
 * Handle HTTP DELETE request
 * @param {string} url http url of api
 * @param {object} data data to pass in body
 * @param {object} params params to pass in api call
 */
export const Delete = async (url, data = {}, params = {}, apiPath = null) => {
  const accessToken = await KeyChain.getAccessToken();
  const config = {
    baseURL: env.API_HOST,
    method: 'DELETE',
    url,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    data,
    params,
  };

  const shouldGoOnline = await goOnline(apiPath);
  if (accessToken && shouldGoOnline) {
    return await getNetworkResponse(config, apiPath);
  } else {
    let response = await Offline.offlineData(config, apiPath);
    return response;
  }
};

const NetworkService = {
  get,
  post,
  put,
  Delete,
};

export default NetworkService;
