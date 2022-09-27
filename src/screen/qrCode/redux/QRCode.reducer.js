import { actionConstant } from "@/constant";

const initialState = {
  isRequesting: false,
  data: {},
  error: {},
  timesheet_id: null,
  location: {
    latitude: null,
    longitude: null,
  },
  signin: null,
  signup: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionConstant.ACTION_GET_QR_CODE_REQUEST: {
      return {
        ...state,
        isRequesting: true,
        data: {},
        error: {},
      };
    }
    case actionConstant.ACTION_GET_QR_CODE_SUCCESS: {
      const hasSign = payload.data?.timesheet_id ? true : false;
      return {
        ...state,
        isRequesting: false,
        data: payload.data,
        timesheet_id: payload.data.timesheet_id,
        signin: hasSign ? payload.data.signin : state.signin,
        // signup: !hasSign ? payload.data.signup : state.signup,
        error: {},
      };
    }
    case actionConstant.ACTION_GET_QR_CODE_FAILURE: {
      return {
        ...state,
        isRequesting: false,
        data: payload,
        error: {},
      };
    }

    case actionConstant.ACTION_QR_CODE_SET_LOCATION: {
      return {
        ...state,
        location: {
          latitude: payload.latitude,
          longitude: payload.longitude,
        },
      };
    }
    default:
      return state;
  }
};
