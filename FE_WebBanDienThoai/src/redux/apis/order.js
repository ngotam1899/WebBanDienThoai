//Nơi chứa các hàm gọi API riêng biệt cho từng module
//Module Product
import axiosService from '../../utils/AxiosService';
import {API_ENDPOINT_AUTH} from '../../constants/index';

const url = '/orders';

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

// http://localhost:3000/orders/:userId/order-list
export const orderHistory = (userId) =>{
  return axiosService.get(`${API_ENDPOINT_AUTH}${url}/${userId}/order-list`);
}

// http://localhost:3000/orders/:orderId
export const deleteOrder = (orderId) =>{
  return axiosService.delete(`${API_ENDPOINT_AUTH}${url}/${orderId}`);
}