export const ImagesActionTypes = {
  UPDATE_THUMBNAIL_IMAGE: "UPDATE_THUMBNAIL_IMAGE",
  UPDATE_THUMBNAIL_IMAGE_SUCCESS: "UPDATE_THUMBNAIL_IMAGE_SUCCESS",
  UPDATE_THUMBNAIL_IMAGE_ERROR: "UPDATE_THUMBNAIL_IMAGE_ERROR",
};

Object.keys(ImagesActionTypes).forEach((key) => {
  ImagesActionTypes[
    key
  ] = `IMAGES_${ImagesActionTypes[key]}`;
});

const onUpdateThumbnailImage = ({ id, data }) => ({
  type: ImagesActionTypes.UPDATE_THUMBNAIL_IMAGE,
  payload: { id, data },
});

const onUpdateThumbnailImageSuccess = (detail) => ({
  type: ImagesActionTypes.UPDATE_THUMBNAIL_IMAGE_SUCCESS,
  payload: detail,
});

const onUpdateThumbnailImageError = (error) => ({
  type: ImagesActionTypes.UPDATE_THUMBNAIL_IMAGE_ERROR,
  payload: error,
});

const ImagesActions = {
  onUpdateThumbnailImage,
  onUpdateThumbnailImageSuccess,
  onUpdateThumbnailImageError,

};

export default ImagesActions;
