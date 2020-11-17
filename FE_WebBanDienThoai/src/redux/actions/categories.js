export const CategoryActionTypes = {
  GET_LIST: "GET_LIST",
  GET_LIST_SUCCESS: "GET_LIST_SUCCESS",
  GET_LIST_ERROR: "GET_LIST_ERROR",

  GET_DETAIL: "GET_DETAIL",
  GET_DETAIL_SUCCESS: "GET_DETAIL_SUCCESS",
  GET_DETAIL_ERROR: "GET_DETAIL_ERROR",
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

const onGetDetail = (id) => ({
  type: CategoryActionTypes.GET_AN_IMAGE,
  id
});
const onGetDetailSuccess = (image) => ({
  type: CategoryActionTypes.GET_AN_IMAGE_SUCCESS,
  payload: image
});
const onGetDetailError = (error) => ({
  type: CategoryActionTypes.GET_AN_IMAGE_ERROR,
  payload: error
});

const CategoryActions = {
  onGetList,
  onGetListSuccess,
  onGetListError,

  onGetDetail,
  onGetDetailSuccess,
  onGetDetailError,
};

export default CategoryActions;
