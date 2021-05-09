import { ProductsActionTypes } from "../actions/products";
import { toastError, toastSuccess } from '../../utils/toastHelper';
import { AsyncStorage } from '@react-native-async-storage/async-storage';

// lấy những sản phẩm đã được lưu trong localStorage về

// const getData = async () => {
//   try {
//     const jsonValue = await AsyncStorage.getItem('CART')
//     return jsonValue != null ? JSON.parse(jsonValue) : null;
//   } catch(e) {
//     console.log("e",e)
//   }
// }

// var data = getData();
const data = null

var initialState = [];

const cart = async (state = initialState, action) =>{
  var {product, color, quantity} = action;
  var index = -1;
  switch (action.type){
    case ProductsActionTypes.ADD_PRODUCT_TO_CART:
      index = findProductInCart(state, color);
      if(index !== -1){
        state[index].quantity += quantity;  //cộng với 1
      }else{
        state.push({
          product,
          color,
          quantity
        });
      }
      
      await AsyncStorage.setItem('CART', JSON.stringify(state));
      toastSuccess('Đã thêm vào giỏ hàng');
      return [...state];
    case ProductsActionTypes.DELETE_PRODUCT_CART:
      index = findProductInCart(state, color);
      if(index !== -1){
        state.splice(index, 1);  // cắt đi từ vị trí index, cắt 1 phần tử
      }
      localStorage.setItem('CART', JSON.stringify(state));
      toastSuccess('Đã xóa khỏi giỏ hàng');
      return [...state];
    case ProductsActionTypes.UPDATE_PRODUCT_CART:
      index = findProductInCart(state, color);
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

const findProductInCart = (cart, productColor) => {
  //Trường hợp không tìm thấy
  var index = -1;
  if(cart.length>0){
    for(var i=0; i<cart.length; i++){
      // xem coi các product trong mảng cart có tồn tại product mới chọn ko?
      if(cart[i].color === productColor){
        index = i;  //trả về vị trí
        break;
      }
    }
  }
  return index;
}

export default cart;