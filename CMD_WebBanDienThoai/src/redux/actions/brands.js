export const BrandActionTypes = {
  GET_LIST: "GET_LIST",
  GET_LIST_SUCCESS: "GET_LIST_SUCCESS",
  GET_LIST_ERROR: "GET_LIST_ERROR",

  GET_DETAIL: "GET_DETAIL",
  GET_DETAIL_SUCCESS: "GET_DETAIL_SUCCESS",
  GET_DETAIL_ERROR: "GET_DETAIL_ERROR",

  CLEAR_DETAIL: "CLEAR_DETAIL",
  CLEAR_STATE: "CLEAR_STATE",
};

Object.keys(BrandActionTypes).forEach((key) => {
  BrandActionTypes[
    key
  ] = `BRAND_${BrandActionTypes[key]}`;
});

const onClearDetail = () => ({
  type: BrandActionTypes.CLEAR_DETAIL,
});

const onClearState = () => ({
  type: BrandActionTypes.CLEAR_STATE,
});

const onGetList = (payload) => ({
  type: BrandActionTypes.GET_LIST,
  payload,
});

const onGetListSuccess = (payload) => ({
  type: BrandActionTypes.GET_LIST_SUCCESS,
  payload,
});

const onGetListError = (error) => ({
  type: BrandActionTypes.GET_LIST_ERROR,
  payload: error,
});

const onGetDetail = (id) => ({
  type: BrandActionTypes.GET_AN_IMAGE,
  id
});
const onGetDetailSuccess = (image) => ({
  type: BrandActionTypes.GET_AN_IMAGE_SUCCESS,
  payload: image
});
const onGetDetailError = (error) => ({
  type: BrandActionTypes.GET_AN_IMAGE_ERROR,
  payload: error
});

const BrandActions = {
  onGetList,
  onGetListSuccess,
  onGetListError,

  onGetDetail,
  onGetDetailSuccess,
  onGetDetailError,

  onClearDetail,
  onClearState,
};

export default BrandActions;
