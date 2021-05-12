export const AddressActionTypes = {
  GET_CITY: "GET_CITY",
  GET_CITY_SUCCESS: "GET_CITY_SUCCESS",
  GET_CITY_ERROR: "GET_CITY_ERROR",

  GET_DISTRICT: "GET_DISTRICT",
  GET_DISTRICT_SUCCESS: "GET_DISTRICT_SUCCESS",
  GET_DISTRICT_ERROR: "GET_DISTRICT_ERROR",

  GET_WARD: "GET_WARD",
  GET_WARD_SUCCESS: "GET_WARD_SUCCESS",
  GET_WARD_ERROR: "GET_WARD_ERROR",

  CALCULATE_SHIPPING: "CALCULATE_SHIPPING",
  CALCULATE_SHIPPING_SUCCESS: "CALCULATE_SHIPPING_SUCCESS",
  CALCULATE_SHIPPING_ERROR: "CALCULATE_SHIPPING_ERROR",

  CLEAR_STATE: "CLEAR_STATE",
}

const onClearState = () => ({
  type: AddressActionTypes.CLEAR_STATE,
});

const onGetCity = () => ({
  type: AddressActionTypes.GET_CITY,
});
const onGetCitySuccess = (payload) => ({
  type: AddressActionTypes.GET_CITY_SUCCESS,
  payload
});
const onGetCityError = (error) => ({
  type: AddressActionTypes.GET_CITY_ERROR,
  payload: error
});

const onGetDistrict = (cityID) => ({
  type: AddressActionTypes.GET_DISTRICT,
  payload: cityID
});
const onGetDistrictSuccess = (payload) => ({
  type: AddressActionTypes.GET_DISTRICT_SUCCESS,
  payload
});
const onGetDistrictError = (error) => ({
  type: AddressActionTypes.GET_DISTRICT_ERROR,
  payload: error
});

const onGetWard = (cityID, districtID) => ({
  type: AddressActionTypes.GET_WARD,
  payload: {
    cityID, districtID
  }
});
const onGetWardSuccess = (payload) => ({
  type: AddressActionTypes.GET_WARD_SUCCESS,
  payload
});
const onGetWardError = (error) => ({
  type: AddressActionTypes.GET_WARD_ERROR,
  payload: error
});

const onCalculateShipping = (payload) => ({
  type: AddressActionTypes.CALCULATE_SHIPPING,
  payload
});
const onCalculateShippingSuccess = (payload) => ({
  type: AddressActionTypes.CALCULATE_SHIPPING_SUCCESS,
  payload
});
const onCalculateShippingError = (error) => ({
  type: AddressActionTypes.CALCULATE_SHIPPING_ERROR,
  payload: error
});


const AddressActions = {
  onClearState,

  onGetCity,
  onGetCitySuccess,
  onGetCityError,
  
  onGetDistrict,
  onGetDistrictSuccess,
  onGetDistrictError,

  onGetWard,
  onGetWardSuccess,
  onGetWardError,

  onCalculateShipping,
  onCalculateShippingSuccess,
  onCalculateShippingError,
};

export default AddressActions;