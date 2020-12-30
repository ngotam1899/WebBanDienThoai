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
    return axiosService.get(`${API_ENDPOINT_AUTH}${url}${queryParams}`);
};

// http://localhost:3000/products/brands/:brandID  METHOD = GET
export const getDetailBrand  = (brandID) =>{
  return axiosService.get(`${API_ENDPOINT_AUTH}${url}/${brandID}`);
}

// http://localhost:3000/products/brands  METHOD = POST
export const addBrand = (data) =>{
  return axiosService.post(`${API_ENDPOINT_AUTH}${url}`, data);
};

// http://localhost:3000/products/brands/:brandID  METHOD = PUT
export const updateBrand  = (data, brandID) =>{
  return axiosService.put(`${API_ENDPOINT_AUTH}${url}/${brandID}`, data);
}

// http://localhost:3000/products/brands/:brandID  METHOD = DELETE
export const deleteBrand  = (brandID) =>{
  return axiosService.delete(`${API_ENDPOINT_AUTH}${url}/${brandID}`);
}

