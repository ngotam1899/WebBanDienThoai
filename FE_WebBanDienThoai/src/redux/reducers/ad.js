import { get } from "lodash";
import { AdActionTypes } from "../actions/ad";

const init = {
  loading: true,
  detail: null,
  processing: false,
};


export default function(state = init, action) {
  switch (action.type) {
    case AdActionTypes.GET_LIST:
      return {
        ...state,
        loading: true,
      };
    case AdActionTypes.GET_LIST_ERROR:
      return {
        ...state,
         loading: false,
      };
    case AdActionTypes.GET_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        list: get(action, "payload", []),
      };
    default:
      return state;
  }
}
