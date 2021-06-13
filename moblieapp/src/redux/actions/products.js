export const ProductsActionTypes = {
  FILTER: 'FILTER',
  FILTER_SUCCESS: 'FILTER_SUCCESS',

  GET_LIST: 'GET_LIST',
  GET_LIST_SUCCESS: 'GET_LIST_SUCCESS',
  GET_LIST_ERROR: 'GET_LIST_ERROR',

  GET_DETAIL: 'GET_DETAIL',
  GET_DETAIL_SUCCESS: 'GET_DETAIL_SUCCESS',
  GET_DETAIL_ERROR: 'GET_DETAIL_ERROR',

  GET_BEST_SELLER: 'GET_BEST_SELLER',
  GET_BEST_SELLER_SUCCESS: 'GET_BEST_SELLER_SUCCESS',
  GET_BEST_SELLER_ERROR: 'GET_BEST_SELLER_ERROR',

  GET_FAVORITE: 'GET_FAVORITE',
  GET_FAVORITE_SUCCESS: 'GET_FAVORITE_SUCCESS',
  GET_FAVORITE_ERROR: 'GET_FAVORITE_ERROR',

  GET_NEWEST: 'GET_NEWEST',
  GET_NEWEST_SUCCESS: 'GET_NEWEST_SUCCESS',
  GET_NEWEST_ERROR: 'GET_NEWEST_ERROR',

  GET_LIKE: "GET_LIKE",
  GET_LIKE_SUCCESS: "GET_LIKE_SUCCESS",
  GET_LIKE_ERROR: "GET_LIKE_ERROR",

  GET_RELATE: "GET_RELATE",
  GET_RELATE_SUCCESS: "GET_RELATE_SUCCESS",
  GET_RELATE_ERROR: "GET_RELATE_ERROR",

  CREATE: 'CREATE',
  CREATE_SUCCESS: 'CREATE_SUCCESS',
  CREATE_ERROR: 'CREATE_ERROR',

  UPDATE: 'UPDATE',
  UPDATE_SUCCESS: 'UPDATE_SUCCESS',
  UPDATE_ERROR: 'UPDATE_ERROR',

  CLEAR_DETAIL: 'CLEAR_DETAIL',
  CLEAR_STATE: 'CLEAR_STATE',

  ADD_PRODUCT_TO_CART: 'ADD_PRODUCT_TO_CART',
  UPDATE_PRODUCT_CART: 'UPDATE_PRODUCT_CART',
  DELETE_PRODUCT_CART: 'DELETE_PRODUCT_CART',
  ON_CLEAR_CART: 'ON_CLEAR_CART',
  PURCHASE_AGAIN: "PURCHASE_AGAIN",

  ON_CHECKOUT: 'ON_CHECKOUT',
  END_CHECKOUT: 'END_CHECKOUT',

  CLEAR_CART: 'CLEAR_CART',
  CHANGE_CURRENCY: 'CHANGE_CURRENCY',
};

Object.keys(ProductsActionTypes).forEach(key => {
  ProductsActionTypes[key] = `PRODUCTS_${ProductsActionTypes[key]}`;
});

/**
 * like
 **/

 const onGetLike = (id) => ({
  type: ProductsActionTypes.GET_LIKE,
  id,
});

const onGetLikeSuccess = (payload) => ({
  type: ProductsActionTypes.GET_LIKE_SUCCESS,
  payload
});

const onGetLikeError = (error) => ({
  type: ProductsActionTypes.GET_LIKE_ERROR,
  payload: error,
});

/**
 * relate
 **/

const onGetRelate = (id) => ({
  type: ProductsActionTypes.GET_RELATE,
  id,
});

const onGetRelateSuccess = (payload) => ({
  type: ProductsActionTypes.GET_RELATE_SUCCESS,
  payload
});

const onGetRelateError = (error) => ({
  type: ProductsActionTypes.GET_RELATE_ERROR,
  payload: error,
});

const onClearDetail = () => ({
  type: ProductsActionTypes.CLEAR_DETAIL,
});

const onClearState = () => ({
  type: ProductsActionTypes.CLEAR_STATE,
});

const onGetList = payload => ({
  type: ProductsActionTypes.GET_LIST,
  payload,
});

const onGetListSuccess = (list, total) => ({
  type: ProductsActionTypes.GET_LIST_SUCCESS,
  payload: {list, total},
});

const onGetListError = error => ({
  type: ProductsActionTypes.GET_LIST_ERROR,
  payload: error,
});

const onGetBestSeller = payload => ({
  type: ProductsActionTypes.GET_BEST_SELLER,
  payload,
});

const onGetBestSellerSuccess = payload => ({
  type: ProductsActionTypes.GET_BEST_SELLER_SUCCESS,
  payload,
});

const onGetBestSellerError = error => ({
  type: ProductsActionTypes.GET_BEST_SELLER_ERROR,
  payload: error,
});

const onGetFavorite = payload => ({
  type: ProductsActionTypes.GET_FAVORITE,
  payload,
});

const onGetFavoriteSuccess = payload => ({
  type: ProductsActionTypes.GET_FAVORITE_SUCCESS,
  payload,
});

const onGetFavoriteError = error => ({
  type: ProductsActionTypes.GET_FAVORITE_ERROR,
  payload: error,
});

const onGetNewest = payload => ({
  type: ProductsActionTypes.GET_NEWEST,
  payload,
});

const onGetNewestSuccess = payload => ({
  type: ProductsActionTypes.GET_NEWEST_SUCCESS,
  payload,
});

const onGetNewestError = error => ({
  type: ProductsActionTypes.GET_NEWEST_ERROR,
  payload: error,
});
/**
 *
 * @param String id
 */
const onGetDetail = id => ({
  type: ProductsActionTypes.GET_DETAIL,
  id,
});

const onGetDetailSuccess = detail => ({
  type: ProductsActionTypes.GET_DETAIL_SUCCESS,
  payload: detail,
});

const onGetDetailError = error => ({
  type: ProductsActionTypes.GET_DETAIL_ERROR,
  payload: error,
});

/**
 *
 * create
 */
const onCreate = ({params, filters, callback}) => ({
  type: ProductsActionTypes.CREATE,
  payload: {params},
  filters,
  callback,
});

const onCreateSuccess = detail => ({
  type: ProductsActionTypes.CREATE_SUCCESS,
  payload: detail,
});

const onCreateError = error => ({
  type: ProductsActionTypes.CREATE_ERROR,
  payload: error,
});

/**
 *
 * update
 */
const onUpdate = ({id, params, filters, callback}) => ({
  type: ProductsActionTypes.UPDATE,
  payload: {id, params},
  filters,
  callback,
});

const onUpdateSuccess = detail => ({
  type: ProductsActionTypes.UPDATE_SUCCESS,
  payload: detail,
});

const onUpdateError = error => ({
  type: ProductsActionTypes.UPDATE_ERROR,
  payload: error,
});

/**
 *
 * cart _ products
 */

const onAddProductToCart = () => ({
  type: ProductsActionTypes.ADD_PRODUCT_TO_CART,
});

const onClearCart = () => ({
  type: ProductsActionTypes.ON_CLEAR_CART,
});

const onDeleteProductToCart = color => {
  return {
    type: ProductsActionTypes.DELETE_PRODUCT_CART,
    color,
  };
};

const onPurchaseAgain = (order_list) =>{
  return {
    type: ProductsActionTypes.PURCHASE_AGAIN,
    order_list
  }
}
const onCheckout = () => (
  {
  type: ProductsActionTypes.ON_CHECKOUT,
});

const endCheckout = () => ({
  type: ProductsActionTypes.END_CHECKOUT,
});

const onUpdateProductInCart = (product, color, quantity) => {
  return {
    type: ProductsActionTypes.UPDATE_PRODUCT_CART,
    product,
    color,
    quantity,
  };
};
const onChangeCurrency = unit => {
  return {
    type: ProductsActionTypes.CHANGE_CURRENCY,
    payload: unit,
  };
};

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

  onGetList,
  onGetListSuccess,
  onGetListError,

  onGetDetail,
  onGetDetailSuccess,
  onGetDetailError,

  onGetBestSeller,
  onGetBestSellerSuccess,
  onGetBestSellerError,

  onGetFavorite,
  onGetFavoriteSuccess,
  onGetFavoriteError,

  onGetNewest,
  onGetNewestSuccess,
  onGetNewestError,

  onGetLike,
  onGetLikeSuccess,
  onGetLikeError,

  onGetRelate,
  onGetRelateSuccess,
  onGetRelateError,

  onCreate,
  onCreateSuccess,
  onCreateError,

  onUpdate,
  onUpdateSuccess,
  onUpdateError,

  onAddProductToCart,
  onDeleteProductToCart,
  onClearCart,
  onPurchaseAgain,
  onUpdateProductInCart,
  onChangeCurrency,

  onCheckout,
  endCheckout,
};

export default ProductsActions;
