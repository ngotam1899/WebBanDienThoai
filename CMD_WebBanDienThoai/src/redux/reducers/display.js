import { get, omit, cloneDeep } from "lodash";
import { DisplayActionTypes } from "../actions/display";

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
    case DisplayActionTypes.CLEAR_DETAIL:
      return {
        ...state,
        detail: null,
        loadingDetail: true,
      };

    case DisplayActionTypes.CLEAR_STATE:
      return {
        ...init,
      };

    case DisplayActionTypes.GET_LIST:
      return {
        ...state,
        loading: true,
      };
    case DisplayActionTypes.GET_LIST_ERROR:
      return {
        ...state,
         loading: false,
        /*apiResultGetList: omit(get(action, "payload"), ["data"]), */
      };

    case DisplayActionTypes.GET_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        list: get(action, "payload", []),
      };

    case DisplayActionTypes.GET_DETAIL:
      return {
        ...state,
        loadingDetail: true,
        detail: null,
      };

    case DisplayActionTypes.GET_DETAIL_SUCCESS:
      return {
        ...state,
        loadingDetail: false,
        detail: action.payload,
      };

    case DisplayActionTypes.GET_DETAIL_ERROR:
      return {
        ...state,
        loadingDetail: false,
        detail: action.payload,
      };

    case DisplayActionTypes.CREATE:
    case DisplayActionTypes.UPDATE:
    case DisplayActionTypes.DELETE:
      return {
        ...state,
        processing: true,
      };

    case DisplayActionTypes.CREATE_ERROR:
    case DisplayActionTypes.UPDATE_ERROR:
    case DisplayActionTypes.DELETE_ERROR:
      return {
        ...state,
        processing: false,
      };
    case DisplayActionTypes.UPDATE_SUCCESS:
      //return handleUpdate({state, action});
      return {
        ...state,
        processing: true,
      };
    case DisplayActionTypes.CREATE_SUCCESS:
    case DisplayActionTypes.DELETE_SUCCESS:
      return {
        ...state,
        processing: false,
      };
    default:
      return state;
  }
}
