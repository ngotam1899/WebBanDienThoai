//Nơi chứa các hàm gọi API riêng biệt cho từng module
//Module Product
import axiosService from '../../utils/AxiosService';
import {API_ENDPOINT_AUTH} from '../../constants/index';

// http://localhost:3000/ad  METHOD = GET
const url = '/ad';
//cho params 1 default value là object
export const getAllAds = () =>{
    return axiosService.get(`${API_ENDPOINT_AUTH}${url}`);
};

