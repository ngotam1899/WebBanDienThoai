import { get} from "lodash";
import { OrderActionTypes } from "../actions/order";
import { toastError, toastSuccess } from '../../utils/toastHelper';

const init = {
  loading: true,
  detail: null,
  processing: false,
};

export default function(state = init, action) {
  switch (action.type) {
    case OrderActionTypes.CLEAR_DETAIL:
      return {
        ...state,
        detail: null,
        loadingDetail: true,
      };
    case OrderActionTypes.CLEAR_STATE:
      return {
        ...init,
      };
    case OrderActionTypes.GET_LIST:
    case OrderActionTypes.GET_LIST_ERROR:
    case OrderActionTypes.GET_REVENUE:
    case OrderActionTypes.GET_REVENUE_ERROR:
    case OrderActionTypes.GET_REVENUE_LIST:
    case OrderActionTypes.GET_REVENUE_LIST_ERROR:
    case OrderActionTypes.GET_SESSION:
    case OrderActionTypes.GET_SESSION_ERROR:
      return {
        ...state,
         loading: false,
      };
    case OrderActionTypes.GET_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        total: get(action, "payload.total"),
        list: get(action, "payload.list", []),
      };
    case OrderActionTypes.GET_REVENUE_SUCCESS:
      return {
        ...state,
        revenue: action.payload,
      };
    case OrderActionTypes.GET_REVENUE_LIST_SUCCESS:
      return {
        ...state,
        listRevenue: action.payload,
      };
    case OrderActionTypes.GET_SESSION_SUCCESS:
      return {
        ...state,
        session: action.payload,
      };
    case OrderActionTypes.GET_DETAIL:
      return {
        ...state,
        loadingDetail: true,
        detail: null,
      };
    case OrderActionTypes.GET_DETAIL_SUCCESS:
      return {
        ...state,
        loadingDetail: false,
        detail: action.payload,
      };

    case OrderActionTypes.GET_DETAIL_ERROR:
      return {
        ...state,
        loadingDetail: false,
        detail: action.payload,
      };

    case OrderActionTypes.CREATE:
    case OrderActionTypes.UPDATE:
    case OrderActionTypes.DELETE:
      return {
        ...state,
        processing: true,
      };

    case OrderActionTypes.CREATE_ERROR:
    case OrderActionTypes.UPDATE_ERROR:
    case OrderActionTypes.DELETE_ERROR:
      var { message } = action.payload;
      toastError(message);
      return {
        ...state,
        processing: false,
      };
    case OrderActionTypes.UPDATE_SUCCESS:
      toastSuccess('Cập nhật thành công');
      return {
        ...state,
        processing: true,
      };
    case OrderActionTypes.CREATE_SUCCESS:
      toastSuccess('Tạo mới thành công');
      return {
        ...state,
        processing: true,
      };
    case OrderActionTypes.DELETE_SUCCESS:
      toastSuccess('Xóa thành công');
      return {
        ...state,
        processing: false,
      };
    default:
      return state;
  }
}
