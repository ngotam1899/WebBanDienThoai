import { get } from "lodash";
import { CategoryActionTypes } from "../actions/categories";

const init = {
  loading: true,
  detail: null,
  processing: false,
};

export default function(state = init, action) {
  switch (action.type) {
    case CategoryActionTypes.GET_LIST:
    case CategoryActionTypes.GET_LIST_KEYWORD:
    case CategoryActionTypes.GET_DETAIL:
    case CategoryActionTypes.GET_ACCESSORY:
      return {
        ...state,
        loading: true,
      };
    case CategoryActionTypes.GET_LIST_ERROR:
      return {
        ...state,
         loading: false,
         list: null
      };
    case CategoryActionTypes.GET_LIST_KEYWORD_ERROR:
      return {
        ...state,
        loading: false,
        search: null
      };
    case CategoryActionTypes.GET_ACCESSORY_ERROR:
      return {
        ...state,
        loading: false,
        accessories: null
      };
    case CategoryActionTypes.GET_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        list: get(action, "payload", []), // list: action.payload
      };
    case CategoryActionTypes.GET_DETAIL_ERROR:
      return {
        ...state,
        loadingDetail: true,
        detail: null,
      };
    case CategoryActionTypes.GET_DETAIL_SUCCESS:
      return {
        ...state,
        loadingDetail: false,
        detail: action.payload,
      };
    case CategoryActionTypes.GET_LIST_KEYWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        search: action.payload
      };
    case CategoryActionTypes.GET_ACCESSORY_SUCCESS:
      return {
        ...state,
        loading: false,
        accessories: get(action, "payload", [])
      };
    default:
      return state;
  }
}