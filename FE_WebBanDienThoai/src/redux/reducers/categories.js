import { get, omit, cloneDeep } from "lodash";
import { CategoryActionTypes } from "../actions/categories";

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
    case CategoryActionTypes.CLEAR_DETAIL:
      return {
        ...state,
        detail: null,
        loadingDetail: true,
      };

    case CategoryActionTypes.CLEAR_STATE:
      return {
        ...init,
      };

    case CategoryActionTypes.GET_LIST:
      return {
        ...state,
        loading: true,
      };
    case CategoryActionTypes.GET_LIST_ERROR:
      return {
        ...state,
         loading: false,
        /*apiResultGetList: omit(get(action, "payload"), ["data"]), */
      };

    case CategoryActionTypes.GET_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        list: get(action, "payload", []),
      };

    case CategoryActionTypes.GET_DETAIL:
      return {
        ...state,
        loadingDetail: true,
        detail: null,
      };

    case CategoryActionTypes.GET_DETAIL_SUCCESS:
      return {
        ...state,
        loadingDetail: false,
        detail: action.payload,
      };

    case CategoryActionTypes.GET_DETAIL_ERROR:
      return {
        ...state,
        loadingDetail: false,
        detail: action.payload,
      };

    case CategoryActionTypes.CREATE:
    case CategoryActionTypes.UPDATE:
    case CategoryActionTypes.DELETE:
      return {
        ...state,
        processing: true,
      };

    case CategoryActionTypes.CREATE_ERROR:
    case CategoryActionTypes.UPDATE_ERROR:
    case CategoryActionTypes.DELETE_ERROR:
      return {
        ...state,
        processing: false,
      };
    case CategoryActionTypes.UPDATE_SUCCESS:
      return handleUpdate({state, action});

    case CategoryActionTypes.CREATE_SUCCESS:
    case CategoryActionTypes.DELETE_SUCCESS:
      return {
        ...state,
        processing: false,
      };
    default:
      return state;
  }
}
