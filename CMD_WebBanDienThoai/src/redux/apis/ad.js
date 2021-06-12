//Nơi chứa các hàm gọi API riêng biệt cho từng module
//Module Product
import axiosService from '../../utils/AxiosService';
import {API_ENDPOINT_AUTH} from '../../constants/index';
import queryString from 'query-string';

// http://localhost:3000/ad  METHOD = GET
const url = '/ad';
//cho params 1 default value là object
export const getAllAds = (params = {}) =>{
    let queryParams = '';
    if(Object.keys(params).length>0){
        queryParams = `?${queryString.stringify(params)}`;
    }
    return axiosService.get(`${API_ENDPOINT_AUTH}${url}${queryParams}`);
};

// http://localhost:3000/ad/:adID  METHOD = GET
export const getDetailAd  = (adID) =>{
  return axiosService.get(`${API_ENDPOINT_AUTH}${url}/${adID}`);
}

// http://localhost:3000/ad  METHOD = POST
export const addAd = (data) =>{
  return axiosService.post(`${API_ENDPOINT_AUTH}${url}`, data);
};

// http://localhost:3000/ad/:adID  METHOD = PUT
export const updateAd  = (data, adID) =>{
  return axiosService.put(`${API_ENDPOINT_AUTH}${url}/${adID}`, data);
}

// http://localhost:3000/ad/:adID  METHOD = DELETE
export const deleteAd  = (adID) =>{
  return axiosService.delete(`${API_ENDPOINT_AUTH}${url}/${adID}`);
}
