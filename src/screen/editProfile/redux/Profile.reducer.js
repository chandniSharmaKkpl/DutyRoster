import { actionConstant } from "@/constant";
import { combineReducers } from "redux";

const initialState = {
  isRequesting: false,
    data: {},
    error:{},
   }
   const secondInitialState = {
    isRequesting: false,
      updatedData: {},
      error:{},
     } 

const   ViewProfileReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionConstant.ACTION_GET_PROFILE_REQUEST: {
            return {
              ...state,
              data:{},
              isRequesting: true,
              error: {},
            };
          }
          case actionConstant.ACTION_GET_PROFILE_SUCCESS: {
            return {
              ...state,
              data: payload.data,
              isRequesting: false,
              error: {},
            };
          }
          case actionConstant.ACTION_GET_PROFILE_FAILURE: {
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

const  UpdateProfileReducer = (state = secondInitialState, { type, payload }) => {
  switch (type) {
        case actionConstant.ACTION_UPDATE_PROFILE_REQUEST: {
          return {
            ...state,
            updatedData:{},
            isRequesting: true,
            error: {},
          };
        }
        case actionConstant.ACTION_UPDATE_PROFILE_SUCCESS: {
          console.log(payload , 'payload');
          return {
            ...state,
            updatedData: payload.data,
            isRequesting: false,
            error: {},
          };
        }
        case actionConstant.ACTION_UPDATE_PROFILE_FAILURE: {
          console.log(JSON.stringify(payload) , 'payload data')
          return {
            ...state,
            updatedData: payload,
            isRequesting: false,
            error: {},
          };
        }
        
  default:
      return state
  }
}

export default combineReducers({
  ViewProfileReducer,
  UpdateProfileReducer
})