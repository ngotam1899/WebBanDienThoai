import { get, cloneDeep } from "lodash";
import { OrderActionTypes } from "../actions/order";

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
      return {
        ...state,
        loading: true,
      };
    case OrderActionTypes.GET_LIST_ERROR:
      return {
        ...state,
         loading: false,
        /*apiResultGetList: omit(get(action, "payload"), ["data"]), */
      };
    case OrderActionTypes.GET_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        list: get(action, "payload", []),
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
      return {
        ...state,
        processing: false,
      };
    case OrderActionTypes.UPDATE_SUCCESS:
      return {
        ...state,
        processing: true,
      };

    case OrderActionTypes.CREATE_SUCCESS:
    case OrderActionTypes.DELETE_SUCCESS:
      return {
        ...state,
        processing: false,
      };
    default:
      return state;
  }
}
