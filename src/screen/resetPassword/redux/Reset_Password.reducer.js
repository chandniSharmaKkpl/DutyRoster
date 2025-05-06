import { actionConstant } from "@/constant";


const initialState = {
  isRequesting: false,
  error: {},
  apiBaseData: '',
  clientToken: '',
  responseAccountUrl: '',
};

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case actionConstant.ACTION_RESET_PASSWORD_REQUEST: {
            return {
              ...state,
              apiBaseData: {},
              isRequesting: true,
              error: {},
            };
          }
          case actionConstant.ACTION_RESET_PASSWORD_SUCCESS: {
            return {
              ...state,
              apiBaseData: payload,
              isRequesting: false,
              error: {},
            };
          }
          case actionConstant.ACTION_RESET_PASSWORD_FAILURE: {
            return {
              ...state,
              apiBaseData: {},
              isRequesting: false, 
              error: payload,
            };
          }
    default:
        return state
    }
}
