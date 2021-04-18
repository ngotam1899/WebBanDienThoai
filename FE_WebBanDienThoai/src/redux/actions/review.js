export const ReviewActionTypes = {
  GET_LIST: "GET_LIST",
  GET_LIST_SUCCESS: "GET_LIST_SUCCESS",
  GET_LIST_ERROR: "GET_LIST_ERROR",
};

Object.keys(ReviewActionTypes).forEach((key) => {
  ReviewActionTypes[
    key
  ] = `REVIEW_${ReviewActionTypes[key]}`;
});

const onGetList = (id) => ({
  type: ReviewActionTypes.GET_LIST,
  id,
});

const onGetListSuccess = (payload) => ({
  type: ReviewActionTypes.GET_LIST_SUCCESS,
  payload,
});

const onGetListError = (error) => ({
  type: ReviewActionTypes.GET_LIST_ERROR,
  payload: error,
});

const ReviewActions = {
  onGetList,
  onGetListSuccess,
  onGetListError,
};

export default ReviewActions;
