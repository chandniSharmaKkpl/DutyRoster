import {actionConstant} from '../../constant';

const initialState = {
  isRequesting: false,
  error: {},
  apiBaseData: '',
  clientToken: '',
  responseAccountUrl: '',
};

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case actionConstant.ACTION_GET_API_BASE_REQUEST: {
            return {
              ...state,
              apiBaseData: {},
              isRequesting: true,
              error: {},
            };
          }
          case actionConstant.ACTION_GET_API_BASE_SUCCESS: {
            return {
              ...state,
              apiBaseData: payload,
              isRequesting: false,
              error: {},
            };
          }
          case actionConstant.ACTION_GET_API_BASE_FAILURE: {
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
