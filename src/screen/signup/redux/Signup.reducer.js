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
            console.log(payload , 'payload');
            return {
              ...state,
              data: payload.data,
              isRequesting: false,
              error: {},
            };
          }
          case actionConstant.ACTION_GET_SIGN_UP_FAILURE: {
            console.log(JSON.stringify(payload) , 'payload data')
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
