export const ProductsActionTypes = {
  FILTER: "FILTER",
  FILTER_SUCCESS: "FILTER_SUCCESS",

  COMPARE: "COMPARE",
  COMPARE_SUCCESS: "COMPARE_SUCCESS",
  COMPARE_ERROR: "COMPARE_ERROR",

  COMPARE_FILTER: "COMPARE_FILTER",
  COMPARE_FILTER_SUCCESS: "COMPARE_FILTER_SUCCESS",

  GET_LIST: "GET_LIST",
  GET_LIST_SUCCESS: "GET_LIST_SUCCESS",
  GET_LIST_ERROR: "GET_LIST_ERROR",

  GET_DETAIL: "GET_DETAIL",
  GET_DETAIL_SUCCESS: "GET_DETAIL_SUCCESS",
  GET_DETAIL_ERROR: "GET_DETAIL_ERROR",

  GET_BEST_SELLER: "GET_BEST_SELLER",
  GET_BEST_SELLER_SUCCESS: "GET_BEST_SELLER_SUCCESS",
  GET_BEST_SELLER_ERROR: "GET_BEST_SELLER_ERROR",

  GET_FAVORITE: "GET_FAVORITE",
  GET_FAVORITE_SUCCESS: "GET_FAVORITE_SUCCESS",
  GET_FAVORITE_ERROR: "GET_FAVORITE_ERROR",

  GET_NEWEST: "GET_NEWEST",
  GET_NEWEST_SUCCESS: "GET_NEWEST_SUCCESS",
  GET_NEWEST_ERROR: "GET_NEWEST_ERROR",

  GET_LIKE: "GET_LIKE",
  GET_LIKE_SUCCESS: "GET_LIKE_SUCCESS",
  GET_LIKE_ERROR: "GET_LIKE_ERROR",

  GET_RELATE: "GET_RELATE",
  GET_RELATE_SUCCESS: "GET_RELATE_SUCCESS",
  GET_RELATE_ERROR: "GET_RELATE_ERROR",

  GET_ACCESSORY: "GET_ACCESSORY",
  GET_ACCESSORY_SUCCESS: "GET_ACCESSORY_SUCCESS",
  GET_ACCESSORY_ERROR: "GET_ACCESSORY_ERROR",

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
  PURCHASE_AGAIN: "PURCHASE_AGAIN",

  ADD_CHECKOUT: "ADD_CHECKOUT",
  DELETE_CHECKOUT: "DELETE_CHECKOUT",
  CHECKOUT_ALL: "CHECKOUT_ALL",
  CLEAR_CHECKOUT: "CLEAR_CHECKOUT",

  CLEAR_CART: "CLEAR_CART",
  CHANGE_CURRENCY: "CHANGE_CURRENCY",
  CHANGE_LANGUAGE: "CHANGE_LANGUAGE",
};

Object.keys(ProductsActionTypes).forEach((key) => {
  ProductsActionTypes[
    key
  ] = `PRODUCTS_${ProductsActionTypes[key]}`;
});

/**
 * common
 **/

const onClearDetail = () => ({
  type: ProductsActionTypes.CLEAR_DETAIL,
});
const onClearCart = (payload) => ({
  type: ProductsActionTypes.CLEAR_CART,
  payload
});
const onClearCheckout = () => ({
  type: ProductsActionTypes.CLEAR_CHECKOUT,
});
const onClearState = () => ({
  type: ProductsActionTypes.CLEAR_STATE,
});

/**
 * compare
 **/

const onCompare = (payload) => ({
  type: ProductsActionTypes.COMPARE,
  payload,
});

const onCompareSuccess = (payload) => ({
  type: ProductsActionTypes.COMPARE_SUCCESS,
  payload
});

const onCompareError = (error) => ({
  type: ProductsActionTypes.COMPARE_ERROR,
  payload: error,
});

/**
 * get_list
 **/

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
 * best_seller
 **/

const onGetBestSeller = (payload) => ({
  type: ProductsActionTypes.GET_BEST_SELLER,
  payload,
});

const onGetBestSellerSuccess = (payload) => ({
  type: ProductsActionTypes.GET_BEST_SELLER_SUCCESS,
  payload
});

const onGetBestSellerError = (error) => ({
  type: ProductsActionTypes.GET_BEST_SELLER_ERROR,
  payload: error,
});

/**
 * favorite
 **/

const onGetFavorite = (payload) => ({
  type: ProductsActionTypes.GET_FAVORITE,
  payload,
});

const onGetFavoriteSuccess = (payload) => ({
  type: ProductsActionTypes.GET_FAVORITE_SUCCESS,
  payload
});

const onGetFavoriteError = (error) => ({
  type: ProductsActionTypes.GET_FAVORITE_ERROR,
  payload: error,
});

/**
 * newest
 **/

const onGetNewest = (payload) => ({
  type: ProductsActionTypes.GET_NEWEST,
  payload,
});

const onGetNewestSuccess = (payload) => ({
  type: ProductsActionTypes.GET_NEWEST_SUCCESS,
  payload
});

const onGetNewestError = (error) => ({
  type: ProductsActionTypes.GET_NEWEST_ERROR,
  payload: error,
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

/**
 * accessory
 **/

const onGetAccessory = (payload) => ({
  type: ProductsActionTypes.GET_ACCESSORY,
  payload,
});

const onGetAccessorySuccess = (list, total) => ({
  type: ProductsActionTypes.GET_ACCESSORY_SUCCESS,
  payload: {list, total}
});

const onGetAccessoryError = (error) => ({
  type: ProductsActionTypes.GET_ACCESSORY_ERROR,
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
 * create
 **/
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
 * cart _ products
 */

const onAddProductToCart = (product, color, quantity) => ({
  type: ProductsActionTypes.ADD_PRODUCT_TO_CART,
  product,color, quantity
})
const onDeleteProductInCart = (product, color) => ({
  type: ProductsActionTypes.DELETE_PRODUCT_CART,
  product, color
})
const onUpdateProductInCart = (product, color, quantity) => ({
  type: ProductsActionTypes.UPDATE_PRODUCT_CART,
  product,color, quantity
})
const onPurchaseAgain = (order_list) => ({
  type: ProductsActionTypes.PURCHASE_AGAIN,
  order_list
})
const onCheckoutAll = (payload) =>({
  type: ProductsActionTypes.CHECKOUT_ALL,
  payload
})
const onAddCheckout = (payload) =>({
  type: ProductsActionTypes.ADD_CHECKOUT,
  payload
})
const onDeleteCheckout = (payload) => ({
  type: ProductsActionTypes.DELETE_CHECKOUT,
  payload
})
/**
 *
 * currency
 */

const onChangeCurrency = (unit) =>{
  return {
    type: ProductsActionTypes.CHANGE_CURRENCY,
    payload: unit
  }
}
const onChangeLanguage = (payload) =>{
  return {
    type: ProductsActionTypes.CHANGE_LANGUAGE,
    payload
  }
}
/**
 *
 * filter
 */

const onFilter = payload => ({
  type: ProductsActionTypes.FILTER,
  payload,
});

const onFilterSuccess = payload => ({
  type: ProductsActionTypes.FILTER_SUCCESS,
  payload
});

const onCompareFilter = payload => ({
  type: ProductsActionTypes.COMPARE_FILTER,
  payload,
});

const onCompareFilterSuccess = payload => ({
  type: ProductsActionTypes.COMPARE_FILTER_SUCCESS,
  payload
});

const ProductsActions = {
  onFilter,
  onFilterSuccess,

  onCompareFilter,
  onCompareFilterSuccess,

  onClearDetail,
  onClearState,
  onClearCheckout,
  onClearCart,

  onCompare,
  onCompareSuccess,
  onCompareError,
  
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

  onGetAccessory,
  onGetAccessorySuccess,
  onGetAccessoryError,

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
  onDeleteProductInCart,
  onUpdateProductInCart,
  onPurchaseAgain,

  onChangeCurrency,
  onChangeLanguage,
  
  onAddCheckout,
  onDeleteCheckout,
  onCheckoutAll
};

export default ProductsActions;
