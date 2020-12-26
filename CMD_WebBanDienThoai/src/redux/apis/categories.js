//Nơi chứa các hàm gọi API riêng biệt cho từng module
//Module Product
import axiosService from '../../utils/AxiosService';
import {API_ENDPOINT_AUTH} from '../../constants/index';
import queryString from 'query-string';

// http://localhost:3000/products/categorys  METHOD = GET
const url = '/products/categorys';
//cho params 1 default value là object
export const getAllCategories = (params = {}) =>{
    let queryParams = '';
    if(Object.keys(params).length>0){
        queryParams = `?${queryString.stringify(params)}`;
    }
    return axiosService.get(`${API_ENDPOINT_AUTH}${url}${queryParams}`);
};

// http://localhost:3000/products/categorys/:categoryID  METHOD = GET
export const getDetailCategory  = (categoryID) =>{
  return axiosService.get(`${API_ENDPOINT_AUTH}${url}/${categoryID}`);
}

// http://localhost:3000/products/categorys  METHOD = POST
export const addCategory = (data) =>{
  return axiosService.post(`${API_ENDPOINT_AUTH}${url}`, data);
};

// http://localhost:3000/products/categorys/:categoryID  METHOD = PUT
export const updateCategory  = (data, categoryID) =>{
  return axiosService.put(`${API_ENDPOINT_AUTH}${url}/${categoryID}`, data);
}

// http://localhost:3000/products/categorys/:categoryID  METHOD = DELETE
export const deleteCategory  = (categoryID) =>{
  return axiosService.delete(`${API_ENDPOINT_AUTH}${url}/${categoryID}`);
}
