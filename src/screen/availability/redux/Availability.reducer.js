import { actionConstant } from "@/constant";

const initialState = {
  isRequesting: false,
  data: {},
  error: {},
  markedDates: {},
  selectedWeek: {
    data: [],
    weekStart: null,
    weekEnd: null,
  },
  arraySelectedDate:[],
  arrayCityAndTime:["1", "2"],
  arrayShift: ["1", "2"], 
  availabilityData:{}, 
  selectedDistrict:{}
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    
    case actionConstant.ACTION_SET_SELECTED_DISTRICTS:{
      return{
        ...state,
        selectedDistrict:payload
      }
    }

    // Get Availability
    case actionConstant.ACTION_GET_AVAILABILITY_REQUEST: {
      return {
        ...state,
        isRequesting: true,
        availabilityData: {},
        error: {},
      };
    }
    case actionConstant.ACTION_GET_AVAILABILITY_SUCCESS: {
      return {
        ...state,
        isRequesting: false,
        availabilityData: payload.data,
        error: {},
      };
    }
    case actionConstant.ACTION_GET_AVAILABILITY_FAILURE: {
      return {
        ...state,
        isRequesting: false,
        availabilityData: payload,
        error: {},
      };
    }

    // Save availability
    case actionConstant.ACTION_SAVE_AVAILABILITY_REQUEST: {
      return {
        ...state,
        isRequesting: true,
        availabilityData: {},
        error: {},
      };
    }
    case actionConstant.ACTION_SAVE_AVAILABILITY_SUCCESS: {
      return {
        ...state,
        isRequesting: false,
        availabilityData: payload.data,
        error: {},
      };
    }
    case actionConstant.ACTION_SAVE_AVAILABILITY_FAILURE: {
      return {
        ...state,
        isRequesting: false,
        availabilityData: payload,
        error: {},
      };
    }



    case actionConstant.ACTION_GET_ROASTER_DATE_REQUEST: {
      return {
        ...state,
        isRequesting: true,
        data: {},
        error: {},
      };
    }
    case actionConstant.ACTION_GET_ROASTER_DATE_SUCCESS: {
      return {
        ...state,
        isRequesting: false,
        data: payload.data,
        error: {},
      };
    }
    case actionConstant.ACTION_GET_ROASTER_DATE_FAILURE: {
      return {
        ...state,
        isRequesting: false,
        data: payload,
        error: {},
      };
    }
    case actionConstant.ACTION_SET_MARKED_DATES: {
      return {
        ...state,
        markedDates: payload.markedDates,
        selectedWeek: {
          ...state.selectedWeek,
          data: payload.selectedWeek,
          weekStart: payload.weekStart,
          weekEnd: payload.weekEnd,
        },
      };
    }

    case actionConstant.ACTION_SET_SELECTED_DATES: {
      return {
        ...state,
        isRequesting: false,
        arraySelectedDate: payload,
        error: {},
      };
    }

    case actionConstant.ACTION_REMOVE_SELECTED_DATES: {
      return {
        ...state,
        isRequesting: false,
        arraySelectedDate: payload,
        error: {},
      };
    }
    case actionConstant.ACTION_ADD_REMOVE_CITY_AND_TIME: {
      return {
        ...state,
        isRequesting: false,
        arrayCityAndTime: payload,
        error: {},
      };
    }



    default:
      return state;
  }
};

export const selectorForSelectedWeek = (state) =>
  state.AvailabilityReducer.selectedWeek;
