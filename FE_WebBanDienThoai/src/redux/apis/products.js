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

// http://localhost:3000/products/best-seller  METHOD = GET
export const getBestSeller = () =>{
  return axiosService.get(`${API_ENDPOINT_AUTH}${url}/best-seller`);
}

// http://localhost:3000/products/favorite  METHOD = GET
export const getFavorite  = () =>{
  return axiosService.get(`${API_ENDPOINT_AUTH}${url}/favorite`);
}

// http://localhost:3000/products/newest  METHOD = GET
export const getNewest  = () =>{
  return axiosService.get(`${API_ENDPOINT_AUTH}${url}/newest`);
}

// http://localhost:3000/products-like?product=6069f4fa8fa8a12d34256498  METHOD = GET
export const getLikeProducts = (productId) =>{
  return axiosService.get(`${API_ENDPOINT_AUTH}/products/like/${productId}`);
};

// http://localhost:3000/products-relate?product=6069f4fa8fa8a12d34256498  METHOD = GET
export const getRelateProducts = (productId) =>{
  return axiosService.get(`${API_ENDPOINT_AUTH}/products/relate/${productId}`);
};

// http://localhost:3000/products/accessory?brand=608c1a1c99e77e244c7db4bd&limit=5&page=0&sort_p=-1
export const getAllAccessory = (params = {}) =>{
  let queryParams = '';
  if(Object.keys(params).length>0){
    queryParams = `?${queryString.stringify(params)}`;
  }
  return axiosService.get(`${API_ENDPOINT_AUTH}${url}/accessory${queryParams}`);
};

// http://localhost:3000/products/compare?compare=608c1b07d1dfc82f0411a8ee
export const compareProduct = (params = {}) =>{
  let queryParams = '';
  if(Object.keys(params).length>0){
    queryParams = `?${queryString.stringify(params)}`;
  }
  return axiosService.get(`${API_ENDPOINT_AUTH}${url}/compare${queryParams}`);
};