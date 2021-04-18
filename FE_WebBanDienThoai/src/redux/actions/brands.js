export const BrandActionTypes = {
  GET_LIST: "GET_LIST",
  GET_LIST_SUCCESS: "GET_LIST_SUCCESS",
  GET_LIST_ERROR: "GET_LIST_ERROR"
};

Object.keys(BrandActionTypes).forEach((key) => {
  BrandActionTypes[
    key
  ] = `BRAND_${BrandActionTypes[key]}`;
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


const BrandActions = {
  onGetList,
  onGetListSuccess,
  onGetListError,
};

export default BrandActions;
