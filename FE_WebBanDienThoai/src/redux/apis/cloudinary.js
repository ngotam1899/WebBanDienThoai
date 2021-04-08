//Nơi chứa các hàm gọi API riêng biệt cho từng module
//Module Product
import axiosService from '../../utils/AxiosService';
import {API_ENDPOINT_AUTH} from '../../constants/index';

const url = '/image';
// http://localhost:3000/users/image  METHOD = POST
export const addImage = (data) =>{
  return axiosService.post(`${API_ENDPOINT_AUTH}${url}`, data);
};