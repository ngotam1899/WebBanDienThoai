export const ImagesActionTypes = {
  GET_AN_IMAGE: "GET_AN_IMAGE",
  GET_AN_IMAGE_SUCCESS: "GET_AN_IMAGE_SUCCESS",
  GET_AN_IMAGE_ERROR: "GET_AN_IMAGE_ERROR",
};

const onGetAnImage = (id) => ({
  type: ImagesActionTypes.GET_AN_IMAGE,
  id
});
const onGetAnImageSuccess = (image) => ({
  type: ImagesActionTypes.GET_AN_IMAGE_SUCCESS,
  payload: image
});
const onGetAnImageError = (error) => ({
  type: ImagesActionTypes.GET_AN_IMAGE_ERROR,
  payload: error
});

const ImagesActions = {
  onGetAnImage,
  onGetAnImageSuccess,
  onGetAnImageError,
};

export default ImagesActions;
