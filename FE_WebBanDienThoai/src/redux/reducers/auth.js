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
    case AuthorizationActionTypes.ACTIVATE_ACCOUNT:
      return {...state};
    case AuthorizationActionTypes.ACTIVATE_ACCOUNT_SUCCESS:
      return {...state};
    case AuthorizationActionTypes.ACTIVATE_ACCOUNT_ERROR:
      return {...state};
    case AuthorizationActionTypes.LOGIN:
      return {
        ...state,
        loggedIn: false,
      };
    case AuthorizationActionTypes.LOGIN_SUCCESS:
      return {  
        ...state,
        loggedIn: true,
      };
    case AuthorizationActionTypes.LOGIN_ERROR:
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
