export const CategoryActionTypes = {
  GET_LIST: "GET_LIST",
  GET_LIST_SUCCESS: "GET_LIST_SUCCESS",
  GET_LIST_ERROR: "GET_LIST_ERROR",
};

Object.keys(CategoryActionTypes).forEach((key) => {
  CategoryActionTypes[
    key
  ] = `CATEGORY_${CategoryActionTypes[key]}`;
});

const onGetList = (payload) => ({
  type: CategoryActionTypes.GET_LIST,
  payload,
});

const onGetListSuccess = (payload) => ({
  type: CategoryActionTypes.GET_LIST_SUCCESS,
  payload,
});

const onGetListError = (error) => ({
  type: CategoryActionTypes.GET_LIST_ERROR,
  payload: error,
});

const CategoryActions = {
  onGetList,
  onGetListSuccess,
  onGetListError,
};

export default CategoryActions;
