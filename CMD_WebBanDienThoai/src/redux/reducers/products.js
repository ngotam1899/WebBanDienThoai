import { get, /*  cloneDeep */ } from "lodash";
import { ProductsActionTypes } from "../actions/products";
import { toastError, toastSuccess } from '../../utils/toastHelper';

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
    case ProductsActionTypes.CLEAR_DETAIL:
      return {
        ...state,
        detail: null,
        loadingDetail: true,
      };

    case ProductsActionTypes.CLEAR_STATE:
      return {
        ...init,
      };

    case ProductsActionTypes.GET_LIST:
      return {
        ...state,
        loading: true,
      };
    case ProductsActionTypes.GET_LIST_ERROR:
      return {
        ...state,
         loading: false,
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
        loadingDetail: true,
        detail: null,
      };

    case ProductsActionTypes.GET_DETAIL_SUCCESS:
      return {
        ...state,
        loadingDetail: false,
        detail: action.payload,
      };

    case ProductsActionTypes.GET_DETAIL_ERROR:
      return {
        ...state,
        loadingDetail: false,
        detail: action.payload,
      };

    case ProductsActionTypes.CREATE:
    case ProductsActionTypes.UPDATE_IMAGE:
    case ProductsActionTypes.DELETE:
      return {
        ...state,
        processing: true,
      };

    case ProductsActionTypes.CREATE_ERROR:
    case ProductsActionTypes.UPDATE_IMAGE_ERROR:
    case ProductsActionTypes.DELETE_ERROR:
      var { message } = action.payload;
      toastError(message);
      return {
        ...state,
        processing: false,
      };
    case ProductsActionTypes.UPDATE_IMAGE_SUCCESS:
      toastSuccess('Cập nhật thành công');
      return {
        ...state,
        processing: true,
      };
    case ProductsActionTypes.CREATE_SUCCESS:
      toastSuccess('Tạo mới thành công');
      return {
        ...state,
        processing: true,
      };
    case ProductsActionTypes.DELETE_SUCCESS:
      toastSuccess('Xóa thành công');
      return {
        ...state,
        processing: false,
      };
    default:
      return state;
  }
}
