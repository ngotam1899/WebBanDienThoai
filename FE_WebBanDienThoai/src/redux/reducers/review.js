import { get } from "lodash";
import { ReviewActionTypes } from "../actions/review";
import { toastError, toastSuccess } from '../../utils/toastHelper';

const init = {
};

export default function(state = init, action) {
  switch (action.type) {
    case ReviewActionTypes.CLEAR_DETAIL:
      return {
        ...state,
        detail: null,
      };
    case ReviewActionTypes.CLEAR_STATE:
      return {
        ...init,
      };
    case ReviewActionTypes.GET_LIST:
    case ReviewActionTypes.GET_LIST_ERROR:
    case ReviewActionTypes.GET_DETAIL:
    case ReviewActionTypes.GET_DETAIL_ERROR:
      return {
        ...state,
      };
    case ReviewActionTypes.GET_LIST_SUCCESS:
      return {
        ...state,
        list: get(action, "payload.list", []),
        total: get(action, "payload.total"),
        count: action.payload.count
      };
    case ReviewActionTypes.GET_DETAIL_SUCCESS:
      return {
        ...state,
        detail: get(action, "payload", {}),
      };
    case ReviewActionTypes.UPDATE:
      return {
        ...state,
      };
    case ReviewActionTypes.UPDATE_SUCCESS:
      //toastSuccess("Cập nhật review thành công")
      return {
        ...state,
      };
    case ReviewActionTypes.UPDATE_ERROR:
      /* eslint-disable */
      var { message } = action.payload;
      toastError(message)
      /* eslint-disable */
      return {
        ...state,
      };
    case ReviewActionTypes.CREATE:
      return {...state};
    case ReviewActionTypes.CREATE_SUCCESS:
      toastSuccess("Tạo đánh giá thành công")
      return {...state};
    case ReviewActionTypes.CREATE_ERROR:
      /* eslint-disable */
      var { message } = action.payload;
      toastError(message)
      /* eslint-disable */
      return {...state};
    default:
      return state;
  }
}
