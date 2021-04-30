export const GroupActionTypes = {
  GET_DETAIL: "GET_DETAIL",
  GET_DETAIL_SUCCESS: "GET_DETAIL_SUCCESS",
  GET_DETAIL_ERROR: "GET_DETAIL_ERROR",

  CLEAR_DETAIL: "CLEAR_DETAIL",
  CLEAR_STATE: "CLEAR_STATE",
};

Object.keys(GroupActionTypes).forEach((key) => {
  GroupActionTypes[
    key
  ] = `GROUP_${GroupActionTypes[key]}`;
});
const onClearDetail = () => ({
  type: GroupActionTypes.CLEAR_DETAIL,
});
const onClearState = () => ({
  type: GroupActionTypes.CLEAR_STATE,
});

const onGetDetail = (id) => ({
  type: GroupActionTypes.GET_DETAIL,
  id,
});
const onGetDetailSuccess = (payload) => ({
  type: GroupActionTypes.GET_DETAIL_SUCCESS,
  payload,
});
const onGetDetailError = (error) => ({
  type: GroupActionTypes.GET_DETAIL_ERROR,
  payload: error,
});

const GroupActions = {
  onClearDetail,
  onClearState,

  onGetDetail,
  onGetDetailSuccess,
  onGetDetailError,
};

export default GroupActions;
