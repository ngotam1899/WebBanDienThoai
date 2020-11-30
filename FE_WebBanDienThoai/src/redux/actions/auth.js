
export const AuthorizationActionTypes = {
  LOGIN : "LOGIN",
  LOGIN_SUCCESS : "LOGIN_SUCCESS",
  LOGIN_ERROR : "LOGIN_ERROR",

  REGISTER : "REGISTER",
  REGISTER_SUCCESS : "REGISTER_SUCCESS",
  REGISTER_ERROR : "REGISTER_ERROR",

  ACTIVATE_ACCOUNT : "ACTIVATE_ACCOUNT",
  ACTIVATE_ACCOUNT_SUCCESS : "ACTIVATE_ACCOUNT_SUCCESS",
  ACTIVATE_ACCOUNT_ERROR : "ACTIVATE_ACCOUNT_ERROR",

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


const onRegister = (payload) => ({
  type: AuthorizationActionTypes.REGISTER,
  payload,
});

const onRegisterSuccess = (detail) => ({
  type: AuthorizationActionTypes.REGISTER_SUCCESS,
  payload: detail,
});

const onRegisterError = (error) => ({
  type: AuthorizationActionTypes.REGISTER_ERROR,
  payload: error,
});

const onActivateAccount = (token) => ({
  type: AuthorizationActionTypes.ACTIVATE_ACCOUNT,
  payload: token
});
const onActivateAccountSuccess = (data) => ({
  type: AuthorizationActionTypes.ACTIVATE_ACCOUNT_SUCCESS,
  payload: data
});
const onActivateAccountError = (error) => ({
  type: AuthorizationActionTypes.ACTIVATE_ACCOUNT_ERROR,
  payload: error
});

const onGetProfile = () => ({
  type: AuthorizationActionTypes.GET_PROFILE,
});

const onGetProfileSuccess = () => ({
  type: AuthorizationActionTypes.GET_PROFILE_SUCCESS,
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

  onRegister,
  onRegisterSuccess,
  onRegisterError,

  onActivateAccount,
  onActivateAccountSuccess,
  onActivateAccountError,

  onGetProfile,
  onGetProfileSuccess,
  onGetProfileError,

  onLogout,
};

export default AuthorizationActions;