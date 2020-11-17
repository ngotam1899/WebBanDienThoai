import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
} from "../actions/auth";
/* import { LocalStorage } from "../../constants"; */

export const AuthActionState = {
  LoginSuccess: LOGIN_SUCCESS,
  LoginError: LOGIN_ERROR,
  NeedLogout: LOGOUT,
  loading: true,
};

const INITIAL_STATE = {};
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLogin: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isLogin: false,
        actionState: AuthActionState.LoginSuccess,
        ...action.payload,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        isLogin: false,
        actionState: AuthActionState.LoginError,
      };
    case LOGOUT:
      /* window.localStorage.removeItem(LocalStorage.Token);
      window.localStorage.removeItem(LocalStorage.Device); */
      return {
        ...state,
        actionState: null,
      };
    default:
      return state;
  }
}
