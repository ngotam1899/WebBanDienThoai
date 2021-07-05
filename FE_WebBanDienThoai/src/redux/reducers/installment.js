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
      };
    case InstallmentActionTypes.GET_LIST:
      return {
        ...state,
        loading: true,
      };
    case InstallmentActionTypes.GET_LIST_ERROR:
      return {
        ...state,
         loading: false,
      };
    case InstallmentActionTypes.GET_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload.list,
        total: action.payload.total
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
