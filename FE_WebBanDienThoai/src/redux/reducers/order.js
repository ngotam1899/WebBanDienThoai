import { get, omit, cloneDeep } from "lodash";
import { OrdersActionsTypes } from "../actions/order";
import { toastError, toastSuccess } from '../../utils/toastHelper';

const init = {
  loading: true,
  detail: null,
  processing: false,
};


export default function(state = init, action) {
  switch (action.type) {
    case OrdersActionsTypes.CREATE:
      return {...state};
    case OrdersActionsTypes.CREATE_SUCCESS:
      toastSuccess("Tạo đơn hàng thành công")
      return {...state};
    case OrdersActionsTypes.CREATE_ERROR:
      var { message } = action.payload;
      toastError(message)
      return {...state};
    case OrdersActionsTypes.SEND_CONFIRM_EMAIL:
      return {...state};
    case OrdersActionsTypes.SEND_CONFIRM_EMAIL_SUCCESS:
      toastSuccess("Đã gửi mã xác nhận đến mail của bạn")
      return {...state};
    case OrdersActionsTypes.SEND_CONFIRM_EMAIL_ERROR:
      toastError("Không có dữ liệu mail")
      return {...state};
    case OrdersActionsTypes.CONFIRM_ORDER:
      return {...state};
    case OrdersActionsTypes.CONFIRM_ORDER_SUCCESS:
      toastSuccess("Xác nhận đơn hàng thành công")
      return {...state};
    case OrdersActionsTypes.CONFIRM_ORDER_ERROR:
      var { message } = action.payload;
      toastError(message)
      return {...state};
    case OrdersActionsTypes.GET_LIST:
      return {...state};
    case OrdersActionsTypes.GET_LIST_SUCCESS:
      return {
        ...state,
        list: action.payload,
      };
    case OrdersActionsTypes.GET_LIST_ERROR:
      return {...state};
    case OrdersActionsTypes.GET_DETAIL:
      return {...state};
    case OrdersActionsTypes.GET_DETAIL_SUCCESS:
      return {
        ...state,
        loadingDetail: false,
        detail: action.payload,
      };
    case OrdersActionsTypes.UPDATE:
      return {
        ...state,
      };
    case OrdersActionsTypes.UPDATE_SUCCESS:
      toastSuccess("Hủy đơn hàng thành công")
      return {
        ...state,
      };
    case OrdersActionsTypes.UPDATE_ERROR:
      var { message } = action.payload;
      toastError(message)
      return {
        ...state,
      };
    case OrdersActionsTypes.GET_DETAIL_ERROR:
      return {...state};
    default:
      return state;
  }
}
