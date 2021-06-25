import { get } from "lodash";
import { AdActionTypes } from "../actions/ad";
import { toastError, toastSuccess } from '../../utils/toastHelper';

const init = {
  loading: true,
  detail: null,
  processing: false,
};

export default function(state = init, action) {
  switch (action.type) {
    case AdActionTypes.CLEAR_DETAIL:
      return {
        ...state,
        detail: null,
        loadingDetail: true,
      };
    case AdActionTypes.CLEAR_STATE:
      return {
        ...init,
      };
    case AdActionTypes.GET_LIST:
      return {
        ...state,
        loading: true,
      };
    case AdActionTypes.GET_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        total: get(action, "payload.total"),
        list: get(action, "payload.list", []),
      };
    case AdActionTypes.GET_DETAIL:
      return {
        ...state,
        loadingDetail: true,
        detail: null,
      };
    case AdActionTypes.GET_DETAIL_SUCCESS:
      return {
        ...state,
        loadingDetail: false,
        detail: action.payload,
      };
    case AdActionTypes.CREATE:
    case AdActionTypes.UPDATE:
    case AdActionTypes.DELETE:
      return {
        ...state,
        processing: true,
      };
    case AdActionTypes.GET_LIST_ERROR:
    case AdActionTypes.GET_DETAIL_ERROR:
    case AdActionTypes.CREATE_ERROR:
    case AdActionTypes.UPDATE_ERROR:
    case AdActionTypes.DELETE_ERROR:
      var { message } = action.payload;
      toastError(message);
      return {
        ...state,
        processing: false,
      };
    case AdActionTypes.UPDATE_SUCCESS:
      toastSuccess('Cập nhật thành công');
      return {
        ...state,
        processing: true,
      };
    case AdActionTypes.CREATE_SUCCESS:
      toastSuccess('Tạo mới thành công');
      return {
        ...state,
        processing: true,
      };
    case AdActionTypes.DELETE_SUCCESS:
      toastSuccess('Xóa thành công');
      return {
        ...state,
        processing: false,
      };
    default:
      return state;
  }
}
