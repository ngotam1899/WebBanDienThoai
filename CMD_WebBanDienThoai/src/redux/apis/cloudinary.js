//Nơi chứa các hàm gọi API riêng biệt cho từng module
//Module Product
import axiosService from '../../utils/AxiosService';
import {API_ENDPOINT} from '../../constants/index';
import queryString from 'query-string';

const url = '/products/image';
// http://localhost:3000/products/:id  METHOD = GET
export const getImage  = (imageId) =>{
  return axiosService.get(`${API_ENDPOINT}${url}/${imageId}`);
}

// http://localhost:3000/products  METHOD = POST
/* export const addProduct = (data) =>{
    return axiosService.post(`${API_ENDPOINT}${url}`, data);
}; */

// http://localhost:3000/products/:id  METHOD = PUT
/* export const updateProduct  = (data, productId) =>{
    return axiosService.put(`${API_ENDPOINT}${url}/${productId}`, data);
} */
