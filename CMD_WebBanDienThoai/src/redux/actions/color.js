export const ColorActionTypes = {
  GET_LIST: "GET_LIST",
  GET_LIST_SUCCESS: "GET_LIST_SUCCESS",
  GET_LIST_ERROR: "GET_LIST_ERROR",

  CLEAR_DETAIL: "CLEAR_DETAIL",
  CLEAR_STATE: "CLEAR_STATE",
};

Object.keys(ColorActionTypes).forEach((key) => {
  ColorActionTypes[
    key
  ] = `COLOR_${ColorActionTypes[key]}`;
});

const onClearDetail = () => ({
  type: ColorActionTypes.CLEAR_DETAIL,
});

const onClearState = () => ({
  type: ColorActionTypes.CLEAR_STATE,
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

const ColorActions = {
  onGetList,
  onGetListSuccess,
  onGetListError,

  onClearDetail,
  onClearState,
};

export default ColorActions;
