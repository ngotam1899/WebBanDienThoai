import { ProductsActionTypes } from "../actions/products";
import { toastError, toastSuccess } from '../../utils/toastHelper';

// lấy những sản phẩm đã được lưu trong localStorage về
var data = JSON.parse(localStorage.getItem('CART'));

var initialState = data ? data : [];

const cart = (state = initialState, action) =>{
  var {product, quantity} = action;
  var index = -1;
  switch (action.type){
    case ProductsActionTypes.ADD_PRODUCT_TO_CART:
      index = findProductInCart(state, product);
      if(index !== -1){
        state[index].quantity += quantity;  //cộng với 1
      }else{
        state.push({
          product, 
          quantity
        });
      }
      localStorage.setItem('CART', JSON.stringify(state));
      toastSuccess('Đã thêm vào giỏ hàng');
      return [...state];
    case ProductsActionTypes.DELETE_PRODUCT_CART:
      index = findProductInCart(state, product);
      if(index !== -1){
        state.splice(index, 1);  // cắt đi từ vị trí index, cắt 1 phần tử
      }
      localStorage.setItem('CART', JSON.stringify(state));
      toastSuccess('Đã xóa khỏi giỏ hàng');
      return [...state];
    case ProductsActionTypes.UPDATE_PRODUCT_CART:
      index = findProductInCart(state, product);
      if(index !== -1){
        state[index].quantity = quantity;
      }
      localStorage.setItem('CART', JSON.stringify(state));
      return [...state];
    case ProductsActionTypes.CLEAR_CART:
      return [];
    default : return [...state]
  }
}

const findProductInCart = (cart, product) => {
  //Trường hợp không tìm thấy
  var index = -1;
  if(cart.length>0){
    for(var i=0; i<cart.length; i++){
      // xem coi các product trong mảng cart có tồn tại product mới chọn ko?
      if(cart[i].product._id === product._id){
        index = i;  //trả về vị trí
        break;
      }
    }
  }
  return index;
}

export default cart;