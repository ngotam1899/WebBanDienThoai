import { OrdersActionsTypes } from "../actions/order";
import { toastError, toastSuccess } from '../../utils/toastHelper';

const init = {
  loading: true,
  detail: null,
  processing: false,
};


export default function(state = init, action) {
  switch (action.type) {
    case OrdersActionsTypes.CLEAR_DETAIL:
      return {
        ...state,
        detail: null,
      };
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
      /* eslint-disable */
      var { message } = action.payload;
      toastError(message)
      /* eslint-disable */
      return {...state};
    case OrdersActionsTypes.GET_LIST:
      return {...state};
    case OrdersActionsTypes.GET_LIST_SUCCESS:
      return {
        ...state,
        list: action.payload.list,
        total: action.payload.total,
      };
    case OrdersActionsTypes.GET_LIST_ERROR:
      return {...state};
    case OrdersActionsTypes.GET_DETAIL:
      return {...state};
    case OrdersActionsTypes.GET_DETAIL_SUCCESS:
      if(action.payload === null){
        toastError("Không tìm thấy đơn hàng này. Đơn hàng có thể đã bị hủy")
      }
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
      /* eslint-disable */
      var { message } = action.payload;
      toastError(message)
      /* eslint-disable */
      return {
        ...state,
      };
    case OrdersActionsTypes.GET_DETAIL_ERROR:
      toastError("Không tìm thấy đơn hàng này. Đơn hàng có thể đã bị hủy")
      return {
        ...state,
        loadingDetail: false,
        detail: null,};
    default:
      return state;
  }
}
