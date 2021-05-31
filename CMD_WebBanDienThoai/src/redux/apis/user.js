//Nơi chứa các hàm gọi API riêng biệt cho từng module
//Module Product
import axiosService from '../../utils/AxiosService';
import {API_ENDPOINT_AUTH} from '../../constants/index';
import queryString from 'query-string';

// http://localhost:3000/users  METHOD = GET
const url = '/users';
//cho params 1 default value là object
export const getAllUsers = (params = {}) =>{
  let queryParams = '';
  if(Object.keys(params).length>0){
    queryParams = `?${queryString.stringify(params)}`;
  }
  return axiosService.get(`${API_ENDPOINT_AUTH}${url}${queryParams}`);
};

// http://localhost:3000/users/:id  METHOD = GET
export const getDetailUser  = (userId) =>{
  return axiosService.get(`${API_ENDPOINT_AUTH}${url}/${userId}`);
}

// http://localhost:3000/users/:id  METHOD = PUT
export const updateUser  = (data, userId) =>{
  return axiosService.put(`${API_ENDPOINT_AUTH}${url}/${userId}`, data);
}

// http://localhost:3000/users/:id  METHOD = DELETE
export const deleteUser  = (userId) =>{
    return axiosService.delete(`${API_ENDPOINT_AUTH}${url}/${userId}`);
}

// http://localhost:3000/users/online-user  METHOD = GET
export const getOnlineUsers = (params = {}) =>{
  let queryParams = '';
  if(Object.keys(params).length>0){
    queryParams = `?${queryString.stringify(params)}`;
  }
  return axiosService.get(`${API_ENDPOINT_AUTH}${url}/online-user${queryParams}`);
};

// http://localhost:3000/users/session-user  METHOD = GET
export const getSessionUsers = (params = {}) =>{
  let queryParams = '';
  if(Object.keys(params).length>0){
    queryParams = `?${queryString.stringify(params)}`;
  }
  return axiosService.get(`${API_ENDPOINT_AUTH}${url}/session-user${queryParams}`);
};
