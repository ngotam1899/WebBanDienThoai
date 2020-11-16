import { get, omit, cloneDeep } from "lodash";
import { BrandActionTypes } from "../actions/brands";

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
    case BrandActionTypes.CLEAR_DETAIL:
      return {
        ...state,
        detail: null,
        loadingDetail: true,
      };

    case BrandActionTypes.CLEAR_STATE:
      return {
        ...init,
      };

    case BrandActionTypes.GET_LIST:
      return {
        ...state,
        loading: true,
      };
    case BrandActionTypes.GET_LIST_ERROR:
      return {
        ...state,
         loading: false,
        /*apiResultGetList: omit(get(action, "payload"), ["data"]), */
      };

    case BrandActionTypes.GET_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        list: get(action, "payload", []),
      };

    case BrandActionTypes.GET_DETAIL:
      return {
        ...state,
        loadingDetail: true,
        detail: null,
      };

    case BrandActionTypes.GET_DETAIL_SUCCESS:
      return {
        ...state,
        loadingDetail: false,
        detail: action.payload,
      };

    case BrandActionTypes.GET_DETAIL_ERROR:
      return {
        ...state,
        loadingDetail: false,
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
      return {
        ...state,
        processing: false,
      };
    case BrandActionTypes.UPDATE_SUCCESS:
      return handleUpdate({state, action});

    case BrandActionTypes.CREATE_SUCCESS:
    case BrandActionTypes.DELETE_SUCCESS:
      return {
        ...state,
        processing: false,
      };
    default:
      return state;
  }
}
