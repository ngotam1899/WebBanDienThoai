import { AuthorizationActionTypes } from "../actions/auth";
import {ToastAndroid} from 'react-native';

const INITIAL_STATE = {
  loading: true,
  loggedIn: false,
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AuthorizationActionTypes.REGISTER:
      return {...state};
    case AuthorizationActionTypes.REGISTER_SUCCESS:
      ToastAndroid.showWithGravity(
        "Đăng ký tài khoản thành công",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
      return {...state};
    case AuthorizationActionTypes.REGISTER_ERROR:
      var { message } = action.payload;
      ToastAndroid.showWithGravity(
        message,
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
      return {...state};
    case AuthorizationActionTypes.FORGOT_PASSWORD_ERROR:
      var { message } = action.payload;
      ToastAndroid.showWithGravity(
        message,
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
      return {...state};
    case AuthorizationActionTypes.FORGOT_PASSWORD:
      return {...state};
    case AuthorizationActionTypes.FORGOT_PASSWORD_SUCCESS:
      ToastAndroid.showWithGravity(
        "Đã gửi mail lấy lại mật khẩu",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
      return {...state}
    case AuthorizationActionTypes.ACTIVATE_PASSWORD:
      return {...state};
    case AuthorizationActionTypes.ACTIVATE_PASSWORD_ERROR:
      var { message } = action.payload;
      ToastAndroid.showWithGravity(
        message,
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
      return {...state};
    case AuthorizationActionTypes.ACTIVATE_PASSWORD_SUCCESS:
      ToastAndroid.showWithGravity(
        "Thay đổi mật khẩu thành công",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
      return {...state};
    case AuthorizationActionTypes.ACTIVATE_ACCOUNT:
      return {...state};
    case AuthorizationActionTypes.ACTIVATE_ACCOUNT_SUCCESS:
      ToastAndroid.showWithGravity(
        "Kích hoạt tài khoản thành công!",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
      return {...state};
    case AuthorizationActionTypes.ACTIVATE_ACCOUNT_ERROR:
      var { message } = action.payload;
      ToastAndroid.showWithGravity(
        message,
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
      return {...state};
    case AuthorizationActionTypes.LOGIN:
      return {
        ...state,
        loggedIn: false,
        detail: null
      };
    case AuthorizationActionTypes.LOGIN_SUCCESS:
      ToastAndroid.showWithGravity(
        "Đăng nhập thành công!",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
      return {  
        ...state,
        loggedIn: true,
        detail: action.payload,
      };
    case AuthorizationActionTypes.LOGIN_ERROR:
      var { message } = action.payload;
      ToastAndroid.showWithGravity(
        message,
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
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
      ToastAndroid.showWithGravity(
        "Đăng nhập thành công!",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
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
        data: null
      };
    case AuthorizationActionTypes.LOGIN_GOOGLE_SUCCESS:
      ToastAndroid.showWithGravity(
        "Đăng nhập thành công!",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
      return {  
        ...state,
        loggedIn: true,
        data: action.payload
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
