import { AuthorizationActionTypes } from "../actions/auth";

const INITIAL_STATE = {
  loading: true,
  loggedIn: false,
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AuthorizationActionTypes.REGISTER:
      return {...state};
    case AuthorizationActionTypes.REGISTER_SUCCESS:
      return {...state};
    case AuthorizationActionTypes.REGISTER_ERROR:
      return {...state};
    case AuthorizationActionTypes.FORGOT_PASSWORD_ERROR:
    case AuthorizationActionTypes.FORGOT_PASSWORD_SUCCESS:
    case AuthorizationActionTypes.FORGOT_PASSWORD_SUCCESS:
      return {...state}
    case AuthorizationActionTypes.ACTIVATE_PASSWORD:
    case AuthorizationActionTypes.ACTIVATE_PASSWORD_ERROR:
    case AuthorizationActionTypes.ACTIVATE_PASSWORD_SUCCESS:
      return {...state};
    case AuthorizationActionTypes.ACTIVATE_ACCOUNT:
    case AuthorizationActionTypes.ACTIVATE_ACCOUNT_SUCCESS:
    case AuthorizationActionTypes.ACTIVATE_ACCOUNT_ERROR:
      return {...state};
    case AuthorizationActionTypes.LOGIN:
      console.log('1')
      return {
        ...state,
        loggedIn: false,
        detail: null
      };
    case AuthorizationActionTypes.LOGIN_SUCCESS:
      console.log('2')
      return {  
        ...state,
        loggedIn: true,
        detail: action.payload,
      };
    case AuthorizationActionTypes.LOGIN_ERROR:
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
      console.log('on success');
      return {
        ...state,
        loggedIn: false,
        data: null
      };
    case AuthorizationActionTypes.LOGIN_GOOGLE_SUCCESS:
      console.log('login success');
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
