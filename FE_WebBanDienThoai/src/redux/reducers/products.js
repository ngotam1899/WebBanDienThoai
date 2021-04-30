import { get } from "lodash";
import { ProductsActionTypes } from "../actions/products";

const init = {
  detail: null,
};

export default function(state = init, action) {
  switch (action.type) {
    case ProductsActionTypes.CLEAR_DETAIL:
      return {
        detail: null,
      };

    case ProductsActionTypes.CLEAR_STATE:
      return {
        ...init,
      };
    case ProductsActionTypes.GET_LIST:
    case ProductsActionTypes.GET_LIST_ERROR:
    case ProductsActionTypes.GET_BEST_SELLER:
    case ProductsActionTypes.GET_BEST_SELLER_ERROR:
    case ProductsActionTypes.GET_FAVORITE:
    case ProductsActionTypes.GET_FAVORITE_ERROR:
    case ProductsActionTypes.GET_NEWEST:
    case ProductsActionTypes.GET_NEWEST_ERROR:
      return {
        ...state,
      };
    case ProductsActionTypes.GET_BEST_SELLER_SUCCESS:
      return {
        ...state,
        best: get(action, "payload"), 
      };
    case ProductsActionTypes.GET_FAVORITE_SUCCESS:
      return {
        ...state,
        favorite: get(action, "payload"),
      };
    case ProductsActionTypes.GET_NEWEST_SUCCESS:
      return {
        ...state,
        new: get(action, "payload"),
      };
    case ProductsActionTypes.GET_LIST_SUCCESS:
      return {
        ...state,
        total: get(action, "payload.total"),
        list: get(action, "payload.list", []), //list : action.payload.list
      };
    case ProductsActionTypes.GET_DETAIL:
      return {
        ...state,
        detail: null,
      };

    case ProductsActionTypes.GET_DETAIL_SUCCESS:
      return {
        ...state,
        detail: action.payload,
      };

    case ProductsActionTypes.GET_DETAIL_ERROR:
      return {
        ...state,
        detail: action.payload,
      };

    case ProductsActionTypes.CREATE:
    case ProductsActionTypes.UPDATE:
    case ProductsActionTypes.FILTER:
    case ProductsActionTypes.DELETE:
      return {
        ...state,
      };
    case ProductsActionTypes.CREATE_ERROR:
    case ProductsActionTypes.UPDATE_ERROR:
    case ProductsActionTypes.DELETE_ERROR:
      return {
        ...state,
      };
    case ProductsActionTypes.UPDATE_SUCCESS:
    case ProductsActionTypes.FILTER_SUCCESS:
    case ProductsActionTypes.CREATE_SUCCESS:
    case ProductsActionTypes.DELETE_SUCCESS:
      return {
        ...state,
      };
    default:
      return state;
  }
}
