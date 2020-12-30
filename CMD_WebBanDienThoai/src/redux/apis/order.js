//Nơi chứa các hàm gọi API riêng biệt cho từng module
//Module Product
import axiosService from '../../utils/AxiosService';
import {API_ENDPOINT_AUTH} from '../../constants/index';
import queryString from 'query-string';

// http://localhost:3000/orders  METHOD = GET
const url = '/orders';
//cho params 1 default value là object
export const getAllOrders = (params = {}) =>{
    let queryParams = '';
    if(Object.keys(params).length>0){
        queryParams = `?${queryString.stringify(params)}`;
    }
    return axiosService.get(`${API_ENDPOINT_AUTH}${url}${queryParams}`);
};

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

