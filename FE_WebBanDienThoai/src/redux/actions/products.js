export const ProductsActionTypes = {
  FILTER: "FILTER",
  FILTER_SUCCESS: "FILTER_SUCCESS",

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

  CLEAR_DETAIL: "CLEAR_DETAIL",
  CLEAR_STATE: "CLEAR_STATE",

  ADD_PRODUCT_TO_CART: "ADD_PRODUCT_TO_CART",
  UPDATE_PRODUCT_CART: "UPDATE_PRODUCT_CART",
  DELETE_PRODUCT_CART: "DELETE_PRODUCT_CART",

  CLEAR_CART: "CLEAR_CART",
  CHANGE_CURRENCY: "CHANGE_CURRENCY",
};

Object.keys(ProductsActionTypes).forEach((key) => {
  ProductsActionTypes[
    key
  ] = `PRODUCTS_${ProductsActionTypes[key]}`;
});

const onClearDetail = () => ({
  type: ProductsActionTypes.CLEAR_DETAIL,
});
const onClearCart = () => ({
  type: ProductsActionTypes.CLEAR_CART,
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
const onChangeCurrency = (unit) =>{
  return {
    type: ProductsActionTypes.CHANGE_CURRENCY,
    payload: unit
  }
}

const onFilter = keyword => ({
  type: ProductsActionTypes.FILTER,
  payload: {
    keyword,
  },
});

const onFilterSuccess = data => ({
  type: ProductsActionTypes.FILTER_SUCCESS,
  payload: {
    data,
  },
});

const ProductsActions = {
  onFilter,
  onFilterSuccess,

  onClearDetail,
  onClearState,
  onClearCart,
  
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

  onAddProductToCart,
  onDeleteProductInCart,
  onUpdateProductInCart,
  onChangeCurrency,
  
};

export default ProductsActions;
