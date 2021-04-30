import { get } from "lodash";
import { ReviewActionTypes } from "../actions/review";

const init = {
  loading: true,
  processing: false,
};

export default function(state = init, action) {
  switch (action.type) {
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
        list: get(action, "payload", []),
      };
    default:
      return state;
  }
}
