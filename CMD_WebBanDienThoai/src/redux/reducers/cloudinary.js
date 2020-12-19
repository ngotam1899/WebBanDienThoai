import { get,  cloneDeep } from "lodash";
import { ImagesActionTypes } from "../actions/cloudinary";

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
    case ImagesActionTypes.CLEAR_DETAIL:
      return {
        ...state,
        detail: null,
        loadingDetail: true,
      };

    case ImagesActionTypes.CLEAR_STATE:
      return {
        ...init,
      };

    case ImagesActionTypes.GET_LIST:
      return {
        ...state,
        loading: true,
      };
    case ImagesActionTypes.GET_LIST_ERROR:
      return {
        ...state,
         loading: false,
        /*apiResultGetList: omit(get(action, "payload"), ["data"]), */
      };

    case ImagesActionTypes.GET_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        list: get(action, "payload", []),
      };

    case ImagesActionTypes.GET_DETAIL:
      return {
        ...state,
        loadingDetail: true,
        detail: null,
      };

    case ImagesActionTypes.GET_DETAIL_SUCCESS:
      return {
        ...state,
        loadingDetail: false,
        detail: action.payload,
      };

    case ImagesActionTypes.GET_DETAIL_ERROR:
      return {
        ...state,
        loadingDetail: false,
        detail: action.payload,
      };

    case ImagesActionTypes.CREATE:
    case ImagesActionTypes.UPDATE:
    case ImagesActionTypes.DELETE:
      return {
        ...state,
        processing: true,
      };

    case ImagesActionTypes.CREATE_ERROR:
    case ImagesActionTypes.UPDATE_ERROR:
    case ImagesActionTypes.DELETE_ERROR:
      return {
        ...state,
        processing: false,
      };
    case ImagesActionTypes.UPDATE_SUCCESS:
      return handleUpdate({state, action});

    case ImagesActionTypes.CREATE_SUCCESS:
    case ImagesActionTypes.DELETE_SUCCESS:
      return {
        ...state,
        processing: false,
      };
    case ImagesActionTypes.UPDATE_THUMBNAIL_IMAGE:
      return {...state};
    case ImagesActionTypes.UPDATE_THUMBNAIL_IMAGE_SUCCESS:
      return {...state};
    case ImagesActionTypes.UPDATE_THUMBNAIL_IMAGE_ERROR:
      return {...state};
    default:
      return state;
  }
}
