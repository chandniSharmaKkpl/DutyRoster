import { actionConstant } from "@/constant";


const initialState = {
    isRequesting: false,
    data: {},
    error:{}
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case actionConstant.ACTION_CHECK_USER_LOGIN_REQUEST: {
            return {
              ...state,
              data:{},
              isRequesting: true,
              error: {},
            };
          }
          case actionConstant.ACTION_CHECK_USER_LOGIN_SUCCESS: {
            return {
              ...state,
              data: payload.data,
              isRequesting: false,
              error: {},
            };
          }
          case actionConstant.ACTION_CHECK_USER_LOGIN_FAILURE: {
            return {
              ...state,
              data: payload,
              isRequesting: false,
              error: {},
            };
          }
    default:
        return state
    }
}