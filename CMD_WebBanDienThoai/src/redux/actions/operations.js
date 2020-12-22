export const OperationActionTypes = {
  GET_LIST: "GET_LIST",
  GET_LIST_SUCCESS: "GET_LIST_SUCCESS",
  GET_LIST_ERROR: "GET_LIST_ERROR",

  CLEAR_DETAIL: "CLEAR_DETAIL",
  CLEAR_STATE: "CLEAR_STATE",
};

Object.keys(OperationActionTypes).forEach((key) => {
  OperationActionTypes[
    key
  ] = `OPERATION_${OperationActionTypes[key]}`;
});

const onClearDetail = () => ({
  type: OperationActionTypes.CLEAR_DETAIL,
});

const onClearState = () => ({
  type: OperationActionTypes.CLEAR_STATE,
});

const onGetList = (payload) => ({
  type: OperationActionTypes.GET_LIST,
  payload,
});

const onGetListSuccess = (payload) => ({
  type: OperationActionTypes.GET_LIST_SUCCESS,
  payload,
});

const onGetListError = (error) => ({
  type: OperationActionTypes.GET_LIST_ERROR,
  payload: error,
});

const OperationActions = {
  onGetList,
  onGetListSuccess,
  onGetListError,

  onClearDetail,
  onClearState,
};

export default OperationActions;
