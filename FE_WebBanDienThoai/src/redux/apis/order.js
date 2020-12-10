//Nơi chứa các hàm gọi API riêng biệt cho từng module
//Module Product
import axiosService from '../../utils/AxiosService';
import {API_ENDPOINT_AUTH} from '../../constants/index';
import queryString from 'query-string';

const url = '/orders';

// http://localhost:3000/orders  METHOD = POST
export const addOrder = () =>{
  return axiosService.post(`${API_ENDPOINT_AUTH}${url}`);
}