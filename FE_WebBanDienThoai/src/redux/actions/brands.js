export const BrandActionTypes = {
  GET_LIST: "GET_LIST",
  GET_LIST_SUCCESS: "GET_LIST_SUCCESS",
  GET_LIST_ERROR: "GET_LIST_ERROR",

  GET_ACCESSORY: "GET_ACCESSORY",
  GET_ACCESSORY_SUCCESS: "GET_ACCESSORY_SUCCESS",
  GET_ACCESSORY_ERROR: "GET_ACCESSORY_ERROR",

  CLEAR_STATE: "CLEAR_STATE",
};

Object.keys(BrandActionTypes).forEach((key) => {
  BrandActionTypes[
    key
  ] = `BRAND_${BrandActionTypes[key]}`;
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

const onGetAccessory = (payload) => ({
  type: BrandActionTypes.GET_ACCESSORY,
  payload,
});

const onGetAccessorySuccess = (brands) => ({
  type: BrandActionTypes.GET_ACCESSORY_SUCCESS,
  payload: {brands},
});

const onGetAccessoryError = (error) => ({
  type: BrandActionTypes.GET_ACCESSORY_ERROR,
  payload: error,
});

const BrandActions = {
  onClearState,

  onGetList,
  onGetListSuccess,
  onGetListError,

  onGetAccessory,
  onGetAccessorySuccess,
  onGetAccessoryError,
};

export default BrandActions;
