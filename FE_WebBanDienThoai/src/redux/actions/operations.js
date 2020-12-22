export const OperationActionTypes = {
  GET_LIST: "GET_LIST",
  GET_LIST_SUCCESS: "GET_LIST_SUCCESS",
  GET_LIST_ERROR: "GET_LIST_ERROR",
};

Object.keys(OperationActionTypes).forEach((key) => {
  OperationActionTypes[
    key
  ] = `OPERATION_${OperationActionTypes[key]}`;
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
};

export default OperationActions;
