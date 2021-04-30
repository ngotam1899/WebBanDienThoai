//Nơi chứa các hàm gọi API riêng biệt cho từng module
import axiosService from '../../utils/AxiosService';
import queryString from 'query-string';
const API_ENDPOINT = 'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data'
// 1. 
export const getAllCity = () =>{
  return axiosService.get(`${API_ENDPOINT}/province`);
};

// 2. 
export const getDistrictByCity = (params = {}) =>{
  let queryParams = '';
  if(Object.keys(params).length>0){
      queryParams = `?${queryString.stringify(params)}`;
  }
  return axiosService.get(`${API_ENDPOINT}/district${queryParams}`);
};

// 3. 
export const getWardByCityAndDistrict = (cityID, districtID) =>{
  return axiosService.get(`${API_ENDPOINT}/ward?district_id=${districtID}&province_id=${cityID}`);
};