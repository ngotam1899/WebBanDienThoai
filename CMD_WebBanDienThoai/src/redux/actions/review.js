export const ReviewActionTypes = {
  GET_LIST: "GET_LIST",
  GET_LIST_SUCCESS: "GET_LIST_SUCCESS",
  GET_LIST_ERROR: "GET_LIST_ERROR",

  DELETE: "DELETE",
  DELETE_SUCCESS: "DELETE_SUCCESS",
  DELETE_ERROR: "DELETE_ERROR",

  CLEAR_STATE: "CLEAR_STATE",
}

Object.keys(ReviewActionTypes).forEach((key) => {
  ReviewActionTypes[
    key
  ] = `REVIEW_${ReviewActionTypes[key]}`;
});

const onClearState = () => ({
  type: ReviewActionTypes.CLEAR_STATE,
});


//----------------  Get list  ----------------------

const onGetList = (payload) => ({
  type: ReviewActionTypes.GET_LIST,
  payload,
});

const onGetListSuccess = (list, total) => ({
  type: ReviewActionTypes.GET_LIST_SUCCESS,
  payload: {list, total}
});

const onGetListError = (error) => ({
  type: ReviewActionTypes.GET_LIST_ERROR,
  payload: error,
});

//----------------  Delete ----------------------

const onDelete = (id, params) => ({
  type: ReviewActionTypes.DELETE,
  id, params
});

const onDeleteSuccess = (detail) => ({
  type: ReviewActionTypes.DELETE_SUCCESS,
  payload: detail,
});

const onDeleteError = (error) => ({
  type: ReviewActionTypes.DELETE_ERROR,
  payload: error,
});

const ReviewActions = {
  onGetList,
  onGetListSuccess,
  onGetListError,

  onClearState,

  onDelete,
  onDeleteSuccess,
  onDeleteError,
};

export default ReviewActions;
