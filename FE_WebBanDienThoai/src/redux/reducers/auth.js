import { AuthorizationActionTypes } from "../actions/auth";
import { toastError, toastSuccess } from '../../utils/toastHelper';

const INITIAL_STATE = {
  loading: true,
  loggedIn: false,
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AuthorizationActionTypes.REGISTER:
      return {...state};
    case AuthorizationActionTypes.REGISTER_SUCCESS:
      toastSuccess('Đăng ký thành công');
      return {...state};
    case AuthorizationActionTypes.REGISTER_ERROR:
    case AuthorizationActionTypes.FORGOT_PASSWORD_ERROR:
    case AuthorizationActionTypes.ACTIVATE_ACCOUNT_ERROR:
    case AuthorizationActionTypes.ACTIVATE_PASSWORD_ERROR:
      var { message } = action.payload;
      toastError(message);
      return {...state};
    case AuthorizationActionTypes.ACTIVATE_PASSWORD:
    case AuthorizationActionTypes.ACTIVATE_ACCOUNT:
    case AuthorizationActionTypes.FORGOT_PASSWORD:
      return {...state};
    case AuthorizationActionTypes.ACTIVATE_ACCOUNT_SUCCESS:
      toastSuccess('Xác nhận thành công! Chọn "Đăng nhập" để tiếp tục!');
      return {...state};
    case AuthorizationActionTypes.ACTIVATE_PASSWORD_SUCCESS:
      toastSuccess('Thay đổi mật khẩu thành công');
      return {...state};
    case AuthorizationActionTypes.FORGOT_PASSWORD_SUCCESS:
      toastSuccess('Đã gửi mail đặt lại mật khẩu');
      return {...state};
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
      var { message } = action.payload;
      toastError(message);
      return {
        ...state,
        loggedIn: false,
      };
    case AuthorizationActionTypes.LOGIN_FACEBOOK:
      return {
        ...state,
        loggedIn: false,
      };
    case AuthorizationActionTypes.LOGIN_FACEBOOK_SUCCESS:
      toastSuccess('Đăng nhập thành công');
      return {  
        ...state,
        loggedIn: true,
      };
    case AuthorizationActionTypes.LOGIN_FACEBOOK_ERROR:
      return {
        ...state,
        loggedIn: false,
      };
    case AuthorizationActionTypes.LOGIN_GOOGLE:
      return {
        ...state,
        loggedIn: false,
      };
    case AuthorizationActionTypes.LOGIN_GOOGLE_SUCCESS:
      toastSuccess('Đăng nhập thành công');
      return {  
        ...state,
        loggedIn: true,
      };
    case AuthorizationActionTypes.LOGIN_GOOGLE_ERROR:
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
