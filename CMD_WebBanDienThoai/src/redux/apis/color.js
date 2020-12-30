//Nơi chứa các hàm gọi API riêng biệt cho từng module
//Module Product
import axiosService from '../../utils/AxiosService';
import {API_ENDPOINT_AUTH} from '../../constants/index';
import queryString from 'query-string';

// http://localhost:3000/products/colors  METHOD = GET
const url = '/products/colors';
//cho params 1 default value là object
export const getAllColors = (params = {}) =>{
    let queryParams = '';
    if(Object.keys(params).length>0){
        queryParams = `?${queryString.stringify(params)}`;
    }
    return axiosService.get(`${API_ENDPOINT_AUTH}${url}${queryParams}`);
};

// http://localhost:3000/products/colors/:colorID  METHOD = GET
export const getDetailColor  = (colorID) =>{
  return axiosService.get(`${API_ENDPOINT_AUTH}${url}/${colorID}`);
}

// http://localhost:3000/products/colors  METHOD = POST
export const addColor = (data) =>{
  return axiosService.post(`${API_ENDPOINT_AUTH}${url}`, data);
};

// http://localhost:3000/products/colors/:colorID  METHOD = PUT
export const updateColor  = (data, colorID) =>{
  return axiosService.put(`${API_ENDPOINT_AUTH}${url}/${colorID}`, data);
}

// http://localhost:3000/products/colors/:colorID  METHOD = DELETE
export const deleteColor  = (colorID) =>{
  return axiosService.delete(`${API_ENDPOINT_AUTH}${url}/${colorID}`);
}

