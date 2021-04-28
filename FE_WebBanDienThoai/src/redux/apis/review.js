//Nơi chứa các hàm gọi API riêng biệt cho từng module
//Module Product
import axiosService from '../../utils/AxiosService';
import { API_ENDPOINT_AUTH } from '../../constants/index';
import queryString from 'query-string';

// http://localhost:3000/reviews/list  METHOD = GET
const url = '/reviews';
//cho params 1 default value là object
export const getAllProductReview = (params={}) => {
	let queryParams = '';
	if (Object.keys(params).length > 0) {
		queryParams = `?${queryString.stringify(params)}`;
	}
	return axiosService.get(`${API_ENDPOINT_AUTH}${url}/list${queryParams}`);
};

// http://localhost:3000/reviews/detail  METHOD = GET
export const getAProductReview = (params={}) => {
	let queryParams = '';
	if (Object.keys(params).length > 0) {
		queryParams = `?${queryString.stringify(params)}`;
	}
	return axiosService.get(`${API_ENDPOINT_AUTH}${url}/detail${queryParams}`);
};

// http://localhost:3000/reviews  METHOD = POST
export const addReview = (data) => {
	return axiosService.post(`${API_ENDPOINT_AUTH}${url}`, data);
};

// http://localhost:3000/reviews/:reviewId
export const updateReview = (reviewId, data) =>{
  return axiosService.put(`${API_ENDPOINT_AUTH}${url}/${reviewId}`, data);
}