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

/**
 * get_list
 **/

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

/**
 *
 * @param String id
 */
const onGetDetail = (id) => ({
  type: CategoryActionTypes.GET_DETAIL,
  id,
});

const onGetDetailSuccess = (detail) => ({
  type: CategoryActionTypes.GET_DETAIL_SUCCESS,
  payload: detail,
});

const onGetDetailError = (error) => ({
  type: CategoryActionTypes.GET_DETAIL_ERROR,
  payload: error,
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
