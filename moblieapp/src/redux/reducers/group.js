import { get } from "lodash";
import { GroupActionTypes } from "../actions/group";

const init = {
  loading: true,
  processing: false,
};

export default function(state = init, action) {
  switch (action.type) {
    case GroupActionTypes.CLEAR_DETAIL:
      return {
        detail: null,
      };

    case GroupActionTypes.CLEAR_STATE:
      return {
        ...init,
      };

    case GroupActionTypes.GET_DETAIL:
      return {
        ...state,
        loading: true,
      };
    case GroupActionTypes.GET_DETAIL_ERROR:
      return {
        ...state,
         loading: false,
      };
    case GroupActionTypes.GET_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        detail: get(action, "payload", []),
      };
    default:
      return state;
  }
}
