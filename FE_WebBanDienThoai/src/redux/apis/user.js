//Nơi chứa các hàm gọi API riêng biệt cho từng module
//Module Product
import axiosService from '../../utils/AxiosService';
import {API_ENDPOINT_AUTH} from '../../constants/index';

const url = '/users';

// http://localhost:3000/users/:id  METHOD = GET
export const getUser  = (userId) =>{
  return axiosService.get(`${API_ENDPOINT_AUTH}${url}/${userId}`);
}

// http://localhost:3000/users/:id METHOD= PUT
export const updateUserInfo = (data, userId) =>{
  return axiosService.put(`${API_ENDPOINT_AUTH}${url}/${userId}`, data);
};

// http://localhost:3000/users/change-pwd METHOD = POST
export const changePassword = (data) =>{
  return axiosService.post(`${API_ENDPOINT_AUTH}${url}/change-pwd`, data);
};