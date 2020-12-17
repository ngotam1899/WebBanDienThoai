export const UsersActionTypes = {
  GET_DETAIL: "GET_DETAIL",
  GET_DETAIL_SUCCESS: "GET_DETAIL_SUCCESS",
  GET_DETAIL_ERROR: "GET_DETAIL_ERROR",

  UPDATE_USER_IMAGE: "UPDATE_USER_IMAGE",
  UPDATE_USER_IMAGE_SUCCESS: "UPDATE_USER_IMAGE_SUCCESS",
  UPDATE_USER_IMAGE_ERROR: "UPDATE_USER_IMAGE_ERROR",

  GET_USER_IMAGE: "GET_USER_IMAGE",
  GET_USER_IMAGE_SUCCESS: "GET_USER_IMAGE_SUCCESS",
  GET_USER_IMAGE_ERROR: "GET_USER_IMAGE_ERROR",

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

const onGetDetail = (id) => ({
  type: UsersActionTypes.GET_DETAIL,
  id,
});

const onGetDetailSuccess = (detail) => ({
  type: UsersActionTypes.GET_DETAIL_SUCCESS,
  payload: detail,
});

const onGetDetailError = (error) => ({
  type: UsersActionTypes.GET_DETAIL_ERROR,
  payload: error,
});

const onGetUserImage = (id) => ({
  type: UsersActionTypes.GET_USER_IMAGE,
  id
});
const onGetUserImageSuccess = (image) => ({
  type: UsersActionTypes.GET_USER_IMAGE_SUCCESS,
  payload: image
});
const onGetUserImageError = (error) => ({
  type: UsersActionTypes.GET_USER_IMAGE_ERROR,
  payload: error
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

  onGetDetail,
  onGetDetailSuccess,
  onGetDetailError,

  onGetUserImage,
  onGetUserImageSuccess,
  onGetUserImageError,

  onUpdate,
  onUpdateSuccess,
  onUpdateError,

  onChangePassword,
  onChangePasswordSuccess,
  onChangePasswordError,
};

export default UsersAction;
