export const UsersActionTypes = {
  UPDATE_USER_IMAGE: "UPDATE_USER_IMAGE",
  UPDATE_USER_IMAGE_SUCCESS: "UPDATE_USER_IMAGE_SUCCESS",
  UPDATE_USER_IMAGE_ERROR: "UPDATE_USER_IMAGE_ERROR",

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

const onUpdateUserImage = ({ id, data }) => ({
  type: UsersActionTypes.UPDATE_USER_IMAGE,
  payload: { id, data },
});

const onUpdateUserImageSuccess = (detail) => ({
  type: UsersActionTypes.UPDATE_USER_IMAGE_SUCCESS,
  payload: detail,
});

const onUpdateUserImageError = (error) => ({
  type: UsersActionTypes.UPDATE_USER_IMAGE_ERROR,
  payload: error,
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
  onUpdateUserImage,
  onUpdateUserImageSuccess,
  onUpdateUserImageError,
  
  onUpdate,
  onUpdateSuccess,
  onUpdateError,

  onChangePassword,
  onChangePasswordSuccess,
  onChangePasswordError,
};

export default UsersAction;
