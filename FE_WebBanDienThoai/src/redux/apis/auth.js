//Nơi chứa các hàm gọi API riêng biệt cho từng module
//Module Product
import axiosService from '../../utils/AxiosService';
import {API_ENDPOINT_AUTH} from '../../constants/index';
import queryString from 'query-string';

const url = '/users';
// 1. Đăng ký tài khoản tại {{url}}/users/signup
export const registerAccount = (data) =>{
  return axiosService.post(`${API_ENDPOINT_AUTH}${url}/signup`, data);
};

// 2. Đăng nhập tài khoản tại {{url}}/users/signin
export const loginAccount = (data) =>{
  return axiosService.post(`${API_ENDPOINT_AUTH}${url}/signin`, data);
};

//3. Active Account tại {{url}}/users/authentication/activate/:token
export const activateAccount = (token) =>{
  return axiosService.get(`${API_ENDPOINT_AUTH}${url}/authentication/activate/${token}`);
}

//4. Từ token lấy thông tin người dùng
export const getProfile = (data) =>{
  return axiosService.post(`${API_ENDPOINT_AUTH}${url}/api/auth/profile`, data);
};