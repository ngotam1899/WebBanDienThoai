//Nơi chứa các hàm gọi API riêng biệt cho từng module
//Module Product
import axiosService from '../../utils/AxiosService';
import {API_ENDPOINT_AUTH} from '../../constants/index';

const url = '/users';
// 1. Đăng nhập tài khoản tại {{url}}/users/signin
export const loginAccount = (data) =>{
  return axiosService.post(`${API_ENDPOINT_AUTH}${url}/signin`, data);
};

// 2. Từ token lấy thông tin người dùng
export const getProfile = (data) =>{
  return axiosService.post(`${API_ENDPOINT_AUTH}${url}/api/auth/profile`, data);
};
