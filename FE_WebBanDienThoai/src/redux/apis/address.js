//Nơi chứa các hàm gọi API riêng biệt cho từng module
import axiosService from '../../utils/AxiosService';
import queryString from 'query-string';

const API_ENDPOINT = 'https://dev-online-gateway.ghn.vn/shiip/public-api'
// 1. 
export const getAllCity = () =>{
  return axiosService.get(`${API_ENDPOINT}/master-data/province`);
};

// 2. 
export const getDistrictByCity = (params = {}) =>{
  let queryParams = '';
  if(Object.keys(params).length>0){
      queryParams = `?${queryString.stringify(params)}`;
  }
  return axiosService.get(`${API_ENDPOINT}/master-data/district${queryParams}`);
};

// 3. 
export const getWardByCityAndDistrict = (cityID, districtID) =>{
  return axiosService.get(`${API_ENDPOINT}/master-data/ward?district_id=${districtID}&province_id=${cityID}`);
};

// 4. Calculate shipping fee
// https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee
export const getShippingFee = (data) =>{
  return axiosService.post(`${API_ENDPOINT}/v2/shipping-order/fee`, data);
};