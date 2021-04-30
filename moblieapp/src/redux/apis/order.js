//Nơi chứa các hàm gọi API riêng biệt cho từng module
//Module Product
import axiosService from '../../utils/AxiosService';
import {API_ENDPOINT_AUTH} from '../../constants/index';
import queryString from 'query-string';

const url = '/orders';
// http://localhost:3000/orders  METHOD = GET
export const getAllOrder = (params = {}) =>{
    let queryParams = '';
    if(Object.keys(params).length>0){
        queryParams = `?${queryString.stringify(params)}`;
    }
    return axiosService.get(`${API_ENDPOINT_AUTH}${url}${queryParams}`);
};

// http://localhost:3000/orders/:id  METHOD = GET
export const getDetailOrder  = (orderId) =>{
  return axiosService.get(`${API_ENDPOINT_AUTH}${url}/${orderId}`);
}

// http://localhost:3000/orders  METHOD = POST
export const addOrder = (data) =>{
  return axiosService.post(`${API_ENDPOINT_AUTH}${url}`, data);
}

// http://localhost:3000/orders/email/:orderId  METHOD = GET
export const sendConfirmEmail = (orderId) =>{
  return axiosService.get(`${API_ENDPOINT_AUTH}${url}/email/${orderId}`);
}

// http://localhost:3000/orders/confirm/:token
export const confirmOrder = (token) =>{
  return axiosService.get(`${API_ENDPOINT_AUTH}${url}/confirm/${token}`);
}

// http://localhost:3000/orders/:orderId
export const updateOrder = (orderId, data) =>{
  return axiosService.put(`${API_ENDPOINT_AUTH}${url}/${orderId}`, data);
}