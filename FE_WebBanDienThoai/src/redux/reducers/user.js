import { UsersActionTypes } from "../actions/user";
import { toastError, toastSuccess } from '../../utils/toastHelper';

const init = {
  loading: true,
  detail: null,
  processing: false,
};
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
