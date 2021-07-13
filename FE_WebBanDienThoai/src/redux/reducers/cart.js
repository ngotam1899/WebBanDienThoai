import { ProductsActionTypes } from "../actions/products";
import { toastSuccess } from '../../utils/toastHelper';

// lấy những sản phẩm đã được lưu trong localStorage về
var data = JSON.parse(localStorage.getItem('CART'));

var initialState = data ? data : [];

const cart = (state = initialState, action) =>{
  var {product, color, quantity, order_list} = action;
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
    case ProductsActionTypes.PURCHASE_AGAIN:
      // order_list : cart=[] mới truyền vào
      /* eslint-disable */
      order_list.map((item, index) => {
        order_list[index].color = item.color._id;
        order_list[index].product = {
          _id: item.product,
          bigimage: {
            public_url: item.image,
          },
          name : item.name,
          colors: [
            {
              _id: item.color,
              name_en: item.name_color,
              price: item.price
            }
          ]
        };
        var _index = findProductInCart(state, order_list[index].product, order_list[index].color)
        if(_index === -1){
          order_list[index].quantity = item.quantity
        }
        else{
          order_list[index].quantity = item.quantity+state[_index].quantity
        }
      })
      state = order_list
      localStorage.setItem('CART', JSON.stringify(state));
      return [...state]
      /* eslint-disable */
    case ProductsActionTypes.CLEAR_CART:
      var {cart, checkout} = action.payload
      cart = cart.filter(ar => !checkout.find(rm => (rm.product._id === ar.product._id && ar.color === rm.color) ))
      localStorage.setItem('CART', JSON.stringify(cart));
      return cart
    default : return [...state]
  }
}

const findProductInCart = (cart, product, productColor) => {
  //Trường hợp không tìm thấy
  var index = -1;
  if(cart.length>0){
    for(var i=0; i<cart.length; i++){
      // xem coi các product trong mảng cart có tồn tại product mới chọn ko?
      if(cart[i].color === productColor && cart[i].product._id === product._id){
        index = i;  //trả về vị trí
        break;
      }
    }
  }
  return index;
}

export default cart;