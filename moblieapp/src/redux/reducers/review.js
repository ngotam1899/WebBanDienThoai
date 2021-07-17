import {ReviewActionTypes} from '../actions/review';
import {ToastAndroid} from 'react-native';
import {get} from 'lodash';
const init = {};

export default function (state = init, action) {
  switch (action.type) {
    case ReviewActionTypes.CLEAR_DETAIL:
      return {
        ...state,
        detail: null,
      };
    case ReviewActionTypes.CLEAR_STATE:
      return {
        ...init,
      };
    case ReviewActionTypes.GET_LIST:
      return {
        ...state,
      };
    case ReviewActionTypes.GET_LIST_ERROR:
    case ReviewActionTypes.GET_DETAIL:
    case ReviewActionTypes.GET_DETAIL_ERROR:
      return {
        ...state,
      };
    case ReviewActionTypes.GET_LIST_SUCCESS:
      return {
        ...state,
        list: get(action, 'payload.list', []),
        total: get(action, 'payload.total'),
        count: action.payload.count,
      };
    case ReviewActionTypes.GET_DETAIL_SUCCESS:
      return {
        ...state,
        detail: get(action, 'payload', {}),
      };
    case ReviewActionTypes.UPDATE:
      return {
        ...state,
      };
    case ReviewActionTypes.UPDATE_SUCCESS:
      ToastAndroid.showWithGravity(
        'Cập nhật review thành công',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
      );
      return {
        ...state,
      };
    case ReviewActionTypes.UPDATE_ERROR:
      var {message} = action.payload;
      return {
        ...state,
      };
    case ReviewActionTypes.CREATE:
      return {...state};
    case ReviewActionTypes.CREATE_SUCCESS:
      ToastAndroid.showWithGravity(
        'Tạo review thành công',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
      );
      return {...state};
    case ReviewActionTypes.CREATE_ERROR:
      /* eslint-disable */
      var {message} = action.payload;
      toastError(message);
      /* eslint-disable */
      return {...state};
    default:
      return state;
  }
}
