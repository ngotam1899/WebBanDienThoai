//Nơi chứa các hàm gọi API riêng biệt cho từng module
//Module Product
import axiosService from "../../utils/AxiosService";
import { API_ENDPOINT_AUTH } from "../../constants/index";
import queryString from "query-string";

// http://localhost:3000/installment  METHOD = GET
const url = "/installment";
//cho params 1 default value là object
export const getAllInstallments = (params = {}) => {
  let queryParams = "";
  if (Object.keys(params).length > 0) {
    queryParams = `?${queryString.stringify(params)}`;
  }
  console.log(queryParams);
  return axiosService.get(`${API_ENDPOINT_AUTH}${url}${queryParams}`);
};

// http://localhost:3000/installment/:colorID  METHOD = GET
export const getDetailInstallment = (colorID) => {
  return axiosService.get(`${API_ENDPOINT_AUTH}${url}/${colorID}`);
};

// http://localhost:3000/installment  METHOD = POST
export const addInstallment = (data) => {
  return axiosService.post(`${API_ENDPOINT_AUTH}${url}`, data);
};

// http://localhost:3000/installment/:installmentID  METHOD = PUT
export const updateInstallment = (data, installmentID) => {
  return axiosService.put(`${API_ENDPOINT_AUTH}${url}/${installmentID}`, data);
};

// http://localhost:3000/installment/:installmentID  METHOD = DELETE
export const deleteInstallment = (installmentID) => {
  return axiosService.delete(`${API_ENDPOINT_AUTH}${url}/${installmentID}`);
};
