//Nơi chứa các hàm gọi API riêng biệt cho từng module
//Module Product
import axiosService from '../../utils/AxiosService';
import {API_ENDPOINT_AUTH} from '../../constants/index';

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

//4. Forgot Password tại {{url}}/users/forgot-password
export const forgotPassword = (data) =>{
  return axiosService.post(`${API_ENDPOINT_AUTH}${url}/forgot-password`, data);
}

//5. Từ token lấy thông tin người dùng
export const getProfile = (data) =>{
  return axiosService.post(`${API_ENDPOINT_AUTH}${url}/api/auth/profile`, data);
};

//6. Đăng nhập với Gooogle http://localhost:3000/users/auth/google
export const loginGoogle = (token) =>{
  return axiosService.post(`${API_ENDPOINT_AUTH}${url}/auth/google`, token);
};

//7. Đăng nhập với Facebook http://localhost:3000/users/auth/facebook
export const loginFacebook = (token) =>{
  return axiosService.post(`${API_ENDPOINT_AUTH}${url}/auth/facebook`, token);
};

//8. Active Password tại {{url}}/users/activate-password/:token
export const activatePassword = (token, data) =>{
  return axiosService.post(`${API_ENDPOINT_AUTH}${url}/activate-password/${token}`, data);
}