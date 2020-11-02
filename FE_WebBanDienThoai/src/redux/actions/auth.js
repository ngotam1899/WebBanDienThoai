export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";

/* export const DEVICE_INIT = "DEVICE_INIT";
export const DEVICE_INIT_SUCCESS = "DEVICE_INIT_SUCCESS";
export const DEVICE_INIT_ERROR = "DEVICE_INIT_ERROR";

export const GET_PROFILE = "GET_PROFILE";
export const GET_PROFILE_SUCCESS = "GET_PROFILE_SUCCESS";
export const GET_PROFILE_ERROR = "GET_PROFILE_ERROR";

export const TOKEN_ERROR = "TOKEN_ERROR"; */
export const LOGOUT = "LOGOUT";

/**
 *
 * @param {email, password} payload
 */
export const onLogin = (payload) => ({
  type: LOGIN,
  payload,
});

export const onLoginSuccess = (payload) => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const onLoginError = (error) => ({
  type: LOGIN_ERROR,
  payload: error,
});

/* export const onDeviceInit = () => ({
  type: DEVICE_INIT,
});

export const onDeviceInitSuccess = (payload) => ({
  type: DEVICE_INIT_SUCCESS,
  payload,
});

export const onDeviceInitError = (error) => ({
  type: DEVICE_INIT_ERROR,
  payload: error,
});

export const onGetProfile = () => ({
  type: GET_PROFILE,
});

export const onGetProfileSuccess = () => ({
  type: GET_PROFILE_SUCCESS,
});

export const onGetProfileError = (error) => ({
  type: GET_PROFILE_ERROR,
  payload: error,
}); */

export const onLogout = () => ({
  type: LOGOUT,
});
