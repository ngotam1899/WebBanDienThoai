import { UIActionTypes } from '../actions/ui';

const initialState = {
  showLoading: false,
  showSidebar: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UIActionTypes.SHOW_LOADING: {
      return {
        ...state,
        showLoading: true,
      };
    }
    case UIActionTypes.HIDE_LOADING: {
      return {
        ...state,
        showLoading: false,
      };
    }
    default:
      return state;
  }
};

export default reducer;
