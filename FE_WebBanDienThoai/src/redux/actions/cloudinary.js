export const ImagesActionTypes = {
  GET_LIST: "GET_LIST",
  GET_LIST_SUCCESS: "GET_LIST_SUCCESS",
  GET_LIST_ERROR: "GET_LIST_ERROR",

  GET_DETAIL: "GET_DETAIL",
  GET_DETAIL_SUCCESS: "GET_DETAIL_SUCCESS",
  GET_DETAIL_ERROR: "GET_DETAIL_ERROR",
};

Object.keys(ImagesActionTypes).forEach((key) => {
  ImagesActionTypes[
    key
  ] = `IMAGES_${ImagesActionTypes[key]}`;
});

const onGetList = (payload) => ({
  type: ImagesActionTypes.GET_LIST,
  payload,
});

const onGetListSuccess = (payload) => ({
  type: ImagesActionTypes.GET_LIST_SUCCESS,
  payload,
});

const onGetListError = (error) => ({
  type: ImagesActionTypes.GET_LIST_ERROR,
  payload: error,
});

const onGetDetail = (id) => ({
  type: ImagesActionTypes.GET_AN_IMAGE,
  id
});
const onGetDetailSuccess = (image) => ({
  type: ImagesActionTypes.GET_AN_IMAGE_SUCCESS,
  payload: image
});
const onGetDetailError = (error) => ({
  type: ImagesActionTypes.GET_AN_IMAGE_ERROR,
  payload: error
});

const ImagesActions = {
  onGetList,
  onGetListSuccess,
  onGetListError,

  onGetDetail,
  onGetDetailSuccess,
  onGetDetailError,
};

export default ImagesActions;
