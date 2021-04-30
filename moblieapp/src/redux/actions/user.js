export const UsersActionTypes = {
  UPDATE: "UPDATE",
  UPDATE_SUCCESS: "UPDATE_SUCCESS",
  UPDATE_ERROR: "UPDATE_ERROR",

  CHANGE_PASSWORD: "CHANGE_PASSWORD",
  CHANGE_PASSWORD_SUCCESS: "CHANGE_PASSWORD_SUCCESS",
  CHANGE_PASSWORD_ERROR: "CHANGE_PASSWORD_ERROR",
};

Object.keys(UsersActionTypes).forEach((key) => {
  UsersActionTypes[
    key
  ] = `USER_${UsersActionTypes[key]}`;
});

const onUpdate = ({id, params }) => ({
  type: UsersActionTypes.UPDATE,
  payload: { id, params },
});

const onUpdateSuccess = (detail) => ({
  type: UsersActionTypes.UPDATE_SUCCESS,
  payload: detail,
});

const onUpdateError = (error) => ({
  type: UsersActionTypes.UPDATE_ERROR,
  payload: error,
});

const onChangePassword = (data) => ({
  type: UsersActionTypes.CHANGE_PASSWORD,
  payload: data,
});

const onChangePasswordSuccess = (detail) => ({
  type: UsersActionTypes.CHANGE_PASSWORD_SUCCESS,
  payload: detail,
});

const onChangePasswordError = (error) => ({
  type: UsersActionTypes.CHANGE_PASSWORD_ERROR,
  payload: error,
});

const UsersAction = {
  onUpdate,
  onUpdateSuccess,
  onUpdateError,

  onChangePassword,
  onChangePasswordSuccess,
  onChangePasswordError,
};

export default UsersAction;
