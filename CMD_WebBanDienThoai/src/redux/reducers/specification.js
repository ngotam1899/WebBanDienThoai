import { get, cloneDeep } from "lodash";
import { SpecificationActionTypes } from "../actions/specification";
import { toastError, toastSuccess } from '../../utils/toastHelper';

const init = {
  loading: true,
  detail: null,
  processing: false,
};

export default function(state = init, action) {
  switch (action.type) {
    case SpecificationActionTypes.GET_LIST:
    case SpecificationActionTypes.FILTER:
      return {
        ...state,
        loading: true,
      };
    case SpecificationActionTypes.GET_LIST_ERROR:
      return {
        ...state,
         loading: false,
      };

    case SpecificationActionTypes.GET_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        list: get(action, "payload", []),
      };
    case SpecificationActionTypes.FILTER_SUCCESS:
      return {
        ...state,
        loading: false,
        listSearch: get(action, "payload", []),
      };
    default:
      return state;
  }
}
