import { get, cloneDeep } from "lodash";
import { OperationActionTypes } from "../actions/operations";

const init = {
  loading: true,
  detail: null,
  processing: false,
};
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
    default:
      return state;
  }
}
