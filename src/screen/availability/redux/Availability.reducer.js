import { actionConstant } from "@/constant";
import { isArrayEmpty } from "@/utils";
import { SET_DATA_TYPE } from "@/utils/Availablity";

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

  arrayCityAndTime: ["1", "2"],
  arrayShift: ["1", "2"],
  availabilityData: {},
  selectedDistrict: {},
  selected: {
    availabilityData: [
      { district_id: null, inTime: null, outTime: null, id: 0 },
    ],
    availabilitySelectedDate: [],
  },
  /*
  selected: {
    availabilityData: [
      {
        district_id: 1,
        inTime: "04:49 AM",
        outTime: "06:49 PM",
        id: 0,
      },
      {
        district_id: 2,
        inTime: "04:49 PM",
        outTime: "08:49 PM",
        id: "avail_1",
      },
    ],
    availabilitySelectedDate: [
      "1662316200",
      "1662402600",
      "1662489000",
      "1662575400",
      "1662661800",
      "1662748200",
      "1662834600",
    ],
  },
  */
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionConstant.ACTION_SET_SELECTED_DISTRICTS: {
      return {
        ...state,
        selectedDistrict: payload,
      };
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
        // availabilityData: {},
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
        // availabilityData: payload,
        error: payload,
      };
    }

    case actionConstant.ACTION_GET_ROASTER_DATE_REQUEST: {
      return {
        ...state,
        isRequesting: true,
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
      const newAvailabilitySelectedDate = !isArrayEmpty(
        state.selected.availabilitySelectedDate
      )
        ? state.selected.availabilitySelectedDate.concat(
            payload.availabilitySelectedDate
          )
        : payload.availabilitySelectedDate;
      return {
        ...state,
        markedDates: payload.markedDates,
        selectedWeek: {
          ...state.selectedWeek,
          data: payload.selectedWeek,
          weekStart: payload.weekStart,
          weekEnd: payload.weekEnd,
        },
        selected: {
          ...state.selected,
          availabilitySelectedDate: newAvailabilitySelectedDate,
        },
      };
    }

    case actionConstant.ACTION_SET_SELECTED_DATES: {
      return {
        ...state,
        selected: {
          ...state.selected,
          availabilitySelectedDate: [
            ...state.selected.availabilitySelectedDate,
            payload,
          ],
        },
      };
    }

    case actionConstant.ACTION_REMOVE_SELECTED_DATES: {
      return {
        ...state,
        selected: {
          ...state.selected,
          availabilitySelectedDate:
            state.selected.availabilitySelectedDate.filter(
              (_el) => _el !== payload
            ),
        },
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
    case actionConstant.ACTION_ADD_NEW_AVAILABILITY: {
      return {
        ...state,
        selected: {
          ...state.selected,
          availabilityData: [...state.selected.availabilityData, payload],
        },
      };
    }
    case actionConstant.ACTION_REMOVE_AVAILABILITY: {
      return {
        ...state,
        selected: {
          ...state.selected,
          availabilityData: state.selected.availabilityData.filter(
            (_el) => _el.id !== payload
          ),
        },
      };
    }
    case actionConstant.ACTION_SET_DATA_ITEM_AVAILABILITY: {
      // if(payload.)
      const { type, id, data } = payload;
      const index = state.selected.availabilityData.findIndex(
        (_el) => _el.id === id
      );

      return {
        ...state,
        selected: {
          ...state.selected,
          availabilityData: [
            ...state.selected.availabilityData.slice(0, index),
            {
              ...state.selected.availabilityData[index],
              [type]: data,
            },
            ...state.selected.availabilityData.slice(index + 1),
          ],
        },
      };
    }
    default:
      return state;
  }
};

export const selectorForSelectedWeek = (state) =>
  state.AvailabilityReducer.selectedWeek;
export const selectedAvailabilityData = (state) =>
  state.AvailabilityReducer.selected;
