import { actionConstant } from "@/constant";

const initialState = {
  isRequestingLoader: false,
  accessToken: null,
  isAuth: false,
  user: {},
  error: {},
  districts: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionConstant.ACTION_GET_ACCESS_TOKEN_REQUEST: {
      return {
        ...state,
        accessToken: {},
        isRequestingLoader: true,
        isAuth: false,
        user: {},
        districts: [],
        error: {},
      };
    }
    case actionConstant.ACTION_GET_ACCESS_TOKEN_SUCCESS: {
      return {
        ...state,
        accessToken: payload.data.token,
        user: payload.data.user,
        districts: payload.data.districts,
        isRequestingLoader: false,
        isAuth: true,
        error: {},
      };
    }
    case actionConstant.ACTION_GET_ACCESS_TOKEN_FAILURE: {
      return {
        ...state,
        accessToken: null,
        isRequestingLoader: false,
        isAuth: false,
        error: payload,
      };
    }
    case actionConstant.ACTION_SET_USER_PROFILE_HEADER: {
      return {
        ...state,
        user: payload.data,
      };
    }
    case actionConstant.ACTION_USER_LOGOUT: {
      return initialState;
    }
    default:
      return state;
  }
};

export const selectorToken = (state) => state.LoginReducer.accessToken;
export const selectedDistricts = (state) => state.LoginReducer.districts;
