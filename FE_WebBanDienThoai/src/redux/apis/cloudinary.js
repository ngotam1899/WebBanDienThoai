//Nơi chứa các hàm gọi API riêng biệt cho từng module
//Module Product
import axiosService from '../../utils/AxiosService';
import {API_ENDPOINT_AUTH} from '../../constants/index';

const url = '/products/image';
// http://localhost:3000/products/image/:id  METHOD = GET
export const getImage  = (imageId) =>{
  return axiosService.get(`${API_ENDPOINT_AUTH}${url}/${imageId}`);
}
// http://localhost:3000/products/image  METHOD = GET
export const getAllImages = () =>{
  return axiosService.get(`${API_ENDPOINT_AUTH}${url}`);
};

// http://localhost:3000/users/image  METHOD = POST
export const addUserImage = (data) =>{
  return axiosService.post(`${API_ENDPOINT_AUTH}/users/image`, data);
};
// http://localhost:3000/users/image/:id  METHOD = GET
export const getUserImage  = (userId) =>{
  return axiosService.get(`${API_ENDPOINT_AUTH}/users/image/${userId}`);
}