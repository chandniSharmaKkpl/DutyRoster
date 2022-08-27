import { actionConstant } from "@/constant";

const initialState = {
  isRequesting: false,
  accessToken: null,
  isAuth: false,
  error: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionConstant.ACTION_GET_ACCESS_TOKEN_REQUEST: {
      return {
        ...state,
        accessToken: {},
        isRequesting: true,
        isAuth: false,
        error: {},
      };
    }
    case actionConstant.ACTION_GET_ACCESS_TOKEN_SUCCESS: {
      return {
        ...state,
        accessToken: payload.data.token,
        isRequesting: false,
        isAuth: true,
        error: {},
      };
    }
    case actionConstant.ACTION_GET_ACCESS_TOKEN_FAILURE: {
      return {
        ...state,
        accessToken: payload.error,
        isRequesting: false,
        isAuth: false,
        error: {},
      };
    }
    default:
      return state;
  }
};
