import { get } from "lodash";
import { ColorActionTypes } from "../actions/color";

const init = {
  loading: true,
  detail: null,
  processing: false,
};


export default function(state = init, action) {
  switch (action.type) {
    case ColorActionTypes.GET_LIST:
      return {
        ...state,
        loading: true,
      };
    case ColorActionTypes.GET_LIST_ERROR:
      return {
        ...state,
         loading: false,
      };
    case ColorActionTypes.GET_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        list: get(action, "payload", []),
      };
    default:
      return state;
  }
}
