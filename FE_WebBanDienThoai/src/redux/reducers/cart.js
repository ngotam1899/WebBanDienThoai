import { ProductsActionTypes } from "../actions/products";
import { toastError, toastSuccess } from '../../utils/toastHelper';

// lấy những sản phẩm đã được lưu trong localStorage về
var data = JSON.parse(localStorage.getItem('CART'));

var initialState = data ? data : [];

const cart = (state = initialState, action) =>{
  var {product, color, quantity} = action;
  var index = -1;
  switch (action.type){
    case ProductsActionTypes.ADD_PRODUCT_TO_CART:
      index = findProductInCart(state, product, color);
      if(index !== -1){
        state[index].quantity += quantity;  //cộng với 1
      }else{
        state.push({
          product,
          color,
          quantity
        });
      }
      localStorage.setItem('CART', JSON.stringify(state));
      toastSuccess('Đã thêm vào giỏ hàng');
      return [...state];
    case ProductsActionTypes.DELETE_PRODUCT_CART:
      index = findProductInCart(state, product, color);
      console.log(index)
      if(index !== -1){
        state.splice(index, 1);  // cắt đi từ vị trí index, cắt 1 phần tử
      }
      localStorage.setItem('CART', JSON.stringify(state));
      toastSuccess('Đã xóa khỏi giỏ hàng');
      return [...state];
    case ProductsActionTypes.UPDATE_PRODUCT_CART:
      index = findProductInCart(state, product, color);
      if(index !== -1){
        state[index].product = product;
        state[index].quantity = quantity;
      }
      localStorage.setItem('CART', JSON.stringify(state));
      return [...state];
    case ProductsActionTypes.CLEAR_CART:
      return [];
    default : return [...state]
  }
}

const findProductInCart = (cart, product, productColor) => {
  //Trường hợp không tìm thấy
  var index = -1;
  console.log(product)
  if(cart.length>0){
    for(var i=0; i<cart.length; i++){
      // xem coi các product trong mảng cart có tồn tại product mới chọn ko?
      if(cart[i].color === productColor && cart[i].product == product){
        index = i;  //trả về vị trí
        break;
      }
    }
  }
  return index;
}

export default cart;