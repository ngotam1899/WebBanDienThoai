import { ProductsActionTypes } from "../actions/products";

// lấy những sản phẩm đã được lưu trong localStorage về
//var data = localStorage.getItem('CURRENCY');

var initialState = localStorage.getItem('LANGUAGE') || "en"

const language = (state = initialState, action) =>{
  var {payload} = action;
  switch (action.type){
    case ProductsActionTypes.CHANGE_LANGUAGE:
      return state = payload;
    default: 
      return state;
  }
}

export default language;