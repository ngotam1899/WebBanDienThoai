//Nơi chứa các hàm gọi API riêng biệt cho từng module
//Module Product
import axiosService from '../../utils/AxiosService';
import {API_ENDPOINT_AUTH} from '../../constants/index';
import queryString from 'query-string';

// http://localhost:3000/products  METHOD = GET
const url = '/products';
//cho params 1 default value là object
export const getAllProducts = (params = {}) =>{
    let queryParams = '';
    if(Object.keys(params).length>0){
        queryParams = `?${queryString.stringify(params)}`;
    }
    return axiosService.get(`${API_ENDPOINT_AUTH}${url}${queryParams}`);
};

// http://localhost:3000/products/:id  METHOD = GET
export const getDetailProduct  = (productId) =>{
  return axiosService.get(`${API_ENDPOINT_AUTH}${url}/${productId}`);
}

// http://localhost:3000/products  METHOD = POST
export const addProduct = (data) =>{
  return axiosService.post(`${API_ENDPOINT_AUTH}${url}`, data);
};

// http://localhost:3000/products/:id  METHOD = PUT
export const updateProduct  = (data, productId) =>{
  return axiosService.put(`${API_ENDPOINT_AUTH}${url}/${productId}`, data);
}

// http://localhost:3000/products/:id  METHOD = DELETE
export const deleteProduct  = (productId) =>{
  return axiosService.delete(`${API_ENDPOINT_AUTH}${url}/${productId}`);
}

// http://localhost:3000/products/:id/activate  METHOD = PUT
export const activateProduct  = (productId) =>{
  return axiosService.put(`${API_ENDPOINT_AUTH}${url}/${productId}/activate`);
}

// http://localhost:3000/products/:id/deactivate  METHOD = PUT
export const deactivateProduct  = (productId) =>{
  return axiosService.put(`${API_ENDPOINT_AUTH}${url}/${productId}/deactivate`);
}
