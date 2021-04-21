import { get, /*  cloneDeep */ } from "lodash";
import { ProductsActionTypes } from "../actions/products";
import { toastError, toastSuccess } from '../../utils/toastHelper';

const init = {
  loading: true,
  detail: null,
  processing: false,
};

export default function(state = init, action) {
  switch (action.type) {
    case ProductsActionTypes.CLEAR_DETAIL:
      return {
        ...state,
        detail: null,
        loadingDetail: true,
      };

    case ProductsActionTypes.CLEAR_STATE:
      return {
        ...init,
      };
    case ProductsActionTypes.FILTER:
    case ProductsActionTypes.GET_LIST:
      return {
        ...state,
        loading: true,
      };
    case ProductsActionTypes.GET_LIST_ERROR:
      return {
        ...state,
         loading: false,
      };

    case ProductsActionTypes.GET_LIST_SUCCESS:
      return {
        ...state,
        total: get(action, "payload.total"),
        list: get(action, "payload.list", []),
      };

    case ProductsActionTypes.GET_DETAIL:
      return {
        ...state,
        loadingDetail: true,
        detail: null,
      };

    case ProductsActionTypes.GET_DETAIL_SUCCESS:
      return {
        ...state,
        loadingDetail: false,
        detail: action.payload,
      };
    case ProductsActionTypes.FILTER_SUCCESS:
      return {
        ...state,
        loading: false,
        listSearch: get(action, "payload", []),
      };
    case ProductsActionTypes.GET_DETAIL_ERROR:
      return {
        ...state,
        loadingDetail: false,
        detail: action.payload,
      };
    case ProductsActionTypes.CREATE:
    case ProductsActionTypes.UPDATE_IMAGE:
    case ProductsActionTypes.DELETE:
    case ProductsActionTypes.ACTIVATE:
    case ProductsActionTypes.DEACTIVATE:
      return {
        ...state,
        processing: true,
      };
    case ProductsActionTypes.CREATE_ERROR:
    case ProductsActionTypes.UPDATE_IMAGE_ERROR:
    case ProductsActionTypes.DELETE_ERROR:
    case ProductsActionTypes.ACTIVATE_ERROR:
    case ProductsActionTypes.DEACTIVATE_ERROR:
      var { message } = action.payload;
      toastError(message);
      return {
        ...state,
        processing: false,
      };
    case ProductsActionTypes.UPDATE_IMAGE_SUCCESS:
      toastSuccess('Cập nhật thành công');
      return {
        ...state,
        processing: true,
      };
    case ProductsActionTypes.CREATE_SUCCESS:
      toastSuccess('Tạo mới thành công');
      return {
        ...state,
        processing: true,
      };
    case ProductsActionTypes.DELETE_SUCCESS:
      toastSuccess('Xóa thành công');
      return {
        ...state,
        processing: false,
      };
    case ProductsActionTypes.ACTIVATE_SUCCESS:
      toastSuccess('Đăng sản phẩm thành công');
      return {
        ...state,
        processing: false,
      };
    case ProductsActionTypes.DEACTIVATE_SUCCESS:
      toastSuccess('Ẩn sản phẩm thành công');
      return {
        ...state,
        processing: false,
      };
    default:
      return state;
  }
}
