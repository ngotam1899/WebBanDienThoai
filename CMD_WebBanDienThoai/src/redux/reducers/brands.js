import { get } from "lodash";
import { BrandActionTypes } from "../actions/brands";
import { toastError, toastSuccess } from '../../utils/toastHelper';

const init = {
};

export default function(state = init, action) {
  switch (action.type) {
    case BrandActionTypes.CLEAR_DETAIL:
      return {
        ...state,
        detail: null,
      };
    case BrandActionTypes.CLEAR_STATE:
      return {
        ...init,
      };
    case BrandActionTypes.GET_LIST:
      return {
        ...state,
      };
    case BrandActionTypes.GET_LIST_ERROR:
      return {
        ...state,
      };
    case BrandActionTypes.GET_LIST_SUCCESS:
      return {
        ...state,
        list: get(action, "payload", []),
      };
    case BrandActionTypes.GET_DETAIL:
      return {
        ...state,
        detail: null,
      };
    case BrandActionTypes.GET_DETAIL_SUCCESS:
      return {
        ...state,
        detail: action.payload,
      };

    case BrandActionTypes.GET_DETAIL_ERROR:
      return {
        ...state,
        detail: action.payload,
      };

    case BrandActionTypes.CREATE:
    case BrandActionTypes.UPDATE:
    case BrandActionTypes.DELETE:
      return {
        ...state,
        processing: true,
      };
    case BrandActionTypes.CREATE_ERROR:
    case BrandActionTypes.UPDATE_ERROR:
    case BrandActionTypes.DELETE_ERROR:
      var { message } = action.payload;
      toastError(message);
      return {
        ...state,
      };
    case BrandActionTypes.UPDATE_SUCCESS:
      toastSuccess('Cập nhật thành công');
      return {
        ...state,
      };

    case BrandActionTypes.CREATE_SUCCESS:
      toastSuccess('Tạo mới thành công');
      return {
        ...state,
      };
    case BrandActionTypes.DELETE_SUCCESS:
      toastSuccess('Xóa thành công');
      return {
        ...state,
      };
    default:
      return state;
  }
}
