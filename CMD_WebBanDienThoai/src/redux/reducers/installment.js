import { get } from "lodash";
import { InstallmentActionTypes } from "../actions/installment";
import { toastError, toastSuccess } from '../../utils/toastHelper';

const init = {
  loading: true,
  detail: null,
  processing: false,
};

export default function(state = init, action) {
  switch (action.type) {
    case InstallmentActionTypes.CLEAR_DETAIL:
      return {
        ...state,
        detail: null,
        loadingDetail: true,
      };
    case InstallmentActionTypes.CLEAR_STATE:
      return {
        ...init,
      };
    case InstallmentActionTypes.GET_LIST:
    case InstallmentActionTypes.GET_LIST_ERROR:
    case InstallmentActionTypes.GET_SESSION:
    case InstallmentActionTypes.GET_SESSION_ERROR:
      return {
        ...state,
         loading: false,
      };
    case InstallmentActionTypes.GET_SESSION_SUCCESS:
      return {
        ...state,
        session: action.payload,
      };
    case InstallmentActionTypes.GET_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        total: get(action, "payload.total"),
        list: get(action, "payload.list", []),
      };
    case InstallmentActionTypes.GET_DETAIL:
      return {
        ...state,
        loadingDetail: true,
        detail: null,
      };
    case InstallmentActionTypes.GET_DETAIL_SUCCESS:
      if(action.payload === null){
        toastError("Không tìm thấy phiếu trả góp này. Phiếu trả góp có thể đã bị hủy")
      }
      return {
        ...state,
        loadingDetail: false,
        detail: action.payload,
      };

    case InstallmentActionTypes.GET_DETAIL_ERROR:
      toastError("Không tìm thấy phiếu trả góp này. Phiếu trả góp có thể đã bị hủy")
      return {
        ...state,
        loadingDetail: false,
        detail: action.payload,
      };

    case InstallmentActionTypes.CREATE:
    case InstallmentActionTypes.UPDATE:
    case InstallmentActionTypes.DELETE:
      return {
        ...state,
        processing: true,
      };

    case InstallmentActionTypes.CREATE_ERROR:
    case InstallmentActionTypes.UPDATE_ERROR:
    case InstallmentActionTypes.DELETE_ERROR:
      var { message } = action.payload;
      toastError(message);
      return {
        ...state,
        processing: false,
      };
    case InstallmentActionTypes.UPDATE_SUCCESS:
      toastSuccess('Cập nhật thành công');
      return {
        ...state,
        processing: true,
      };
    case InstallmentActionTypes.CREATE_SUCCESS:
      toastSuccess('Tạo mới thành công');
      return {
        ...state,
        processing: true,
      };
    case InstallmentActionTypes.DELETE_SUCCESS:
      toastSuccess('Xóa thành công');
      return {
        ...state,
        processing: false,
      };
    default:
      return state;
  }
}
