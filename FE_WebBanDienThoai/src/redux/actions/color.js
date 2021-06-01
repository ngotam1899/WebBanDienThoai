export const ColorActionTypes = {
  GET_LIST: "GET_LIST",
  GET_LIST_SUCCESS: "GET_LIST_SUCCESS",
  GET_LIST_ERROR: "GET_LIST_ERROR",
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

const ColorActions = {
  onGetList,
  onGetListSuccess,
  onGetListError,
};

export default ColorActions;
