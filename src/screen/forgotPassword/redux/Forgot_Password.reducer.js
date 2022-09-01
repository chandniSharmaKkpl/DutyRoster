import { actionConstant } from "@/constant";

const initialState = {
    isRequesting: false,
    accessToken: null,
    error:{}
   }
   

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case actionConstant.ACTION_FORGOT_PASSWORD_REQUEST: {
            return {
              ...state,
              accessToken:{},
              isRequesting: true,
              error: {},
            };
          }
          case actionConstant.ACTION_FORGOT_PASSWORD_SUCCESS: {
            return {
              ...state,
              accessToken: payload,
              isRequesting: false,
              error: {},
            };
          }
          case actionConstant.ACTION_FORGOT_PASSWORD_FAILURE: {
            return {
              ...state,
              accessToken: payload.error,
              isRequesting: false,
              error: {},
            };
          }
    default:
        return state
    }
}
