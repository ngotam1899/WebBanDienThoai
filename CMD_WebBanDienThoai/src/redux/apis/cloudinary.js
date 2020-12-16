//Nơi chứa các hàm gọi API riêng biệt cho từng module
//Module Product
import axiosService from '../../utils/AxiosService';
import {API_ENDPOINT_AUTH} from '../../constants/index';
import queryString from 'query-string';

const url = '/products/image';
// http://localhost:3000/products/image/:id  METHOD = GET
export const getImage  = (imageId) =>{
  return axiosService.get(`${API_ENDPOINT_AUTH}${url}/${imageId}`);
}
// http://localhost:3000/products/image  METHOD = GET
export const getAllImages = (params = {}) =>{
  let queryParams = '';
  if(Object.keys(params).length>0){
      queryParams = `?${queryString.stringify(params)}`;
  }
  return axiosService.get(`${API_ENDPOINT_AUTH}${url}${queryParams}`);
};

// http://localhost:3000/products/:id  METHOD = PUT
/* export const updateProduct  = (data, productId) =>{
    return axiosService.put(`${API_ENDPOINT}${url}/${productId}`, data);
} */

// http://localhost:3000/products/image  METHOD = POST
export const addProductImage = (data) =>{
  return axiosService.post(`${API_ENDPOINT_AUTH}${url}`, data);
};
// http://localhost:3000/products/image/:id  METHOD = GET
export const getProductImage  = (productId) =>{
  return axiosService.get(`${API_ENDPOINT_AUTH}${url}/${productId}`);
}
