import { get, cloneDeep } from "lodash";
import { OperationActionTypes } from "../actions/operations";
import { toastError, toastSuccess } from '../../utils/toastHelper';

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
    case OperationActionTypes.CLEAR_DETAIL:
      return {
        ...state,
        detail: null,
        loadingDetail: true,
      };
    case OperationActionTypes.CLEAR_STATE:
      return {
        ...init,
      };
    case OperationActionTypes.GET_LIST:
      return {
        ...state,
        loading: true,
      };
    case OperationActionTypes.GET_LIST_ERROR:
      return {
        ...state,
         loading: false,
        /*apiResultGetList: omit(get(action, "payload"), ["data"]), */
      };
    case OperationActionTypes.GET_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        list: get(action, "payload", []),
      };
    case OperationActionTypes.GET_DETAIL:
      return {
        ...state,
        loadingDetail: true,
        detail: null,
      };
    case OperationActionTypes.GET_DETAIL_SUCCESS:
      return {
        ...state,
        loadingDetail: false,
        detail: action.payload,
      };

    case OperationActionTypes.GET_DETAIL_ERROR:
      return {
        ...state,
        loadingDetail: false,
        detail: action.payload,
      };

    case OperationActionTypes.CREATE:
    case OperationActionTypes.UPDATE:
    case OperationActionTypes.DELETE:
      return {
        ...state,
        processing: true,
      };

    case OperationActionTypes.CREATE_ERROR:
    case OperationActionTypes.UPDATE_ERROR:
    case OperationActionTypes.DELETE_ERROR:
      var { message } = action.payload;
      toastError(message);
      return {
        ...state,
        processing: false,
      };
    case OperationActionTypes.UPDATE_SUCCESS:
      toastSuccess('Cập nhật thành công');
      return {
        ...state,
        processing: true,
      };
    case OperationActionTypes.CREATE_SUCCESS:
      toastSuccess('Tạo mới thành công');
      return {
        ...state,
        processing: true,
      };
    case OperationActionTypes.DELETE_SUCCESS:
      toastSuccess('Xóa thành công');
      return {
        ...state,
        processing: false,
      };
    default:
      return state;
  }
}
