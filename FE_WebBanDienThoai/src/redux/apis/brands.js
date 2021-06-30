//Nơi chứa các hàm gọi API riêng biệt cho từng module
//Module Product
import axiosService from '../../utils/AxiosService';
import {API_ENDPOINT_AUTH} from '../../constants/index';
import queryString from 'query-string';

// http://localhost:3000/products/brands  METHOD = GET
const url = '/products/brands';
//cho params 1 default value là object
export const getAllBrands = (params = {}) =>{
  let queryParams = '';
  if(Object.keys(params).length>0){
    queryParams = `?${queryString.stringify(params)}`;
  }
  return axiosService.get(`${API_ENDPOINT_AUTH}${url}-search${queryParams}`);
};

// http://localhost:3000/products/brands/accessory
export const getAllAccessory = () =>{
  return axiosService.get(`${API_ENDPOINT_AUTH}${url}/accessory`);
};