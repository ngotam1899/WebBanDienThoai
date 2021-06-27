//Nơi chứa các hàm gọi API riêng biệt cho từng module
//Module Product
import axiosService from '../../utils/AxiosService';
import {API_ENDPOINT_AUTH} from '../../constants/index';
import queryString from 'query-string';


const url = '/users/notification';
const url_all = '/users/notification-all';
// http://localhost:3000/users/notification  METHOD = GET
export const getAllNotifications = (params = {}) =>{
  let queryParams = '';
  if(Object.keys(params).length>0){
    queryParams = `?${queryString.stringify(params)}`;
  }
  return axiosService.get(`${API_ENDPOINT_AUTH}${url}${queryParams}`);
};

// http://localhost:3000/users/notification-newest  METHOD = GET
export const getNewestNotifications = (params = {}) =>{
  let queryParams = '';
  if(Object.keys(params).length>0){
    queryParams = `?${queryString.stringify(params)}`;
  }
  return axiosService.get(`${API_ENDPOINT_AUTH}/users/notification-newest${queryParams}`);
};

// http://localhost:3000/users/notification  METHOD = POST
export const addNotification = (data) =>{
  return axiosService.post(`${API_ENDPOINT_AUTH}${url}`, data);
}

// http://localhost:3000/users/notification/:notificationId
export const updateNotification = (notificationId, data) =>{
  return axiosService.put(`${API_ENDPOINT_AUTH}${url}/${notificationId}`, data);
}

// http://localhost:3000/users/notification-all
export const updateAllNotifications = (data) =>{
  return axiosService.put(`${API_ENDPOINT_AUTH}${url_all}`, data);
}

// http://localhost:3000/users/notification/:notificationId
export const deleteNotification = (notificationId) =>{
  return axiosService.delete(`${API_ENDPOINT_AUTH}${url}/${notificationId}`);
}

// http://localhost:3000/users/notification-all/:userId
export const deleteAllNotifications = (userId) =>{
  return axiosService.delete(`${API_ENDPOINT_AUTH}${url_all}/${userId}`);
}
