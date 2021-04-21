import { get, omit, cloneDeep } from "lodash";
import { CategoryActionTypes } from "../actions/categories";

const init = {
  loading: true,
  detail: null,
  processing: false,
};

export default function(state = init, action) {
  switch (action.type) {
    case CategoryActionTypes.GET_LIST:
      return {
        ...state,
        loading: true,
      };
    case CategoryActionTypes.GET_LIST_ERROR:
      return {
        ...state,
         loading: false,
      };

    case CategoryActionTypes.GET_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        list: get(action, "payload", []), // list: action.payload
      };
    default:
      return state;
  }
}
/* category: {
      productLength: [
        {
          categoryId,
          productLengthByCat
        }
      ]
}*/