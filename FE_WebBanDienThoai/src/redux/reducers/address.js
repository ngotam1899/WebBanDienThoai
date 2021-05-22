import { get } from "lodash";
import { AddressActionTypes } from "../actions/address";

const init = {
  city: null,
  district: null,
  ward: null,
};

export default function(state = init, action) {
  switch (action.type) {
    case AddressActionTypes.CLEAR_STATE:
      return {
        district: null,
        ward: null,
      };
    case AddressActionTypes.GET_CITY:
      return {
        ...state,
      };
    case AddressActionTypes.GET_CITY_SUCCESS:
      return {
        ...state,
        city: get(action, "payload", []),
        district: null,
        ward: null,
      };
    case AddressActionTypes.GET_DISTRICT:
      return {
        ...state,
      };
    case AddressActionTypes.GET_DISTRICT_SUCCESS:
      return {
        ...state,
        district: get(action, "payload", []),
        ward: null,
      };
    case AddressActionTypes.CALCULATE_SHIPPING_SUCCESS:
      return {
        ...state,
        ship: action.payload
      };
    case AddressActionTypes.CALCULATE_SHIPPING:
    case AddressActionTypes.CALCULATE_SHIPPING_ERROR:
    case AddressActionTypes.GET_DISTRICT_ERROR:
    case AddressActionTypes.GET_CITY_ERROR:
    case AddressActionTypes.GET_WARD_ERROR:
    case AddressActionTypes.GET_WARD:
      return {
        ...state,
      };
    case AddressActionTypes.GET_WARD_SUCCESS:
      return {
        ...state,
        ward: get(action, "payload", []),
      };
    default:
      return state;
  }
}
