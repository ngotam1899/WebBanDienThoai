//Nơi chứa các hàm gọi API riêng biệt cho từng module
//Module Product
import axiosService from '../../utils/AxiosService';
import {API_ENDPOINT_AUTH} from '../../constants/index';
import queryString from 'query-string';

// http://localhost:3000/products  METHOD = GET
const url = '/products';
const url_phone = '/products/phones';
//cho params 1 default value là object
export const getAllProducts = (params = {}) =>{
    let queryParams = '';
    if(Object.keys(params).length>0){
        queryParams = `?${queryString.stringify(params)}`;
    }
    return axiosService.get(`${API_ENDPOINT_AUTH}${url_phone}${queryParams}`);
};

// http://localhost:3000/products/:id  METHOD = GET
export const getDetailProduct  = (productId) =>{
  return axiosService.get(`${API_ENDPOINT_AUTH}${url_phone}/${productId}`);
}

// http://localhost:3000/products  METHOD = POST
export const addProduct = (data) =>{
    return axiosService.post(`${API_ENDPOINT_AUTH}${url_phone}`, data);
};

// http://localhost:3000/products/:id  METHOD = PUT
export const updateProduct  = (data, productId) =>{
    return axiosService.put(`${API_ENDPOINT_AUTH}${url_phone}/${productId}`, data);
}

// http://localhost:3000/products/:id  METHOD = DELETE
export const deleteProduct  = (productId) =>{
    return axiosService.delete(`${API_ENDPOINT_AUTH}${url_phone}/${productId}`);
}

// http://localhost:3000/products/displays  METHOD = GET
export const getAllDisplays = () =>{
  return axiosService.get(`${API_ENDPOINT_AUTH}${url}/displays`);
}

// http://localhost:3000/products/revolutions  METHOD = GET
export const getAllRevolutions = () =>{
  return axiosService.get(`${API_ENDPOINT_AUTH}${url}/revolutions`);
}

// http://localhost:3000/products/widescreens  METHOD = GET
export const getAllWidescreens = () =>{
  return axiosService.get(`${API_ENDPOINT_AUTH}${url}/widescreens`);
}

// http://localhost:3000/products/operations  METHOD = GET
export const getAllOperations = () =>{
  return axiosService.get(`${API_ENDPOINT_AUTH}${url}/operations`);
}

// http://localhost:3000/products/colors  METHOD = GET
export const getAllColors = () =>{
  return axiosService.get(`${API_ENDPOINT_AUTH}${url}/colors`);
}

