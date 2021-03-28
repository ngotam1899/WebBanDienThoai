//Nơi chứa các hàm gọi API riêng biệt cho từng module
//Module Product
import axiosService from '../../utils/AxiosService';
import {API_ENDPOINT_AUTH} from '../../constants/index';
import queryString from 'query-string';

// http://localhost:3000/products/specifications  METHOD = GET
const url = '/products/specifications';
//cho params 1 default value là object
export const getAllSpecifications = (params = {}) =>{
    let queryParams = '';
    if(Object.keys(params).length>0){
        queryParams = `?${queryString.stringify(params)}`;
    }
    return axiosService.get(`${API_ENDPOINT_AUTH}${url}${queryParams}`);
};

// http://localhost:3000/products/operations/:operationID  METHOD = GET
export const getDetailSpecification  = (specificationID) =>{
  return axiosService.get(`${API_ENDPOINT_AUTH}${url}/${specificationID}`);
}

// http://localhost:3000/products/specifications  METHOD = POST
export const addSpecification = (data) =>{
  return axiosService.post(`${API_ENDPOINT_AUTH}${url}`, data);
};

// http://localhost:3000/products/specifications/:specificationID  METHOD = PUT
export const updateSpecification  = (data, specificationID) =>{
  return axiosService.put(`${API_ENDPOINT_AUTH}${url}/${specificationID}`, data);
}

// http://localhost:3000/products/specifications/:specificationID  METHOD = DELETE
export const deleteSpecification  = (specificationID) =>{
  return axiosService.delete(`${API_ENDPOINT_AUTH}${url}/${specificationID}`);
}
