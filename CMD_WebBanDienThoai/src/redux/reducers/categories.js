import { get } from "lodash";
import { CategoryActionTypes } from "../actions/categories";
import { toastError, toastSuccess } from '../../utils/toastHelper';

const init = {
  loading: true,
  detail: null,
  processing: false,
};

export default function(state = init, action) {
  switch (action.type) {
    case CategoryActionTypes.CLEAR_DETAIL:
      return {
        ...state,
        detail: null,
        loadingDetail: true,
      };

    case CategoryActionTypes.CLEAR_STATE:
      return {
        ...init,
      };

    case CategoryActionTypes.GET_LIST:
      return {
        ...state,
        loading: true,
      };
    case CategoryActionTypes.GET_LIST_ERROR:
      return {
        ...state,
         loading: false,
      };

    case CategoryActionTypes.GET_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        total: get(action, "payload.total"),
        list: get(action, "payload.list", []),
      };
    case CategoryActionTypes.GET_DETAIL:
    case CategoryActionTypes.GET_DETAIL_ERROR:
      return {
        ...state,
        loadingDetail: true,
        detail: null,
      };
    case CategoryActionTypes.GET_DETAIL_SUCCESS:
      return {
        ...state,
        loadingDetail: false,
        detail: action.payload,
      };
    case CategoryActionTypes.CREATE:
    case CategoryActionTypes.UPDATE:
    case CategoryActionTypes.DELETE:
      return {
        ...state,
        processing: true,
      };

    case CategoryActionTypes.CREATE_ERROR:
    case CategoryActionTypes.UPDATE_ERROR:
    case CategoryActionTypes.DELETE_ERROR:
      var { message } = action.payload;
      toastError(message);
      return {
        ...state,
        processing: false,
      };
    case CategoryActionTypes.UPDATE_SUCCESS:
      toastSuccess('Cập nhật thành công');
      return {
        ...state,
        processing: true,
        detail: action.payload
      };
    case CategoryActionTypes.CREATE_SUCCESS:
      toastSuccess('Tạo mới thành công');
      return {
        ...state,
        processing: true,
      };
    case CategoryActionTypes.DELETE_SUCCESS:
      toastSuccess('Xóa thành công');
      return {
        ...state,
        processing: false,
      };
    default:
      return state;
  }
}
