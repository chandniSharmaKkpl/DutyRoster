import { actionConstant } from "@/constant";

const initialState = {
  isRequesting: false,
  data: {},
  error: {},
  markedDates: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionConstant.ACTION_GET_ROASTER_DATE_REQUEST: {
      return {
        ...state,
        isRequesting: true,
        data: {},
        error: {},
      };
    }
    case actionConstant.ACTION_GET_ROASTER_DATE_SUCCESS: {
      return {
        ...state,
        isRequesting: false,
        data: payload.data,
        error: {},
      };
    }
    case actionConstant.ACTION_GET_ROASTER_DATE_FAILURE: {
      return {
        ...state,
        isRequesting: false,
        data: payload,
        error: {},
      };
    }
    case actionConstant.ACTION_SET_MARKED_DATES: {
      return {
        ...state,
        markedDates: payload,
      };
    }
    default:
      return state;
  }
};
