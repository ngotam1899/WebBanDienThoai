//Nơi chứa các hàm gọi API riêng biệt cho từng module
//Module Product
import axiosService from '../../utils/AxiosService';
import {API_ENDPOINT_AUTH} from '../../constants/index';
import queryString from 'query-string';

// http://localhost:3000/products/groups  METHOD = GET
const url = '/products/groups';
//cho params 1 default value là object
export const getAllGroups = (params = {}) =>{
    let queryParams = '';
    if(Object.keys(params).length>0){
        queryParams = `?${queryString.stringify(params)}`;
    }
    return axiosService.get(`${API_ENDPOINT_AUTH}${url}${queryParams}`);
};

// http://localhost:3000/products/groups/:groupID  METHOD = GET
export const getDetailGroup  = (groupID) =>{
  return axiosService.get(`${API_ENDPOINT_AUTH}${url}/${groupID}`);
}

// http://localhost:3000/products/groups  METHOD = POST
export const addGroup = (data) =>{
  return axiosService.post(`${API_ENDPOINT_AUTH}${url}`, data);
};

// http://localhost:3000/products/groups/:groupID  METHOD = PUT
export const updateGroup = (data, groupID) =>{
  return axiosService.put(`${API_ENDPOINT_AUTH}${url}/${groupID}`, data);
}

// http://localhost:3000/products/groups/:groupID  METHOD = DELETE
export const deleteGroup = (groupID) =>{
  return axiosService.delete(`${API_ENDPOINT_AUTH}${url}/${groupID}`);
}
