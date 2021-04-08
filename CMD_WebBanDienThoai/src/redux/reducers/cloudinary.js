import { ImagesActionTypes } from "../actions/cloudinary";

const init = {
  loading: true,
  detail: null,
  processing: false,
};

export default function(state = init, action) {
  switch (action.type) {
    case ImagesActionTypes.CLEAR_DETAIL:
      return {
        ...state,
        detail: null,
        loadingDetail: true,
      };

    case ImagesActionTypes.CLEAR_STATE:
      return {
        ...init,
      };
    case ImagesActionTypes.UPDATE_THUMBNAIL_IMAGE:
      return {...state};
    case ImagesActionTypes.UPDATE_THUMBNAIL_IMAGE_SUCCESS:
      return {...state};
    case ImagesActionTypes.UPDATE_THUMBNAIL_IMAGE_ERROR:
      return {...state};
    default:
      return state;
  }
}
