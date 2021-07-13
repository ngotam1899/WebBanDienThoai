import { ProductsActionTypes } from "../actions/products";

var initialState = [];

const checkout = (state = initialState, action) =>{
  var { payload } = action;
  var index = -1;
  switch (action.type){
    case ProductsActionTypes.ADD_CHECKOUT:
      state.push(payload);
      return [...state];
    case ProductsActionTypes.DELETE_CHECKOUT:
      index = findCheckout(state, payload);
      if(index !== -1) state.splice(index, 1);  // cắt đi từ vị trí index, cắt 1 phần tử
      return [...state];
    case ProductsActionTypes.CHECKOUT_ALL:
      return payload;
    case ProductsActionTypes.CLEAR_CHECKOUT:
      return [];
    default : return [...state]
  }
}

const findCheckout = (checkout, item) => {
  //Trường hợp không tìm thấy
  var index = -1;
  if(checkout.length>0){
    for(var i=0; i<checkout.length; i++){
      if(checkout[i].product._id === item.product._id && checkout[i].color === item.color){
        index = i;  //trả về vị trí
        break;
      }
    }
  }
  return index;
}

export default checkout;