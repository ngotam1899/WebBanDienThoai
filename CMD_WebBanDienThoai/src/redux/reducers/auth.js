import { AuthorizationActionTypes } from "../actions/auth";
import { toastError, toastSuccess } from '../../utils/toastHelper';

const INITIAL_STATE = {
  loading: true,
  loggedIn: false,
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AuthorizationActionTypes.LOGIN:
      return {
        ...state,
        loggedIn: false,
      };
    case AuthorizationActionTypes.LOGIN_SUCCESS:
      toastSuccess('Đăng nhập thành công');
      return {
        ...state,
        loggedIn: true,
      };
    case AuthorizationActionTypes.LOGIN_ERROR:
      /* eslint-disable */
      var { message } = action.payload;
      toastError(message);
      /* eslint-disable */
      return {
        ...state,
        loggedIn: false,
      };
    case AuthorizationActionTypes.LOGOUT:
      return {
        ...state,
        loggedIn: false,
        detail: null,
      };
    case AuthorizationActionTypes.GET_PROFILE:
      return {
        ...state,
        loggedIn: false,
        detail: null,
      };
    case AuthorizationActionTypes.GET_PROFILE_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        detail: action.payload,
      };
    case AuthorizationActionTypes.GET_PROFILE_ERROR:
      return {
        ...state,
        detail: null,
        loggedIn: false,
      };
    default:
      return state;
  }
}
