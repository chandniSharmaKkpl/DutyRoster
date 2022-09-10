import { actionConstant } from "@/constant";

const initialState = {
  isRequesting: false,
  data: {},
  error: {},
  timesheet_id:null,
  location: {
    latitude: null,
    longitude: null,
  },
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
      return {
        ...state,
        isRequesting: false,
        data: payload.data,
        timesheet_id: payload.data.timesheet_id,
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
