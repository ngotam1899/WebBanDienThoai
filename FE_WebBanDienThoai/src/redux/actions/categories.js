export const CategoryActionTypes = {
  GET_LIST: "GET_LIST",
  GET_LIST_SUCCESS: "GET_LIST_SUCCESS",
  GET_LIST_ERROR: "GET_LIST_ERROR",

  GET_ACCESSORY: "GET_ACCESSORY",
  GET_ACCESSORY_SUCCESS: "GET_ACCESSORY_SUCCESS",
  GET_ACCESSORY_ERROR: "GET_ACCESSORY_ERROR",

  GET_LIST_KEYWORD: "GET_LIST_KEYWORD",
  GET_LIST_KEYWORD_SUCCESS: "GET_LIST_KEYWORD_SUCCESS",
  GET_LIST_KEYWORD_ERROR: "GET_LIST_KEYWORD_ERROR",

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

const onGetAccessory = (payload) => ({
  type: CategoryActionTypes.GET_ACCESSORY,
  payload,
});

const onGetAccessorySuccess = (payload) => ({
  type: CategoryActionTypes.GET_ACCESSORY_SUCCESS,
  payload,
});

const onGetAccessoryError = (error) => ({
  type: CategoryActionTypes.GET_ACCESSORY_ERROR,
  payload: error,
});

const onGetListKeyword = (payload) => ({
  type: CategoryActionTypes.GET_LIST_KEYWORD,
  payload,
});

const onGetListKeywordSuccess = (payload) => ({
  type: CategoryActionTypes.GET_LIST_KEYWORD_SUCCESS,
  payload,
});

const onGetListKeywordError = (error) => ({
  type: CategoryActionTypes.GET_LIST_KEYWORD_ERROR,
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

  onGetAccessory,
  onGetAccessorySuccess,
  onGetAccessoryError,

  onGetListKeyword,
  onGetListKeywordSuccess,
  onGetListKeywordError,

  onGetDetail,
  onGetDetailSuccess,
  onGetDetailError,
};

export default CategoryActions;
