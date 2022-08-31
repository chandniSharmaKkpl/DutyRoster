import { actionConstant } from "@/constant";

const initialState = {
  isRequestingLoader: false,
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
        isRequestingLoader: true,
        isAuth: false,
        error: {},
      };
    }
    case actionConstant.ACTION_GET_ACCESS_TOKEN_SUCCESS: {
      return {
        ...state,
        accessToken: payload.data.token,
        isRequestingLoader: false,
        isAuth: true,
        error: {},
      };
    }
    case actionConstant.ACTION_GET_ACCESS_TOKEN_FAILURE: {
      return {
        ...state,
        accessToken: payload,
        isRequestingLoader: false,
        isAuth: false,
        error: {},
      };
    }
    default:
      return state;
  }
};


export const selectorToken = (state) => state.LoginReducer.accessToken;