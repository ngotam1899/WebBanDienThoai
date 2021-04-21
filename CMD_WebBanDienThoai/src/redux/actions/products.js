export const ProductsActionTypes = {
  GET_LIST: "GET_LIST",
  GET_LIST_SUCCESS: "GET_LIST_SUCCESS",
  GET_LIST_ERROR: "GET_LIST_ERROR",

  GET_DETAIL: "GET_DETAIL",
  GET_DETAIL_SUCCESS: "GET_DETAIL_SUCCESS",
  GET_DETAIL_ERROR: "GET_DETAIL_ERROR",

  CREATE: "CREATE",
  CREATE_SUCCESS: "CREATE_SUCCESS",
  CREATE_ERROR: "CREATE_ERROR",

  UPDATE_IMAGE: "UPDATE_IMAGE",
  UPDATE_IMAGE_SUCCESS: "UPDATE_IMAGE_SUCCESS",
  UPDATE_IMAGE_ERROR: "UPDATE_IMAGE_ERROR",

  DELETE: "DELETE",
  DELETE_SUCCESS: "DELETE_SUCCESS",
  DELETE_ERROR: "DELETE_ERROR",

  ACTIVATE: "ACTIVATE",
  ACTIVATE_SUCCESS: "ACTIVATE_SUCCESS",
  ACTIVATE_ERROR: "ACTIVATE_ERROR",

  DEACTIVATE: "DEACTIVATE",
  DEACTIVATE_SUCCESS: "DEACTIVATE_SUCCESS",
  DEACTIVATE_ERROR: "DEACTIVATE_ERROR",

  FILTER: "FILTER",
  FILTER_SUCCESS: "FILTER_SUCCESS",

  CLEAR_DETAIL: "CLEAR_DETAIL",
  CLEAR_STATE: "CLEAR_STATE",
};

Object.keys(ProductsActionTypes).forEach((key) => {
  ProductsActionTypes[
    key
  ] = `PRODUCTS_${ProductsActionTypes[key]}`;
});

const onClearDetail = () => ({
  type: ProductsActionTypes.CLEAR_DETAIL,
});

const onClearState = () => ({
  type: ProductsActionTypes.CLEAR_STATE,
});

const onGetList = (payload) => ({
  type: ProductsActionTypes.GET_LIST,
  payload,
});

const onGetListSuccess = (list, total) => ({
  type: ProductsActionTypes.GET_LIST_SUCCESS,
  payload: {list, total}
});

const onGetListError = (error) => ({
  type: ProductsActionTypes.GET_LIST_ERROR,
  payload: error,
});

/**
 *
 * @param String id
 */
const onGetDetail = (id) => ({
  type: ProductsActionTypes.GET_DETAIL,
  id,
});

const onGetDetailSuccess = (detail) => ({
  type: ProductsActionTypes.GET_DETAIL_SUCCESS,
  payload: detail,
});

const onGetDetailError = (error) => ({
  type: ProductsActionTypes.GET_DETAIL_ERROR,
  payload: error,
});

/**
 *
 * create
 */
const onCreate = ({params, formData}) => ({
  type: ProductsActionTypes.CREATE,
  payload: {params, formData}
});

const onCreateSuccess = (detail) => ({
  type: ProductsActionTypes.CREATE_SUCCESS,
  payload: detail,
});

const onCreateError = (error) => ({
  type: ProductsActionTypes.CREATE_ERROR,
  payload: error,
});

/**
 *
 * update
 */
const onUpdateImage = ({ id, params, formData }) => ({
  type: ProductsActionTypes.UPDATE_IMAGE,
  payload: { id, params, formData },
});

const onUpdateImageSuccess = (detail) => ({
  type: ProductsActionTypes.UPDATE_IMAGE_SUCCESS,
  payload: detail,
});

const onUpdateImageError = (error) => ({
  type: ProductsActionTypes.UPDATE_IMAGE_ERROR,
  payload: error,
});

/**
 *
 * delete
 */
const onDelete = ({ id }) => ({
  type: ProductsActionTypes.DELETE,
  id,
});

const onDeleteSuccess = (detail) => ({
  type: ProductsActionTypes.DELETE_SUCCESS,
  payload: detail,
});

const onDeleteError = (error) => ({
  type: ProductsActionTypes.DELETE_ERROR,
  payload: error,
});
/**
 *
 * activate
 */
const onActivate = (id) => ({
  type: ProductsActionTypes.ACTIVATE,
  payload: id,
});

const onActivateSuccess = (detail) => ({
  type: ProductsActionTypes.ACTIVATE_SUCCESS,
  payload: detail,
});

const onActivateError = (error) => ({
  type: ProductsActionTypes.ACTIVATE_ERROR,
  payload: error,
});
/**
 *
 * deactivate
 */
const onDeactivate = (id) => ({
  type: ProductsActionTypes.DEACTIVATE,
  payload: id,
});

const onDeactivateSuccess = (detail) => ({
  type: ProductsActionTypes.DEACTIVATE_SUCCESS,
  payload: detail,
});

const onDeactivateError = (error) => ({
  type: ProductsActionTypes.DEACTIVATE_ERROR,
  payload: error,
});

//----------------  Filter  ----------------------

const onFilter = keyword => ({
  type: ProductsActionTypes.FILTER,
  payload: {
    keyword,
  },
});

const onFilterSuccess = data => ({
  type: ProductsActionTypes.FILTER_SUCCESS,
  payload: data,
});

const ProductsActions = {
  onClearDetail,
  onClearState,

  onGetList,
  onGetListSuccess,
  onGetListError,

  onGetDetail,
  onGetDetailSuccess,
  onGetDetailError,

  onCreate,
  onCreateSuccess,
  onCreateError,

  onUpdateImage,
  onUpdateImageSuccess,
  onUpdateImageError,

  onDelete,
  onDeleteSuccess,
  onDeleteError,

  onFilter,
  onFilterSuccess,

  onActivate,
  onActivateSuccess,
  onActivateError,

  onDeactivate,
  onDeactivateSuccess,
  onDeactivateError,
};

export default ProductsActions;
