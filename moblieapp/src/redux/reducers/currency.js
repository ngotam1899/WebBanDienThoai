import { ProductsActionTypes } from "../actions/products";

// lấy những sản phẩm đã được lưu trong localStorage về
var data = localStorage.getItem('CURRENCY');

var initialState = "VND"

const currency = (state = initialState, action) =>{
  var {payload} = action;
  switch (action.type){
    case ProductsActionTypes.CHANGE_CURRENCY:
      return state = payload;
    default : return state;
  }
}

export default currency;