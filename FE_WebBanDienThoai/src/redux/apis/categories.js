//Nơi chứa các hàm gọi API riêng biệt cho từng module
//Module Product
import axiosService from '../../utils/AxiosService';
import {API_ENDPOINT} from '../../constants/index';
import queryString from 'query-string';

// http://localhost:3000/products/categorys  METHOD = GET
const url = '/products/categorys';
//cho params 1 default value là object
export const getAllCategories = (params = {}) =>{
    let queryParams = '';
    if(Object.keys(params).length>0){
        queryParams = `?${queryString.stringify(params)}`;
    }
    return axiosService.get(`${API_ENDPOINT}${url}${queryParams}`);
};

