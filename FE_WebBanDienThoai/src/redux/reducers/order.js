import { get, omit, cloneDeep } from "lodash";
import { OrdersActionTypes } from "../actions/order";

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
    case OrdersActionTypes.ADD_ORDER:
      return {...state};
    case OrdersActionTypes.ADD_ORDER_SUCCESS:
      return {...state};
    case OrdersActionTypes.ADD_ORDER_ERROR:
      return {...state};
    case OrdersActionTypes.SEND_CONFIRM_EMAIL:
      return {...state};
    case OrdersActionTypes.SEND_CONFIRM_EMAIL_SUCCESS:
      return {...state};
    case OrdersActionTypes.SEND_CONFIRM_EMAIL_ERROR:
      return {...state};
    case OrdersActionTypes.CONFIRM_ORDER:
      return {...state};
    case OrdersActionTypes.CONFIRM_ORDER_SUCCESS:
      return {...state};
    case OrdersActionTypes.CONFIRM_ORDER_ERROR:
      return {...state};
    default:
      return state;
  }
}
