import { actionConstant } from "@/constant";

const initialState = {
  isRequesting: false,
  error: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionConstant.ACTION_GET_QR_CODE_REQUEST: {
      return {
        ...state,
        isRequesting: true,
        error: {},
      };
    }
    case actionConstant.ACTION_GET_QR_CODE_SUCCESS: {
      return {
        ...state,
        isRequesting: false,
        error: {},
      };
    }
    case actionConstant.ACTION_GET_QR_CODE_FAILURE: {
      return {
        ...state,
        isRequesting: false,
        error: {},
      };
    }
    default:
      return state;
  }
};
