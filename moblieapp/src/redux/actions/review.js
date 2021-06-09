export const ReviewActionTypes = {
  GET_LIST: "GET_LIST",
  GET_LIST_SUCCESS: "GET_LIST_SUCCESS",
  GET_LIST_ERROR: "GET_LIST_ERROR",

  GET_DETAIL: "GET_DETAIL",
  GET_DETAIL_SUCCESS: "GET_DETAIL_SUCCESS",
  GET_DETAIL_ERROR: "GET_DETAIL_ERROR",

  CREATE: "CREATE",
  CREATE_SUCCESS: "CREATE_SUCCESS",
  CREATE_ERROR: "CREATE_ERROR",

  UPDATE: "UPDATE",
  UPDATE_SUCCESS: "UPDATE_SUCCESS",
  UPDATE_ERROR: "UPDATE_ERROR",

  CLEAR_DETAIL: "CLEAR_DETAIL",
  CLEAR_STATE: "CLEAR_STATE",
};

Object.keys(ReviewActionTypes).forEach((key) => {
  ReviewActionTypes[
    key
  ] = `REVIEW_${ReviewActionTypes[key]}`;
});

const onClearDetail = () => ({
  type: ReviewActionTypes.CLEAR_DETAIL,
});

const onClearState = () => ({
  type: ReviewActionTypes.CLEAR_STATE,
});

const onGetList = (params) => ({
  type: ReviewActionTypes.GET_LIST,
  payload: params,
});

const onGetListSuccess = (list, total, count) => ({
  type: ReviewActionTypes.GET_LIST_SUCCESS,
  payload: {list, total, count}
});

const onGetListError = (error) => ({
  type: ReviewActionTypes.GET_LIST_ERROR,
  payload: error,
});

const onGetDetail = (params) => ({
  type: ReviewActionTypes.GET_DETAIL,
  payload: params,
});

const onGetDetailSuccess = (payload) => ({
  type: ReviewActionTypes.GET_DETAIL_SUCCESS,
  payload,
});

const onGetDetailError = (error) => ({
  type: ReviewActionTypes.GET_DETAIL_ERROR,
  payload: error,
});

const onCreate = (payload) => ({
  type: ReviewActionTypes.CREATE, 
  payload
});
const onCreateSuccess = (data) => ({
  type: ReviewActionTypes.CREATE_SUCCESS,
  payload: data
});
const onCreateError = (error) => ({
  type: ReviewActionTypes.CREATE_ERROR,
  payload: error
});

const onUpdate = (id, data, params) => ({
  type: ReviewActionTypes.UPDATE,
  payload: { id, data, params },
});

const onUpdateSuccess = (detail) => ({
  type: ReviewActionTypes.UPDATE_SUCCESS,
  payload: detail,
});

const onUpdateError = (error) => ({
  type: ReviewActionTypes.UPDATE_ERROR,
  payload: error,
});

const ReviewActions = {
  onClearDetail,
  onClearState,

  onGetList,
  onGetListSuccess,
  onGetListError,

  onGetDetail,
  onGetDetailSuccess,
  onGetDetailError,

  onCreate,
  onCreateSuccess,
  onCreateError,

  onUpdate,
  onUpdateSuccess,
  onUpdateError
};

export default ReviewActions;
