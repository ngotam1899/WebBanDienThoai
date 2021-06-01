import { NotificationActionTypes } from "../actions/notification";
import { toastError } from '../../utils/toastHelper';

const init = {
  loading: true,
  detail: null,
  processing: false,
};

export default function(state = init, action) {
  switch (action.type) {
    case NotificationActionTypes.CLEAR_DETAIL:
      return {
        ...state,
        detail: null,
        loadingDetail: true,
      };
    case NotificationActionTypes.CLEAR_STATE:
      return {
        ...init,
      };
    case NotificationActionTypes.CREATE:
    case NotificationActionTypes.UPDATE:
    case NotificationActionTypes.UPDATE_ALL:
    case NotificationActionTypes.DELETE:
    case NotificationActionTypes.DELETE_ALL:
      return {
        ...state,
        loading: true,
      };
    case NotificationActionTypes.CREATE_SUCCESS:
    case NotificationActionTypes.CREATE_ERROR:
    case NotificationActionTypes.GET_LIST:
      return {...state};
    case NotificationActionTypes.GET_LIST_SUCCESS:
      return {
        ...state,
        list: action.payload,
      };
    case NotificationActionTypes.UPDATE_SUCCESS:
    case NotificationActionTypes.UPDATE_ALL_SUCCESS:
    case NotificationActionTypes.DELETE_SUCCESS:
    case NotificationActionTypes.DELETE_ALL_SUCCESS:
      return {
        ...state,
        processing: true,
      };
    case NotificationActionTypes.GET_LIST_ERROR:  
    case NotificationActionTypes.UPDATE_ERROR:
    case NotificationActionTypes.UPDATE_ALL_ERROR:  
    case NotificationActionTypes.DELETE_ERROR:  
    case NotificationActionTypes.DELETE_ALL_ERROR:
      var { message } = action.payload;
      toastError(message);
      return {
        ...state,
        processing: false,
      };
    default:
      return state;
  }
}
