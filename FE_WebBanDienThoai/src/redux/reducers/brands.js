import { get, omit, cloneDeep } from "lodash";
import { BrandActionTypes } from "../actions/brands";

const init = {
  loading: true,
  detail: null,
  processing: false,
};

export default function(state = init, action) {
  switch (action.type) {
    case BrandActionTypes.GET_LIST:
      return {
        ...state,
        loading: true,
      };
    case BrandActionTypes.GET_LIST_ERROR:
      return {
        ...state,
         loading: false,
      };

    case BrandActionTypes.GET_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload.brands,
        total: action.payload.count
      };
    default:
      return state;
  }
}
