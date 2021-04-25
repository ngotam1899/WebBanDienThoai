import { get } from "lodash";
import { ColorActionTypes } from "../actions/color";

const init = {
  loading: true,
  detail: null,
  processing: false,
};


export default function(state = init, action) {
  switch (action.type) {
    case ColorActionTypes.CLEAR_DETAIL:
      return {
        ...state,
        detail: null,
        loadingDetail: true,
      };

    case ColorActionTypes.CLEAR_STATE:
      return {
        ...init,
      };

    case ColorActionTypes.GET_LIST:
      return {
        ...state,
        loading: true,
      };
    case ColorActionTypes.GET_LIST_ERROR:
      return {
        ...state,
         loading: false,
      };

    case ColorActionTypes.GET_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        list: get(action, "payload", []),
      };

    case ColorActionTypes.GET_DETAIL:
      return {
        ...state,
        loadingDetail: true,
        detail: null,
      };

    case ColorActionTypes.GET_DETAIL_SUCCESS:
      return {
        ...state,
        loadingDetail: false,
        detail: action.payload,
      };

    case ColorActionTypes.GET_DETAIL_ERROR:
      return {
        ...state,
        loadingDetail: false,
        detail: action.payload,
      };

    case ColorActionTypes.CREATE:
    case ColorActionTypes.UPDATE:
    case ColorActionTypes.DELETE:
      return {
        ...state,
        processing: true,
      };

    case ColorActionTypes.CREATE_ERROR:
    case ColorActionTypes.UPDATE_ERROR:
    case ColorActionTypes.DELETE_ERROR:
      return {
        ...state,
        processing: false,
      };
    case ColorActionTypes.UPDATE_SUCCESS:
    case ColorActionTypes.CREATE_SUCCESS:
    case ColorActionTypes.DELETE_SUCCESS:
      return {
        ...state,
        processing: false,
      };
    default:
      return state;
  }
}
