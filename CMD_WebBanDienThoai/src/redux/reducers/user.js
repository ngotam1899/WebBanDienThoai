import { get, /*  cloneDeep */ } from "lodash";
import { UsersActionTypes } from "../actions/user";

const init = {
  loading: true,
  detail: null,
  processing: false,
};

/* function handleUpdate({state, action}) {
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
} */

export default function(state = init, action) {
  switch (action.type) {
    case UsersActionTypes.CLEAR_DETAIL:
      return {
        ...state,
        detail: null,
        loadingDetail: true,
      };

    case UsersActionTypes.CLEAR_STATE:
      return {
        ...init,
      };

    case UsersActionTypes.GET_LIST:
      return {
        ...state,
        loading: true,
      };
    case UsersActionTypes.GET_LIST_ERROR:
      return {
        ...state,
         loading: false,
        /*apiResultGetList: omit(get(action, "payload"), ["data"]), */
      };

    case UsersActionTypes.GET_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        list: get(action, "payload", []),
      };

    case UsersActionTypes.GET_DETAIL:
      return {
        ...state,
        loadingDetail: true,
        detail: null,
      };

    case UsersActionTypes.GET_DETAIL_SUCCESS:
      return {
        ...state,
        loadingDetail: false,
        detail: action.payload,
      };

    case UsersActionTypes.GET_DETAIL_ERROR:
      return {
        ...state,
        loadingDetail: false,
        detail: action.payload,
      };

    case UsersActionTypes.CREATE:
    case UsersActionTypes.UPDATE_IMAGE:
    case UsersActionTypes.DELETE:
      return {
        ...state,
        processing: true,
      };

    case UsersActionTypes.CREATE_ERROR:
    case UsersActionTypes.UPDATE_IMAGE_ERROR:
    case UsersActionTypes.DELETE_ERROR:
      return {
        ...state,
        processing: false,
      };
    case UsersActionTypes.UPDATE_IMAGE_SUCCESS:
      //return handleUpdate({state, action});
      return {
        ...state,
        processing: true,
      };
    case UsersActionTypes.CREATE_SUCCESS:
      return {
        ...state,
        loadingDetail: false,
        detail: action.payload,
      };
    case UsersActionTypes.DELETE_SUCCESS:
      return {
        ...state,
        processing: false,
      };
    default:
      return state;
  }
}
