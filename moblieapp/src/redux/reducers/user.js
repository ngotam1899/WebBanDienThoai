import { get, cloneDeep } from "lodash";
import { UsersActionTypes } from "../actions/user";
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
    case UsersActionTypes.UPDATE:
      return {
        ...state,
        processing: true,
      };
    case UsersActionTypes.UPDATE_ERROR:
      return {
        ...state,
        processing: false,
      };
    case UsersActionTypes.UPDATE_SUCCESS:
      toastSuccess('Cập nhật thông tin thành công');
      return {
        ...state,
        processing: false,
        detail: action.payload,
      };
    case UsersActionTypes.CHANGE_PASSWORD:
      return {
        ...state,
        processing: true,
      };
    case UsersActionTypes.CHANGE_PASSWORD_ERROR:
      var { message } = action.payload;
      toastError(message);
      return {
        ...state,
        processing: false,
      };
    case UsersActionTypes.CHANGE_PASSWORD_SUCCESS:
      toastSuccess('Cập nhật thông tin thành công');
      return {
        ...state,
        processing: false,
      };
    default:
      return state;
  }
}
