
export const AuthorizationActionTypes = {
  LOGIN : "LOGIN",
  LOGIN_SUCCESS : "LOGIN_SUCCESS",
  LOGIN_ERROR : "LOGIN_ERROR",

  REGISTER : "REGISTER",
  REGISTER_SUCCESS : "REGISTER_SUCCESS",
  REGISTER_ERROR : "REGISTER_ERROR",

  GET_PROFILE : "GET_PROFILE",
  GET_PROFILE_SUCCESS : "GET_PROFILE_SUCCESS",
  GET_PROFILE_ERROR : "GET_PROFILE_ERROR",

  LOGOUT : "LOGOUT",
}
/**
 *
 * @param {email, password} payload
 */
const onLogin = (payload) => ({
  type: AuthorizationActionTypes.LOGIN,
  payload,
});

const onLoginSuccess = (payload) => ({
  type: AuthorizationActionTypes.LOGIN_SUCCESS,
  payload,
});

const onLoginError = (error) => ({
  type: AuthorizationActionTypes.LOGIN_ERROR,
  payload: error,
});

const onGetProfile = () => ({
  type: AuthorizationActionTypes.GET_PROFILE,
});

const onGetProfileSuccess = (data) => ({
  type: AuthorizationActionTypes.GET_PROFILE_SUCCESS,
  payload: data
});

const onGetProfileError = (error) => ({
  type: AuthorizationActionTypes.GET_PROFILE_ERROR,
  payload: error,
});

const onLogout = () => ({
  type: AuthorizationActionTypes.LOGOUT,
});

const AuthorizationActions = {
  onLogin,
  onLoginSuccess,
  onLoginError,

  onGetProfile,
  onGetProfileSuccess,
  onGetProfileError,

  onLogout,
};

export default AuthorizationActions;
