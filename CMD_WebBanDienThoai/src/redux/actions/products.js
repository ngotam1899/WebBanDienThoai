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

  UPDATE: "UPDATE",
  UPDATE_SUCCESS: "UPDATE_SUCCESS",
  UPDATE_ERROR: "UPDATE_ERROR",

  DELETE: "DELETE",
  DELETE_SUCCESS: "DELETE_SUCCESS",
  DELETE_ERROR: "DELETE_ERROR",

  CLEAR_DETAIL: "CLEAR_DETAIL",
  CLEAR_STATE: "CLEAR_STATE",

  ADD_PRODUCT_TO_CART: "ADD_PRODUCT_TO_CART",
  UPDATE_PRODUCT_CART: "UPDATE_PRODUCT_CART",
  DELETE_PRODUCT_CART: "DELETE_PRODUCT_CART",
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

const onGetListSuccess = (payload) => ({
  type: ProductsActionTypes.GET_LIST_SUCCESS,
  payload,
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
const onCreate = ({ params, filters, callback }) => ({
  type: ProductsActionTypes.CREATE,
  payload: { params },
  filters,
  callback,
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
const onUpdate = ({ id, params, filters, callback }) => ({
  type: ProductsActionTypes.UPDATE,
  payload: { id, params },
  filters,
  callback,
});

const onUpdateSuccess = (detail) => ({
  type: ProductsActionTypes.UPDATE_SUCCESS,
  payload: detail,
});

const onUpdateError = (error) => ({
  type: ProductsActionTypes.UPDATE_ERROR,
  payload: error,
});

/**
 *
 * delete
 */
const onDelete = ({ id, filters, callback }) => ({
  type: ProductsActionTypes.DELETE,
  id,
  filters,
  callback,
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
 * cart _ products
 */

const onAddProductToCart = (product, quantity) =>({
  type: ProductsActionTypes.ADD_PRODUCT_TO_CART,
  product, quantity
})

const onDeleteProductInCart = (product) =>{
  return {
    type: ProductsActionTypes.DELETE_PRODUCT_CART,
    product
  }
}

const onUpdateProductInCart = (product, quantity) =>{
  return {
    type: ProductsActionTypes.UPDATE_PRODUCT_CART,
    product, quantity
  }
}
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

  onUpdate,
  onUpdateSuccess,
  onUpdateError,

  onDelete,
  onDeleteSuccess,
  onDeleteError,

  onAddProductToCart,
  onDeleteProductInCart,
  onUpdateProductInCart,
};

export default ProductsActions;
