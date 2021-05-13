import {AsyncStorage} from 'react-native';
import { ProductsActionTypes } from "../actions/products";

const init = {
  quantity: 0
}

export function sumQuantity(datacart){
  let sum = 0;

  for (var i = 0; i < Object.keys(datacart).length; i++) {
    sum += datacart[i].quantity;
  }
  return sum;
};


export default function(state = init, action) {
  AsyncStorage.getItem('cart')
      .then(dataCart => {
        if (dataCart !== null) {
          // We have data!!
          value = sumQuantity(JSON.parse(dataCart));
          state.quantity = value;
        }
      })
      .catch(err => {
        alert("error: ",err);
      });
  switch (action.type) {
    case "PRODUCTS_ADD_PRODUCT_TO_CART":
      return{
        ...state,
        quantity: state.quantity + 1
      }
    case "PRODUCTS_DELETE_PRODUCT_CART":
      return{
        ...state,
        quantity: state.quantity - 1
      }
    default:
      return state;
    }
}


const findProductInCart = (cart, productColor) => {
  //Trường hợp không tìm thấy
  var index = -1;
  if (cart.length > 0) {
    for (var i = 0; i < cart.length; i++) {
      // xem coi các product trong mảng cart có tồn tại product mới chọn ko?
      if (cart[i].color === productColor) {
        index = i; //trả về vị trí
        break;
      }
    }
  }
  return index;
};
