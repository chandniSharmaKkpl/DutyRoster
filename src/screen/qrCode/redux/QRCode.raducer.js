import { actionConstant } from "@/constant";

const initialState = {
  isRequesting: false,
  data : {},
  error: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionConstant.ACTION_GET_QR_CODE_REQUEST: {
      return {
        ...state,
        isRequesting: true,
        data : {},
        error: {},
      };
    }
    case actionConstant.ACTION_GET_QR_CODE_SUCCESS: {
      return { 
        ...state,
        isRequesting: false,
        data: payload.data,
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
    default:
      return state;
  }
};
