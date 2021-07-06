import { BrandActionTypes } from "../actions/brands";

const init = {
  loading: true,
  detail: null,
  list: [],
};

export default function(state = init, action) {
  switch (action.type) {
    case BrandActionTypes.CLEAR_STATE:
      return {
        ...init,
      };
    case BrandActionTypes.GET_LIST:
    case BrandActionTypes.GET_ACCESSORY:
      return {
        ...state,
        loading: true,
      };
    case BrandActionTypes.GET_LIST_ERROR:
    case BrandActionTypes.GET_ACCESSORY_ERROR:
      return {
        ...state,
         loading: false,
      };

    case BrandActionTypes.GET_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case BrandActionTypes.GET_ACCESSORY_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload.brands,
      };
    default:
      return state;
  }
}
