import { actionConstant } from "../../constant";
const initialState = {
  isRequesting: true,
  error: {},
  isNetworkConnected: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionConstant.ACTION_API_ERROR_REQUEST: {
      return {
        ...state,
        isRequesting: true,
        error: {},
      };
    }
    case actionConstant.ACTION_API_ERROR_SUCCESS: {
      return {
        ...state,
        isRequesting: false,
        error: payload,
      };
    }
    case actionConstant.ACTION_NETWORK_CONNECTION_CHANGE: {
      return {
        ...state,
        isNetworkConnected: payload,
      };
    }
    default:
      return state;
  }
};
export const isInternetConnected = (state) =>
  state.GlobalReducer.isNetworkConnected;

export const setNetworkConnection = (params) => {
  return {
    type: actionConstant.ACTION_NETWORK_CONNECTION_CHANGE,
    payload: params,
  };
};
