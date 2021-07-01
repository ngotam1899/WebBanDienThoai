export const AdActionTypes = {
  GET_LIST: "GET_LIST",
  GET_LIST_SUCCESS: "GET_LIST_SUCCESS",
  GET_LIST_ERROR: "GET_LIST_ERROR",
};

Object.keys(AdActionTypes).forEach((key) => {
  AdActionTypes[
    key
  ] = `AD_${AdActionTypes[key]}`;
});

const onGetList = (payload) => ({
  type: AdActionTypes.GET_LIST,
  payload,
});

const onGetListSuccess = (payload) => ({
  type: AdActionTypes.GET_LIST_SUCCESS,
  payload,
});

const onGetListError = (error) => ({
  type: AdActionTypes.GET_LIST_ERROR,
  payload: error,
});

const AdActions = {
  onGetList,
  onGetListSuccess,
  onGetListError,
};

export default AdActions;
