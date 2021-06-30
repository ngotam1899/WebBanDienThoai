//Nơi chứa các hàm gọi API riêng biệt cho từng module
//Module Product
import axiosService from '../../utils/AxiosService';
import {API_ENDPOINT_AUTH} from '../../constants/index';
import queryString from 'query-string';

const url = '/orders';
// http://localhost:3000/orders  METHOD = GET
export const getAllOrders  = (params = {}) =>{
  let queryParams = '';
    if(Object.keys(params).length>0){
        queryParams = `?${queryString.stringify(params)}`;
    }
    return axiosService.get(`${API_ENDPOINT_AUTH}${url}${queryParams}`);
}

// http://localhost:3000/orders/:orderID  METHOD = GET
export const getDetailOrder  = (orderID) =>{
  return axiosService.get(`${API_ENDPOINT_AUTH}${url}/${orderID}`);
}

// http://localhost:3000/orders/:orderID  METHOD = PUT
export const updateOrder  = (data, orderID) =>{
  return axiosService.put(`${API_ENDPOINT_AUTH}${url}/${orderID}`, data);
}

// http://localhost:3000/orders/:orderID  METHOD = DELETE
export const deleteOrder  = (orderID) =>{
  return axiosService.delete(`${API_ENDPOINT_AUTH}${url}/${orderID}`);
}

// http://localhost:3000/orders/revenue  METHOD = GET
export const getRevenue  = (params = {}) =>{
  let queryParams = '';
  if(Object.keys(params).length>0){
    queryParams = `?${queryString.stringify(params)}`;
  }
  return axiosService.get(`${API_ENDPOINT_AUTH}${url}/revenue${queryParams}`);
}

// http://localhost:3000/orders/session-order  METHOD = GET
export const getSessionOrder  = (params = {}) =>{
  let queryParams = '';
    if(Object.keys(params).length>0){
        queryParams = `?${queryString.stringify(params)}`;
    }
    return axiosService.get(`${API_ENDPOINT_AUTH}${url}/session-order${queryParams}`);
}

// http://localhost:3000/orders/revenue-list  METHOD = GET
export const getRevenueList  = (params = {}) =>{
  let queryParams = '';
  if(Object.keys(params).length>0){
    queryParams = `?${queryString.stringify(params)}`;
  }
  return axiosService.get(`${API_ENDPOINT_AUTH}${url}/revenue-list${queryParams}`);
}
