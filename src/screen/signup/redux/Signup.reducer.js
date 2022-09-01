import { actionConstant } from "@/constant";

const initialState = {
  isRequesting: false,
    data: {},
    error:{}
   }
   

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case actionConstant.ACTION_GET_SIGN_UP_REQUEST: {
            return {
              ...state,
              data:{},
              isRequesting: true,
              error: {},
            };
          }
          case actionConstant.ACTION_GET_SIGN_UP_SUCCESS: {
            return {
              ...state,
              data: payload.data,
              isRequesting: false,
              error: {},
            };
          }
          case actionConstant.ACTION_GET_SIGN_UP_FAILURE: {
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
