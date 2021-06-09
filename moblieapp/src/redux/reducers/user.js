import { UsersActionTypes } from "../actions/user";
import {ToastAndroid} from 'react-native';

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
      var { message } = action.payload;
      ToastAndroid.showWithGravity(
        message,
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
      return {
        ...state,
        processing: false,
      };
    case UsersActionTypes.UPDATE_SUCCESS:
      ToastAndroid.showWithGravity(
        "Cập nhật thông tin thành công",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
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
      ToastAndroid.showWithGravity(
        message,
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
      var { message } = action.payload;
      return {
        ...state,
        processing: false,
      };
    case UsersActionTypes.CHANGE_PASSWORD_SUCCESS:
      ToastAndroid.showWithGravity(
        "Đổi mật khẩu thành công",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
      return {
        ...state,
        processing: false,
      };
    default:
      return state;
  }
}
