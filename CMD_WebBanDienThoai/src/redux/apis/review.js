//Nơi chứa các hàm gọi API riêng biệt cho từng module
//Module Product
import axiosService from '../../utils/AxiosService';
import {API_ENDPOINT_AUTH} from '../../constants/index';
import queryString from 'query-string';

// http://localhost:3000/reviews/list  METHOD = GET
const url = '/reviews';
//cho params 1 default value là object
export const getAllReviews = (params = {}) =>{
  let queryParams = '';
  if(Object.keys(params).length>0){
      queryParams = `?${queryString.stringify(params)}`;
  }
  return axiosService.get(`${API_ENDPOINT_AUTH}${url}/list${queryParams}`);
};

// http://localhost:3000/reviews/:reivewID  METHOD = DELETE
export const deleteReview  = (reviewID) =>{
  return axiosService.delete(`${API_ENDPOINT_AUTH}${url}/${reviewID}`);
}
