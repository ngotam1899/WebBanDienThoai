import { get } from "lodash";
import { ReviewActionTypes } from "../actions/review";
import { toastError, toastSuccess } from '../../utils/toastHelper';

const init = {
  loading: true,
  processing: false,
};

export default function(state = init, action) {
  switch (action.type) {
    case ReviewActionTypes.CLEAR_STATE:
      return {
        ...init,
      };
    case ReviewActionTypes.GET_LIST:
      return {
        ...state,
        loading: true,
      };
    case ReviewActionTypes.GET_LIST_ERROR:
      return {
        ...state,
         loading: false,
      };
    case ReviewActionTypes.GET_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        total: get(action, "payload.total"),
        list: get(action, "payload.list", []),
      };
    case ReviewActionTypes.DELETE:
      return {
        ...state,
        processing: true,
      };
    case ReviewActionTypes.DELETE_ERROR:
      var { message } = action.payload;
      toastError(message);
      return {
        ...state,
        processing: false,
      };
    case ReviewActionTypes.DELETE_SUCCESS:
      toastSuccess('Xóa thành công');
      return {
        ...state,
        processing: false,
      };
    default:
      return state;
  }
}
