import { get, } from "lodash";
import { GroupActionTypes } from "../actions/group";
import { toastError, toastSuccess } from "../../utils/toastHelper";

const init = {
  loading: true,
  detail: null,
  processing: false,
};

export default function (state = init, action) {
  switch (action.type) {
    case GroupActionTypes.GET_LIST:
    case GroupActionTypes.FILTER:
      return {
        ...state,
        loading: true,
      };

    case GroupActionTypes.GET_LIST_ERROR:
      return {
        ...state,
        loading: false,
      };
    case GroupActionTypes.GET_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        list: get(action, "payload", []),
      };
    case GroupActionTypes.FILTER_SUCCESS:
      return {
        ...state,
        loading: false,
        listSearch: get(action, "payload", []),
      };
    case GroupActionTypes.CLEAR_DETAIL:
      return {
        ...state,
        detail: null,
        loadingDetail: true,
      };
    case GroupActionTypes.CLEAR_STATE:
      return {
        ...init,
      };
    case GroupActionTypes.GET_DETAIL:
      return {
        ...state,
        loadingDetail: true,
        detail: null,
      };
    case GroupActionTypes.GET_DETAIL_SUCCESS:
      return {
        ...state,
        loadingDetail: false,
        detail: action.payload,
      };

    case GroupActionTypes.GET_DETAIL_ERROR:
      return {
        ...state,
        loadingDetail: false,
        detail: action.payload,
      };

    case GroupActionTypes.CREATE:
    case GroupActionTypes.UPDATE:
    case GroupActionTypes.DELETE:
      return {
        ...state,
        processing: true,
      };

    case GroupActionTypes.CREATE_ERROR:
    case GroupActionTypes.UPDATE_ERROR:
    case GroupActionTypes.DELETE_ERROR:
      var { message } = action.payload;
      toastError(message);
      return {
        ...state,
        processing: false,
      };
    case GroupActionTypes.UPDATE_SUCCESS:
      toastSuccess("Cập nhật thành công");
      return {
        ...state,
        processing: true,
      };
    case GroupActionTypes.CREATE_SUCCESS:
      toastSuccess("Tạo mới thành công");
      return {
        ...state,
        processing: true,
      };
    case GroupActionTypes.DELETE_SUCCESS:
      toastSuccess("Xóa thành công");
      return {
        ...state,
        processing: false,
      };
    default:
      return state;
  }
}
