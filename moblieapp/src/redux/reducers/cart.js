import {ProductsActionTypes} from '../actions/products';
//import {AsyncStorage} from '@react-native-community/async-storage';
// lấy những sản phẩm đã được lưu trong localStorage về

// const init = {
//   cart: [],
// };
//function(state = data.cart.length != 0 ? data : init, action)
// export default function (state = init, action) {
//   var {product, color, quantity} = action;
//   var item = {
//     color,
//     quantity,
//   };
//   var index = -1;
//   AsyncStorage.removeItem('CART').then(() => {
//   });
//   AsyncStorage.getItem('CART').then((data) => {
//     state.cart = Array.from(JSON.parse(data));
//     //console.log("Gio hang ", state.cart.length);
//   });
//   switch (action.type) {
//     case 'PRODUCTS_ADD_PRODUCT_TO_CART':
//       index = findProductInCart(state.cart, color);
//       if (index !== -1) {
//         state.cart[index].quantity += quantity; //cộng với 1
//       } else {
//         state.cart.push(item);
//       }
//       AsyncStorage.setItem('CART', JSON.stringify(state.cart)).then(() => {
//         //console.log("pause");
//         return({
//           ...state,
//           cart: state.cart
//         });
//       });
//     case ProductsActionTypes.DELETE_PRODUCT_CART:
//       index = findProductInCart(state.cart, color);
//       if (index !== -1) {
//         state.splice(index, 1); // cắt đi từ vị trí index, cắt 1 phần tử
//       }
//       localStorage.setItem('CART', JSON.stringify(state));
//       return {...state};
//     case ProductsActionTypes.UPDATE_PRODUCT_CART:
//       index = findProductInCart(state.cart, color);
//       if (index !== -1) {
//         state.card[index].product = product;
//         state.card[index].quantity = quantity;
//       }
//       localStorage.setItem('CART', JSON.stringify(state));
//       return {...state};
//     case ProductsActionTypes.CLEAR_CART:
//       state.cart = [];
//       return {...state,
//         cart: state.cart};
//     default:
//       return {...state,
//         cart: state.cart};
//   }
// }

// const findProductInCart = (cart, productColor) => {
//   //Trường hợp không tìm thấy
//   var index = -1;
//   if (cart.length > 0) {
//     for (var i = 0; i < cart.length; i++) {
//       // xem coi các product trong mảng cart có tồn tại product mới chọn ko?
//       if (cart[i].color === productColor) {
//         index = i; //trả về vị trí
//         break;
//       }
//     }
//   }
//   return index;
// };
