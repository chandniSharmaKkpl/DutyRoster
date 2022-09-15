import { actionConstant, appConstant } from "@/constant";
import { get24HrFrom12HrFormat, isArrayEmpty } from "@/utils";
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
    isSaved: false,
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
        // selected: {
        //   ...state.selected,
        //   isSaved: false,
        // },
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
        selected: {
          ...state.selected,
          isSaved: false,
        },
      };
    }
    case actionConstant.ACTION_SAVE_AVAILABILITY_SUCCESS: {
      return {
        ...state,
        isRequesting: false,
        availabilityData: payload.data,
        error: {},
        selected: {
          ...state.selected,

          // availabilityData: [
          //   { district_id: null, inTime: null, outTime: null, id: 0 },
          // ],
          isSaved: true,
        },
      };
    }
    case actionConstant.ACTION_SAVE_AVAILABILITY_FAILURE: {
      return {
        ...state,
        isRequesting: false,
        // availabilityData: payload,
        error: payload,
        selected: {
          ...state.selected,
          isSaved: false,
        },
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
      // const newAvailabilitySelectedDate = !isArrayEmpty(
      //   state.selected.availabilitySelectedDate
      // )
      //   ? state.selected.availabilitySelectedDate.concat(
      //       payload.availabilitySelectedDate
      //     )
      //   : payload.availabilitySelectedDate;
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
          isSaved: false,
          availabilitySelectedDate: payload.availabilitySelectedDate,
        },
      };
    }

    case actionConstant.ACTION_SET_SELECTED_DATES: {
      return {
        ...state,
        selected: {
          ...state.selected,
          isSaved: false,
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
          isSaved: false,
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
          isSaved: false,

          availabilityData: [...state.selected.availabilityData, payload],
        },
      };
    }
    case actionConstant.ACTION_REMOVE_AVAILABILITY: {
      return {
        ...state,
        selected: {
          ...state.selected,
          isSaved: false,

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
          isSaved: false,
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
    case actionConstant.ACTION_UPDATE_DATA_ITEM_AVAILABILITY: {
      // if(payload.)
      const { index, date } = payload;
      console.log("reducer", payload);

      return {
        ...state,
        availabilityData: {
          ...state.availabilityData,
          [date]: {
            ...state.availabilityData[date],
            times: [
              ...state.availabilityData[date].times.slice(0, index),
              {
                ...state.availabilityData[date].times[index],
                start_time: get24HrFrom12HrFormat(payload.start_time),
                end_time: get24HrFrom12HrFormat(payload.end_time),
                district: payload.district_id,
                district_id: payload.district_id,
                district_name: payload.district_name,

              },
              ...state.availabilityData[date].times.slice(index + 1),
            ],
          },
        },
      };
    }

    case actionConstant.ACTION_ON_ADD_AVAILABILITY_DATA_SUCCESS: {
      return {
        ...state,
        availabilityData: payload?.availability,
      };
    }
    case actionConstant.ACTION_RESET_AVAILABILITY_DATA: {
      return initialState;
    }

    default:
      return state;
  }
};

export const selectorForSelectedWeek = (state) =>
  state.AvailabilityReducer.selectedWeek;
export const selectedAvailabilityData = (state) =>
  state.AvailabilityReducer.selected;
export const selectordAvailabilityData = (state) =>
  state.AvailabilityReducer.availabilityData;
