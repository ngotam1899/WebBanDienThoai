export const SpecificationActionTypes = {
  GET_LIST: "GET_LIST",
  GET_LIST_SUCCESS: "GET_LIST_SUCCESS",
  GET_LIST_ERROR: "GET_LIST_ERROR",

  FILTER: "FILTER",
  FILTER_SUCCESS: "FILTER_SUCCESS",
}

Object.keys(SpecificationActionTypes).forEach((key) => {
  SpecificationActionTypes[
    key
  ] = `SPECIFICATION_${SpecificationActionTypes[key]}`;
});

const onGetList = (payload) => ({
  type: SpecificationActionTypes.GET_LIST,
  payload,
});

const onGetListSuccess = (payload) => ({
  type: SpecificationActionTypes.GET_LIST_SUCCESS,
  payload,
});

const onGetListError = (error) => ({
  type: SpecificationActionTypes.GET_LIST_ERROR,
  payload: error,
});



const onFilter = keyword => ({
  type: SpecificationActionTypes.FILTER,
  payload: {
    keyword,
  },
});

const onFilterSuccess = data => ({
  type: SpecificationActionTypes.FILTER_SUCCESS,
  payload: data,
});

const SpecificationActions = {
  onGetList,
  onGetListSuccess,
  onGetListError,

  onFilter,
  onFilterSuccess
};

export default SpecificationActions;
