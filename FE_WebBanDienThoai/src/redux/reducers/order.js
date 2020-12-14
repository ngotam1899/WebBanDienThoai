import { get, omit, cloneDeep } from "lodash";
import { OrdersActionsTypes } from "../actions/order";

const init = {
  loading: true,
  detail: null,
  processing: false,
};

function handleUpdate({state, action}) {
  const list = cloneDeep(state.list);
  const detailData = get(action, "payload.data");
  const index = list.findIndex(i => i.id === detailData.id);
  console.log("index", index);
  if (index !== -1) {
    list[index] = {...list[index], ...detailData};
  }
  return {
    ...state,
    processing: false,
    list,
    detail: {
      ...state.detail,
      data: { ...state.detail.data, ...detailData },
    },
  };
}

export default function(state = init, action) {
  switch (action.type) {
    case OrdersActionsTypes.ADD_ORDER:
      return {...state};
    case OrdersActionsTypes.ADD_ORDER_SUCCESS:
      return {...state};
    case OrdersActionsTypes.ADD_ORDER_ERROR:
      return {...state};
    case OrdersActionsTypes.SEND_CONFIRM_EMAIL:
      return {...state};
    case OrdersActionsTypes.SEND_CONFIRM_EMAIL_SUCCESS:
      return {...state};
    case OrdersActionsTypes.SEND_CONFIRM_EMAIL_ERROR:
      return {...state};
    case OrdersActionsTypes.CONFIRM_ORDER:
      return {...state};
    case OrdersActionsTypes.CONFIRM_ORDER_SUCCESS:
      return {...state};
    case OrdersActionsTypes.CONFIRM_ORDER_ERROR:
      return {...state};
    case OrdersActionsTypes.GET_HISTORY_ORDER:
      return {...state};
    case OrdersActionsTypes.GET_HISTORY_ORDER_SUCCESS:
      return {
        ...state,
        loadingDetail: false,
        detail: action.payload,
      };
    case OrdersActionsTypes.GET_HISTORY_ORDER_ERROR:
      return {...state};
    case OrdersActionsTypes.GET_PRODUCT_ORDER:
      return {...state};
    case OrdersActionsTypes.GET_PRODUCT_ORDER_SUCCESS:
      return {
        ...state,
        loadingDetail: false,
        productOrder: action.payload,
      };
    case OrdersActionsTypes.GET_PRODUCT_ORDER_ERROR:
      return {...state};
    default:
      return state;
  }
}
