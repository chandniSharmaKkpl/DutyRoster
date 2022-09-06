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
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
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
        data: payload,
        error: {},
      };
    }
    case actionConstant.ACTION_GET_ROASTER_DATE_FAILURE: {
      return {
        ...state,
        isRequesting: false,
        data: {},
        error: payload,
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

    default:
      return state;
  }
};

export const selectorForSelectedWeek = (state) =>
  state.RosterReducer.selectedWeek;
