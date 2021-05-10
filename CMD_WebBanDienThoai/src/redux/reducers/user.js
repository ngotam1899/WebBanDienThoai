import { get, /*  cloneDeep */ } from "lodash";
import { UsersActionTypes } from "../actions/user";

const init = {
  loading: true,
  detail: null,
  processing: false,
};

export default function(state = init, action) {
  switch (action.type) {
    case UsersActionTypes.CLEAR_DETAIL:
      return {
        ...state,
        detail: null,
        loadingDetail: true,
      };

    case UsersActionTypes.CLEAR_STATE:
      return {
        ...init,
      };

    case UsersActionTypes.GET_LIST:
    case UsersActionTypes.GET_ONLINE:
    case UsersActionTypes.GET_SESSION:
      return {
        ...state,
        loading: true,
      };
    case UsersActionTypes.GET_LIST_ERROR:
    case UsersActionTypes.GET_ONLINE_ERROR:
    case UsersActionTypes.GET_SESSION_ERROR:
      return {
        ...state,
         loading: false,
      };

    case UsersActionTypes.GET_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload.list,
        total: action.payload.total,
      };
    case UsersActionTypes.GET_ONLINE_SUCCESS:
      return {
        ...state,
        online: action.payload,
      };
    case UsersActionTypes.GET_SESSION_SUCCESS:
      return {
        ...state,
        session: action.payload,
      };
    case UsersActionTypes.GET_DETAIL:
      return {
        ...state,
        loadingDetail: true,
        detail: null,
      };

    case UsersActionTypes.GET_DETAIL_SUCCESS:
      return {
        ...state,
        loadingDetail: false,
        detail: action.payload,
      };

    case UsersActionTypes.GET_DETAIL_ERROR:
      return {
        ...state,
        loadingDetail: false,
        detail: action.payload,
      };

    case UsersActionTypes.CREATE:
    case UsersActionTypes.UPDATE_IMAGE:
    case UsersActionTypes.DELETE:
      return {
        ...state,
        processing: true,
      };

    case UsersActionTypes.CREATE_ERROR:
    case UsersActionTypes.UPDATE_IMAGE_ERROR:
    case UsersActionTypes.DELETE_ERROR:
      return {
        ...state,
        processing: false,
      };
    case UsersActionTypes.UPDATE_IMAGE_SUCCESS:
      return {
        ...state,
        processing: true,
      };
    case UsersActionTypes.CREATE_SUCCESS:
      return {
        ...state,
        loadingDetail: false,
        detail: action.payload,
      };
    case UsersActionTypes.DELETE_SUCCESS:
      return {
        ...state,
        processing: false,
      };
    default:
      return state;
  }
}
