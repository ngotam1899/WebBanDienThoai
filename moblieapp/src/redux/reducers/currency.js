import { ProductsActionTypes } from "../actions/products";
//import {AsyncStorage} from '@react-native-community/async-storage';

// lấy những sản phẩm đã được lưu trong localStorage về
//var data = AsyncStorage.getItem('CURRENCY');

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