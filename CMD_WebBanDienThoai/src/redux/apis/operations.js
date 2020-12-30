//Nơi chứa các hàm gọi API riêng biệt cho từng module
//Module Product
import axiosService from '../../utils/AxiosService';
import {API_ENDPOINT_AUTH} from '../../constants/index';
import queryString from 'query-string';

// http://localhost:3000/products/operations  METHOD = GET
const url = '/products/operations';
//cho params 1 default value là object
export const getAllOperations = (params = {}) =>{
    let queryParams = '';
    if(Object.keys(params).length>0){
        queryParams = `?${queryString.stringify(params)}`;
    }
    return axiosService.get(`${API_ENDPOINT_AUTH}${url}${queryParams}`);
};

// http://localhost:3000/products/operations/:operationID  METHOD = GET
export const getDetailOperation  = (operationID) =>{
  return axiosService.get(`${API_ENDPOINT_AUTH}${url}/${operationID}`);
}

// http://localhost:3000/products/operations  METHOD = POST
export const addOperation = (data) =>{
  return axiosService.post(`${API_ENDPOINT_AUTH}${url}`, data);
};

// http://localhost:3000/products/operations/:operationID  METHOD = PUT
export const updateOperation  = (data, operationID) =>{
  return axiosService.put(`${API_ENDPOINT_AUTH}${url}/${operationID}`, data);
}

// http://localhost:3000/products/operations/:operationID  METHOD = DELETE
export const deleteOperation  = (operationID) =>{
  return axiosService.delete(`${API_ENDPOINT_AUTH}${url}/${operationID}`);
}
