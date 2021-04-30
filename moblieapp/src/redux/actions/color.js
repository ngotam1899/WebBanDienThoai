export const ColorActionTypes = {
  GET_LIST: "GET_LIST",
  GET_LIST_SUCCESS: "GET_LIST_SUCCESS",
  GET_LIST_ERROR: "GET_LIST_ERROR",

  GET_DETAIL: "GET_DETAIL",
  GET_DETAIL_SUCCESS: "GET_DETAIL_SUCCESS",
  GET_DETAIL_ERROR: "GET_DETAIL_ERROR",
};

Object.keys(ColorActionTypes).forEach((key) => {
  ColorActionTypes[
    key
  ] = `COLOR_${ColorActionTypes[key]}`;
});

const onGetList = (payload) => ({
  type: ColorActionTypes.GET_LIST,
  payload,
});

const onGetListSuccess = (payload) => ({
  type: ColorActionTypes.GET_LIST_SUCCESS,
  payload,
});

const onGetListError = (error) => ({
  type: ColorActionTypes.GET_LIST_ERROR,
  payload: error,
});

const onGetDetail = (id) => ({
  type: ColorActionTypes.GET_AN_IMAGE,
  id
});
const onGetDetailSuccess = (image) => ({
  type: ColorActionTypes.GET_AN_IMAGE_SUCCESS,
  payload: image
});
const onGetDetailError = (error) => ({
  type: ColorActionTypes.GET_AN_IMAGE_ERROR,
  payload: error
});

const ColorActions = {
  onGetList,
  onGetListSuccess,
  onGetListError,

  onGetDetail,
  onGetDetailSuccess,
  onGetDetailError,
};

export default ColorActions;
