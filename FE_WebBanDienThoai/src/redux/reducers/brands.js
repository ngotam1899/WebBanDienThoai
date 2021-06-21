import { BrandActionTypes } from "../actions/brands";

const init = {
  loading: true,
  detail: null,
  processing: false,
};

export default function(state = init, action) {
  switch (action.type) {
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
        total: action.payload.count,
        list: action.payload.brands,
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
