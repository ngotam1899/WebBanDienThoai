import { get, omit, cloneDeep } from "lodash";
import { ProductsActionTypes } from "../actions/products";

const init = {
  detail: null,
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
    case ProductsActionTypes.CLEAR_DETAIL:
      return {
        detail: null,
      };

    case ProductsActionTypes.CLEAR_STATE:
      return {
        ...init,
      };

    case ProductsActionTypes.GET_LIST:
      return {
        ...state,
      };

    case ProductsActionTypes.GET_LIST_ERROR:
      return {
        ...state,
        /*apiResultGetList: omit(get(action, "payload"), ["data"]), */
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
        detail: null,
      };

    case ProductsActionTypes.GET_DETAIL_SUCCESS:
      return {
        ...state,
        detail: action.payload,
      };

    case ProductsActionTypes.GET_DETAIL_ERROR:
      return {
        ...state,
        detail: action.payload,
      };

    case ProductsActionTypes.CREATE:
    case ProductsActionTypes.UPDATE:
    case ProductsActionTypes.FILTER:
    case ProductsActionTypes.DELETE:
      return {
        ...state,
      };
    case ProductsActionTypes.CREATE_ERROR:
    case ProductsActionTypes.UPDATE_ERROR:
    case ProductsActionTypes.DELETE_ERROR:
      return {
        ...state,
      };
    case ProductsActionTypes.UPDATE_SUCCESS:
      return handleUpdate({state, action});
    case ProductsActionTypes.FILTER_SUCCESS:
    case ProductsActionTypes.CREATE_SUCCESS:
    case ProductsActionTypes.DELETE_SUCCESS:
      return {
        ...state,
      };
    default:
      return state;
  }
}
