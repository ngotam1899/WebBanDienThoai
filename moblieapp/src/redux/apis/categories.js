//Nơi chứa các hàm gọi API riêng biệt cho từng module
//Module Product
import axiosService from '../../utils/AxiosService';
import { API_ENDPOINT_AUTH } from '../../constants/index';
import queryString from 'query-string';

// http://localhost:3000/products/categories  METHOD = GET
const url = '/products/categories';
//cho params 1 default value là object
export const getAllCategories = (params = {}) => {
	let queryParams = '';
	if(Object.keys(params).length>0){
		queryParams = `?${queryString.stringify(params)}`;
	}
	return axiosService.get(`${API_ENDPOINT_AUTH}${url}${queryParams}`);
};

// http://localhost:3000/products/categories/:id  METHOD = GET
export const getDetailCategory = (productId) => {
	return axiosService.get(`${API_ENDPOINT_AUTH}${url}/${productId}`);
};

// http://localhost:3000/products/categories-search METHOD = GET
export const getCategoriesByKeyword = (params = {}) => {
	let queryParams = '';
	if (Object.keys(params).length > 0) {
		queryParams = `?${queryString.stringify(params)}`;
	}
	return axiosService.get(`${API_ENDPOINT_AUTH}${url}-search${queryParams}`);
};
