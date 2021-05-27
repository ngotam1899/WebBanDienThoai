import { OrdersActionsTypes } from "../actions/order";
import { toastError, toastSuccess } from '../../utils/toastHelper';
import {ToastAndroid} from 'react-native';

const init = {
  loading: true,
  detail: null,
  processing: false,
};


export default function(state = init, action) {
  console.log('action: ',action)
  switch (action.type) {
    case OrdersActionsTypes.CREATE:
      return {...state};
    case OrdersActionsTypes.CREATE_SUCCESS:
      ToastAndroid.showWithGravity(
        "Tạo đơn hàng thành công",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
      return {...state};
    case OrdersActionsTypes.CREATE_ERROR:
      var { message } = action.payload;
      toastError(message)
      return {...state};
    case OrdersActionsTypes.SEND_CONFIRM_EMAIL:
      return {...state};
    case OrdersActionsTypes.SEND_CONFIRM_EMAIL_SUCCESS:
      ToastAndroid.showWithGravity(
        "Đã gửi mail xác nhận đến mail của bạn",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
      return {...state};
    case OrdersActionsTypes.SEND_CONFIRM_EMAIL_ERROR:
      ToastAndroid.showWithGravity(
        "Không có dữ liệu mail",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
      return {...state};
    case OrdersActionsTypes.CONFIRM_ORDER:
      return {...state};
    case OrdersActionsTypes.CONFIRM_ORDER_SUCCESS:
      ToastAndroid.showWithGravity(
        "Xác nhận đơn hàng thành công",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
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
      ToastAndroid.showWithGravity(
        "Hủy đơn hàng thành công",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
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
      return {...state};
    default:
      return state;
  }
}
