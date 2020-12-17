//Nơi chứa các hàm gọi API riêng biệt cho từng module
//Module Product
import axiosService from '../../utils/AxiosService';
import {API_ENDPOINT_AUTH} from '../../constants/index';

// http://localhost:3000/products/brands  METHOD = GET
const url = '/products/brands';
//cho params 1 default value là object
export const getAllBrands = () =>{
    return axiosService.get(`${API_ENDPOINT_AUTH}${url}`);
};

